from django.contrib import admin
from .models import (
    UserProfile,
    ServiceProvider,
    Package,
    PackageSubscription,
    Review,
    WorkoutPlan
)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'is_service_provider', 'location', 'created_at']
    search_fields = ['user__username', 'location']
    list_filter = ['is_service_provider', 'created_at']

@admin.register(ServiceProvider)
class ServiceProviderAdmin(admin.ModelAdmin):
    list_display = ['user', 'specialization', 'experience_years', 'rating', 'is_verified']
    search_fields = ['user__username', 'specialization']
    list_filter = ['specialization', 'is_verified']

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ['name', 'service_provider', 'package_type', 'price', 'is_active']
    search_fields = ['name', 'service_provider__user__username']
    list_filter = ['package_type', 'is_active', 'created_at']

@admin.register(PackageSubscription)
class PackageSubscriptionAdmin(admin.ModelAdmin):
    list_display = ['client', 'package', 'status', 'start_date', 'end_date']
    search_fields = ['client__username', 'package__name']
    list_filter = ['status', 'start_date']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['client', 'service_provider', 'package', 'rating', 'created_at']
    search_fields = ['client__username', 'service_provider__user__username']
    list_filter = ['rating', 'created_at']

@admin.register(WorkoutPlan)
class WorkoutPlanAdmin(admin.ModelAdmin):
    list_display = ['title', 'package_subscription', 'created_at']
    search_fields = ['title', 'package_subscription__client__username']
    list_filter = ['created_at']