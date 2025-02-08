from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MinValueValidator, MaxValueValidator

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_service_provider = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    location = models.CharField(max_length=100, blank=True)
    instagram = models.CharField(max_length=100, blank=True)
    facebook = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"
    
class ServiceProvider(models.Model):
    SPECIALIZATION_CHOICES = [
        ('PT', 'Personal Trainer'),
        ('NT', 'Nutritionist'),
        ('PS', 'Psychologist'),
        ('PH', 'Physical Therapist'),
        ('NU', 'Nutritional Therapist'),
        ('DI', 'Dietician'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='service_provider')
    specialization = models.CharField(max_length=100)
    experience_years = models.IntegerField()
    qualifications = models.TextField()
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_reviews = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s provider profile"
    
class Package(models.Model):
    PACKAGE_TYPES = [
        ('BASIC', 'Basic'),
        ('STANDARD', 'Standard'),
        ('PREMIUM', 'Premium'),
    ]

    service_provider = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE, related_name='packages')
    name = models.CharField(max_length=100)
    package_type = models.CharField(max_length=10, choices=PACKAGE_TYPES)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_months = models.PositiveIntegerField()
    features = models.JSONField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.service_provider.user.username} - {self.name}"

class PackageSubscription(models.Model):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active'),
        ('EXPIRED', 'Expired'),
        ('CANCELLED', 'Cancelled'),
    ]

    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='subscriptions')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client.username} - {self.package.name}"

class Review(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    service_provider = models.ForeignKey(ServiceProvider, on_delete=models.CASCADE, related_name='reviews')
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['client', 'package']  # One review per package per client

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
      
        provider = self.service_provider
        avg_rating = Review.objects.filter(service_provider=provider).aggregate(
            models.Avg('rating'))['rating__avg']
        provider.rating = round(avg_rating, 2) if avg_rating else 0.0
        provider.total_reviews = Review.objects.filter(service_provider=provider).count()
        provider.save()

    def __str__(self):
        return f"Review by {self.client.username} for {self.package.name}"

class WorkoutPlan(models.Model):
    package_subscription = models.ForeignKey(PackageSubscription, on_delete=models.CASCADE, related_name='workout_plans')
    title = models.CharField(max_length=100)
    description = models.TextField()
    video_url = models.URLField(blank=True)
    document_file = models.FileField(upload_to='workout_plans/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.package_subscription.client.username}"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()