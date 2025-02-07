
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api import views

urlpatterns = [
    path('api/', views.GetRoutes.as_view(), name="routes"),
    path('api/profiles/', views.GetProfiles.as_view(), name="profiles"),
    path('api/profiles/<int:pk>/', views.GetProfile.as_view(), name='profile'),
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
]
 
