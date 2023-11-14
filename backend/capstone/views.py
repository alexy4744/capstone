from django.http import JsonResponse
from . models import Question
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from . serializers import QuestionSerializer

class QuestionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

