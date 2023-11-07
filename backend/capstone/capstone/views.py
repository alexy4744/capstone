from django.http import JsonResponse
from .models import Question, Answer
import re
from sympy import parse_latex

def parse_latex(text):
    # Define a regular expression to identify LaTeX expressions
    latex_pattern = r"\$(.*?)\$"
    matches = re.findall(latex_pattern, text)

    # Parse and replace LaTeX expressions in the text
    for match in matches:
        try:
            parsed_expr = parse_latex(match)
            text = text.replace(f"${match}$", str(parsed_expr))
        except Exception as e:
            # Handle parsing errors
            print(f"Error parsing LaTeX expression: {e}")

    return text

def get_questions(request):
    questions = Question.objects.all()
    data = {
        'questions': []
    }
    for question in questions:
        parsed_question = parse_latex(question.question_text)
        data['questions'].append({
            'id': question.id,
            'question_text': parsed_question
        })
    return JsonResponse(data)

def get_answers_for_question(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
        answers = question.answer_set.all()
        data = {
            'question': parse_latex(question.question_text),
            'answers': []
        }
        for answer in answers:
            parsed_answer = parse_latex(answer.answer_text)
            data['answers'].append({
                'id': answer.id,
                'answer_text': parsed_answer
            })
        return JsonResponse(data)
    except Question.DoesNotExist:
        return JsonResponse({'error': 'Question does not exist'}, status=404)