from rest_framework import serializer
from . models import *

class DiscussionPostSerializer(serializer.ModelSerializer):
    model = DiscussionPost
    fields = '__all__'
    
class CommentSerializer(serializer.ModelSerializer):
    model = Comment
    fields = '__all__'