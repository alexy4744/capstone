from rest_framework import serializers
from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            '_id',
            'question_text',
            'image',
            'created_at',
            'multiple_choice',
            'difficulty',
            'category'
        ]
