from django.http import JsonResponse
from .models import Question, Answer

def get_questions(request):
    questions = Question.objects.all()
    data = {
        'questions': list(questions.values())
    }
    return JsonResponse(data)

def get_answers_for_question(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
        answers = question.answer_set.all()
        data = {
            'question': question.question_text,
            'answers': list(answers.values())
        }
        return JsonResponse(data)
    except Question.DoesNotExist:
        return JsonResponse({'error': 'Question does not exist'}, status=404)