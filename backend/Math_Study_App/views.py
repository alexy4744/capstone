from rest_framework import status
from rest_framework.decorators import api_view
import rest_framework.response
from serializers import StudentSerializer


@api_view(['POST'])
def register_student(request):
    data = request.data

    serializer = StudentSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return rest_framework.response.Response({"message": "Registration Successful!"}, status=status.HTTP_201_CREATED)
    else:
        return rest_framework.response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)