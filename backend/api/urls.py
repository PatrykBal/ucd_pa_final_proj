from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'providers', views.ServiceProviderViewSet)
router.register(r'packages', views.PackageViewSet, basename='package')
router.register(r'subscriptions', views.PackageSubscriptionViewSet)
router.register(r'reviews', views.ReviewViewSet, basename='review')
router.register(r'workout-plans', views.WorkoutPlanViewSet)

urlpatterns = [
    path('register/provider/', views.RegisterServiceProviderView.as_view(), name='register-provider'),
    path('register/client/', views.RegisterClientView.as_view(), name='register-client'),
    path('profile/me/', views.UserProfileView.as_view(), name='user-profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]