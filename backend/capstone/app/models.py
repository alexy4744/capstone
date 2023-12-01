from django.db import models


class Question(models.Model):
    difficulty_choices = [
        (1, 'Easy'),
        (2, 'Medium'),
        (3, 'Hard')
    ]

    category_choices = [
        ('HOA', 'Heart of Algebra'),
        ('PSD', 'Problem Solving and Data Analysis'),
        ('PAM', 'Passport to Advanced Math'),
        ('GEO', 'Geometry'),
        ('TRI', 'Trigonometry')
    ]
    
    title = models.CharField(max_length=5000)
    image = models.ImageField(upload_to='question_images/', null=True, blank=True)
    multiple_choice = models.BooleanField(default=False)
    difficulty = models.IntegerField(choices=difficulty_choices, default=2)
    category = models.CharField(max_length=3, choices=category_choices, default='HOA')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.title}'


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=4)
    created_at = models.DateTimeField(auto_now_add=True)


class UserResponse(models.Model):
    user_id = models.CharField(max_length=255)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    submitted_answer = models.CharField(max_length=4)
    is_correct = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user_id} - {self.submitted_answer}'
