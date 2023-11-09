from rest_framework import serializers
from .models import Question, Answer

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'image', 'created_at']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'answer_text', 'image', 'created_at']
