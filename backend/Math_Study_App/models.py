from djongo import models


class Student(models.Model):
    _first_name = models.CharField(max_length=50)
    _last_name = models.CharField(max_length=50)
    _email = models.EmailField(max_length=75)
    _password = models.CharField(max_length=100)
    _questions_attempted = []
    _questions_correctly_attempted = []


class Question(models.Model):
    _text = models.TextField()
    _q_type = models.CharField(max_length=2)
    _calculator = models.BooleanField()
    _difficulty = models.CharField()
    _answer = models.CharField(max_length=50)
