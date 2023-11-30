from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import *
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.response import Response


class QuestionList(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerList(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer


class QuestionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class AnswerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
