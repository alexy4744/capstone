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


# class CreateUserResponse(APIView):
#     authentication_classes = [SessionAuthentication, FirebaseAuthentication]
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request, question_id):
#         user_input = request.data.get('user_input')
#         print(user_input)
#         question = get_object_or_404(Question, id=question_id)
#         correct_answer = get_object_or_404(Answer, question=question)
#         is_correct = user_input == correct_answer.answer

#         user_response = UserResponse.objects.create(
#             user_id=request.user.id,
#             question=question,
#             submitted_answer=correct_answer if is_correct else None
#         )

#         serializer = UserResponseSerializer(user_response)

#         return JsonResponse(serializer.data)



class CreateUserResponse(generics.CreateAPIView):
    serializer_class = UserResponseSerializer

    def create(self, request, *args, **kwargs):
        uid = request.auth['uid']
        answer_view = AnswerDetail.as_view()
        answer = answer_view(request)

        selected_answer = Answer.objects.get(id=answer)
        user_response_data = {
            'uid': uid,
            'submitted_answer': selected_answer
        }

        serializer = UserResponseSerializer(data=user_response_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        
        
    
