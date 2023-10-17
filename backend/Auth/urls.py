from django.urls import path
from . import views

#URL Configuration
urlpatterns = [
    path('hi/', views.sayHi),
    path('api/register/', views.UserRegistrationView.as_view(), name='register')
]