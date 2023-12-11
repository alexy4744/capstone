from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from . models import *
from . serializers import *
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
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
    authentication_classes = [SessionAuthentication, FirebaseAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, question_id):
        user_input = request.data.get('user_input')
        print(user_input)
        question = get_object_or_404(Question, id=question_id)
        correct_answer = get_object_or_404(Answer, question=question)
        is_correct = user_input == correct_answer.answer

        user_response = UserResponse.objects.create(
            user_id=request.user.id,
            question=question,
            submitted_answer=correct_answer if is_correct else "null"
        )

        serializer = UserResponseSerializer(user_response)

        return JsonResponse(serializer.data)
    
class GetUserStats(APIView):
    authentication_classes = [SessionAuthentication, FirebaseAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        uid = request.user.id
        responses_with_answers = UserResponse.objects.filter(user_id=uid, submitted_answer__answer__isnull=False)
        responses_with_none = UserResponse.objects.filter(user_id=uid, submitted_answer__answer__isnull=True)
        responses_with_answers_by_difficulty = self.group_by_difficulty(responses_with_answers)
        responses_with_none_by_difficulty = self.group_by_difficulty(responses_with_none)
        
        response_data = {
            'user_id': uid,
            'correct_responses': responses_with_answers_by_difficulty,
            'incorrect_responses': responses_with_none_by_difficulty,
        }
        
        return JsonResponse(response_data)
    
    def group_by_difficulty(self, user_responses):
        grouped_responses = {}
        for response in user_responses:
            difficulty = response.submitted_answer.question.difficulty
            if difficulty not in grouped_responses:
                grouped_responses[difficulty] = {'answers': [], 'none': []}
            if response.submitted_answer.answer is not None:
                grouped_responses[difficulty]['answers'].append(response.id)
            else:
                grouped_responses[difficulty]['none'].append(response.id)
        return grouped_responses
    