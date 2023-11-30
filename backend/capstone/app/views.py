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


class UserResponseCreateView(generics.CreateAPIView):
    queryset = UserResponse.objects.all()
    serializer_class = UserResponseSerializer

    def create(self, request, *args, **kwargs):
        question_id = kwargs.get('question_id')
        try:
            question_id = Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            return Response({
                'error': 'Question not found'
            }, status=HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_response = serializer.validated_data
        user_response.question = question
        user_response.is_correct = user_response.submitted_answer == question.correct_answer
        user_response.save()

    return Response(serializer.datam status=HTTP_201_CREATED)
