from rest_framework.status import HTTP_401_UNAUTHORIZED, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.exceptions import APIException

class NoAuthToken(APIException):
  status_code = HTTP_401_UNAUTHORIZED
  default_detail = "No authentication token provided"
  default_code = "no_auth_token"

class InvalidAuthToken(APIException):
  status_code = HTTP_401_UNAUTHORIZED
  default_detail = "Invalid authentication token provided"
  default_code = "invalid_token"
  
class NoAuthToken(APIException):
  status_code = HTTP_500_INTERNAL_SERVER_ERROR
  default_detail = "The user provided wuth the auth token is not a valid Firebase user, it has no Firebase UID"
  default_code = "no_firebase_uid"
