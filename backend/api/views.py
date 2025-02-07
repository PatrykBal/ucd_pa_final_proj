from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.views import View
from api.profiles import profiles





class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



class GetRoutes(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        return JsonResponse('Hello')
    

class GetProfiles(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response(profiles)
    
class GetProfile(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk, *args, **kwargs):
        profile = None  
        for item in profiles:
    
            if item.get('id') == pk:
                profile = item
                break

        if profile is not None:
            return Response(profile)
        else:
            return Response(
                {"detail": "Profile not found."},
                status=status.HTTP_404_NOT_FOUND
            )