from django.db import models

class Student(models.Model):
  __first_name = models.CharField(max_length=50)
  __last_name = models.CharField(max_length=50)
  __date_of_birth = models.DateField()
  __grade = models.CharField(max_length=2)

  def __str__(self):
    return f'{self.__first_name} {self.__last_name}
