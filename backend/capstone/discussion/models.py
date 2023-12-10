from django.db import models
from django.contrib.auth.models import User
from app.models import Question

class DiscussionPost(models.Model):
    title = models.CharField(max_length=255)
    creator = models.CharField(max_length=255)
    related_question = models.ForeignKey(Question, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Comment(models.Model):
    discussion_post = models.ForeignKey(DiscussionPost, on_delete=models.CASCADE)
    creator = models.CharField(max_length=255)
    body = models.TextField
    created_at = models.DateTimeField(auto_now_add=True)