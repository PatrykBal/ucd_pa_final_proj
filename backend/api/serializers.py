from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import UserProfile, ServiceProvider, Package, PackageSubscription, Review, WorkoutPlan

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['avatar', 'bio', 'phone_number', 'location', 'instagram', 'facebook']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2', 
                 'first_name', 'last_name', 'profile']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True}
        }

    def validate(self, data):
        if data['password'] != data.pop('password2'):
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        # Creates User instance
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        # Updates UserProfile
        for attr, value in profile_data.items():
            setattr(user.profile, attr, value)
        user.profile.save()
        return user


class ServiceProviderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = ServiceProvider
        fields = ['id', 'user', 'specialization', 'experience_years', 
                 'qualifications', 'bio_description', 'profile_image', 
                 'rating', 'total_reviews', 'is_verified']
        read_only_fields = ['user']

    def create(self, validated_data):
        return ServiceProvider.objects.create(**validated_data)

class PackageSerializer(serializers.ModelSerializer):
    service_provider = ServiceProviderSerializer(read_only=True)

    class Meta:
        model = Package
        fields = ['id', 'name', 'package_type', 'price', 'duration_months', 
                 'features', 'is_active', 'service_provider']

class PackageSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageSubscription
        fields = ['id', 'package', 'start_date', 'end_date', 'status']
        read_only_fields = ['client']

class ReviewSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()
    package_details = PackageSerializer(source='package', read_only=True)
    client = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'client', 'service_provider', 'package', 'rating', 
                 'comment', 'created_at', 'client_name', 'package_details']

    def get_client_name(self, obj):
        if obj.client and hasattr(obj.client, 'first_name'):
            return f"{obj.client.first_name} {obj.client.last_name}".strip() or "Anonymous"
        return "Anonymous"

    def validate(self, data):
        user = self.context['request'].user
        package = data.get('package')
        
        # Check if user has a subscription
        if not package.subscriptions.filter(client=user).exists():
            raise serializers.ValidationError("You can only review packages you are subscribed to")
        
        # Allow updates to existing reviews
        if self.instance is None:  # Only check for new reviews
            if Review.objects.filter(client=user, package=package).exists():
                raise serializers.ValidationError("You have already reviewed this package")
            
        return data

class WorkoutPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlan
        fields = '__all__'