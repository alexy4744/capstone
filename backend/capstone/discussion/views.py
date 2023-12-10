from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from auth_firebase.authentication import FirebaseAuthentication
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

class CreateDiscussionPost(APIView):
    authentication_classes = [SessionAuthentication, FirebaseAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        title_input = request.data.get('title_input')
        question = get_object_or_404(Question, id=question_id)
        body_text = request.data.get('body_text')
        
        discussion_post = DiscussionPost.objects.create(
            creator=request.user.id,
            title=title_input,
            related_question=question,
            body=body_text
        )
        
        serializer = DiscussionPostSerializer(discussion_post)
        return JsonResponse(serializer.data)
    
class CreateComment(APIView):
    authentication_classes = [SessionAuthentication, FirebaseAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        discussion_post = get_object_or_404(DiscussionPost, id=post_id)
        body_text = request.data.get('body_text')
        
        comment = Comment.objects.create(
            creator=request.user.id,
            discussion_post=discussion_post,
            body=body_text
        )
        
        serializer = CommentSerializer(comment)
        return JsonResponse(serializer.data)