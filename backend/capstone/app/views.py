from django.shortcuts import render
from . models import *
from . serializers import *
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from auth_firebase.authentication import FirebaseAuthentication

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


class CreateUserResponse(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        authentication = FirebaseAuthentication()
        
        user, _ = authentication.authenticate(request)
        
        if user:
            uid = user.id
            
            question_id = request.data.get('question_id')
            user_input = request.data.get('user_input')
        
            question = get_object_or_404(Question, id=question_id)
            correct_answer = get_object_or_404(Answer, question=question)
            is_correct = user_input == correct_answer.answer
        
            user_response = UserResponse.objects.create(
                user_id=uid,
                question=question,
                submitted_answer=correct_answer if is_correct else None
            )
        
            serializer = UserResponseSerializer(user_response)
        
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            pass
        
        
    
