from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
import logging

logger = logging.getLogger(__name__)

class RegisterClientView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.profile.is_service_provider = False
            user.profile.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterServiceProviderView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.info(f"Received registration request: {request.data}")
        
        try:
            
            user_serializer = UserSerializer(data=request.data)
            if user_serializer.is_valid():
                user = user_serializer.save()
                
                
                user.profile.is_service_provider = True
                user.profile.save()
                
                
                service_provider = ServiceProvider.objects.create(
                    user=user,
                    specialization=request.data.get('specialization'),
                    experience_years=request.data.get('experience_years', 0),
                    qualifications=request.data.get('qualifications', '')
                )
                
                return Response({
                    'user': UserSerializer(user).data,
                    'provider': ServiceProviderSerializer(service_provider).data
                }, status=status.HTTP_201_CREATED)
            
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            logger.error(f"Error in registration: {str(e)}")
            # If there was an error, delete the user if it was created
            if 'user' in locals():
                user.delete()
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile_serializer = UserProfileSerializer(user.profile)
        user_serializer = UserSerializer(user)
        return Response({
            'user': user_serializer.data,
            'profile': profile_serializer.data
        })

    def put(self, request):
        serializer = UserProfileSerializer(request.user.profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

class ServiceProviderViewSet(viewsets.ModelViewSet):
    queryset = ServiceProvider.objects.all()
    serializer_class = ServiceProviderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(service_provider=self.request.user.service_provider)

class PackageSubscriptionViewSet(viewsets.ModelViewSet):
    queryset = PackageSubscription.objects.all()
    serializer_class = PackageSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.profile.is_service_provider:
            return PackageSubscription.objects.filter(
                package__service_provider__user=self.request.user
            )
        return PackageSubscription.objects.filter(client=self.request.user)

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Review.objects.all()
        package_id = self.request.query_params.get('package', None)
        if package_id is not None:
            queryset = queryset.filter(package_id=package_id)
        return queryset

    def perform_create(self, serializer):
        # Gets the service provider from the request data
        provider_id = self.request.data.get('service_provider')
        service_provider = ServiceProvider.objects.get(id=provider_id)
        
        # Save the review with the current user as the client
        serializer.save(
            client=self.request.user,
            service_provider=service_provider
        )

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class WorkoutPlanViewSet(viewsets.ModelViewSet):
    queryset = WorkoutPlan.objects.all()
    serializer_class = WorkoutPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = WorkoutPlan.objects.all()
        subscription_id = self.request.query_params.get('subscription', None)
        
        if subscription_id:
            queryset = queryset.filter(package_subscription_id=subscription_id)
            
        # If user is a client, only show their workout plans
        if not self.request.user.profile.is_service_provider:
            queryset = queryset.filter(package_subscription__client=self.request.user)
        # If user is a provider, only show workout plans for their packages
        else:
            queryset = queryset.filter(
                package_subscription__package__service_provider__user=self.request.user
            )
            
        return queryset