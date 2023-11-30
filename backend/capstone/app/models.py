from django.db import models


class Question(models.Model):
    title = models.CharField(max_length=5000)
    image = models.ImageField(upload_to='question_images/', null=True, blank=True)
    multiple_choice = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title}'


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)
