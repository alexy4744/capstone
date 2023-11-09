from django.http import JsonResponse
from .models import Question, Answer

from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import QuestionSerializer, AnswerSerializer

class QuestionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class AnswerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    parser_classes = [MultiPartParser, FormParser]