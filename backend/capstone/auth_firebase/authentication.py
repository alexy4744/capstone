from firebase_admin import initialize_app, auth, credentials
from django.contrib.auth.models import User
from django.utils import timezone
from rest_framework import authentication
from .exceptions import FirebaseError, InvalidAuthToken, NoAuthToken

cred = credentials.Certificate("creds.json")

initialize_app(cred)

class FirebaseAuthentication(authentication.BaseAuthentication):
  def authenticate(self, request):
    auth_header = request.META.get("HTTP_AUTHORIZATION")
    if not auth_header:
      raise NoAuthToken("No auth token provided")

    id_token = auth_header.split().pop()
    decoded_token = None

    try:
      decoded_token = auth.verify_id_token(id_token)
    except Exception:
      raise InvalidAuthToken("Invalid auth token")

    if not id_token or not decoded_token:
      return None

    try:
      uid = decoded_token.get('uid')
    except:
      raise FirebaseError()

    user, created = User.objects.get_or_create(username=uid)
    user.profile.last_activity = timezone.localtime()

    return user, None
