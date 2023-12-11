from django.urls import path
from . views import *

urlpatterns = [
    path('questions/', QuestionList.as_view()),
    path('answers/', AnswerList.as_view()),
    path('questions/<int:pk>/', QuestionDetail.as_view()),
    path('answers/<int:pk>/', AnswerDetail.as_view()),
    path('submit-response/<int:question_id>/', CreateUserResponse.as_view()),
    path('home/', GetUserStats.as_view()),
]
