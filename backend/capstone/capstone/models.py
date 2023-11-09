from django.db import models

class Question(models.Model):
    question_text = models.TextField()
    image = models.ImageField(upload_to='question_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField()
    image = models.ImageField(upload_to='answer_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)