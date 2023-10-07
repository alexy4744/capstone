from djongo import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class StudentManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, password=None):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        return user

    def create_superuser(self, username, email, first_name, last_name, password):
        user = self.create_user(username, email, first_name, last_name, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self.db)
        return user


class Student(models.Model):
    _first_name = models.CharField(max_length=50)
    _last_name = models.CharField(max_length=50)
    _email = models.EmailField(max_length=75)
    _password = models.CharField(max_length=100)
    _username = models.CharField(max_length=50)
    _questions_attempted = []
    _questions_correctly_attempted = []

    objects = StudentManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self):
        return self._username


class Question(models.Model):
    _text = models.TextField()
    _q_type = models.CharField(max_length=2)
    _calculator = models.BooleanField()
    _difficulty = models.CharField()
    _answer = models.CharField(max_length=50)
