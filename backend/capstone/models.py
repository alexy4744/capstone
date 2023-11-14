from django.db import models
import uuid

#Question Model
class Question(models.Model):
    class Category(models.TextChoices):
        HEART_OF_ALGEBRA = 'HOA'
        PASSPORT_TO_ADVANCED_MATH = 'PAM'
        GEOMETRY = 'GEO'
        TRIGONOMETRY = 'TRI'
        PROBLEM_SOLVING_AND_DATA_ANALYSIS = 'PSD'

    class Difficulty(models.IntegerChoices):
        EASY = 1
        MEDIUM = 2
        HARD = 3
    _id = models.UUIDField(primary_key=True, editable=False, unique=True, default=uuid.uuid4())
    question_text = models.TextField()
    image = models.ImageField(upload_to='question_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    multiple_choice = models.BooleanField()
    difficulty = models.IntegerField(choices=Difficulty.choices)
    category = models.CharField(max_length=3, choices=Category.choices)

