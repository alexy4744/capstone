from django.contrib import admin
from django.urls import path
from backend.Math_Study_App.views import StudentDetailView, StudentListCreateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('api/students/<int:pk>/', StudentDetailView.as_view(), name='student-detail')
]
