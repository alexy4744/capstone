from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'firstName',
            'lastName',
            'email',
            'password'
        )
        
        extra_kwargs = {
            'password': {'write_only': True}
        }