from djongo import models

# Create your models here.
class Question(models.Model):
    class Category(models.Chocies):
        HEART_OF_ALGEBRA = 'HOA',
        GEOMETRY = 'GEO',
        TRIGONOMETRY = 'TRI',
        PASSPORT_TO_ADVANCED_MATH = 'PAM',
        PROBLEM_SOLVING_AND_DATA_ANALYSIS = 'PSD'

    class Difficulty(models.Model):
        EASY = 'E',
        MEDIUM = 'M',
        HARD = 'H'

    image = models.ImageField()
    answer = models.CharField()
    difficulty = models.CharField(choices=Difficulty, max_length=1)
    category = models.CharField(choices=Category, max_length=3)
    all_attempts = models.IntegerField()
    successful_attempts = models.IntegerField()
    short_response = models.BooleanField()
    calculator = models.BooleanField()