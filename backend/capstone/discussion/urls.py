from django.urls import path
from . views import *

urlpatterns = [
    path('create-post/', CreateDiscussionPost.as_view()),
    path('create-comment/', CreateComment.as_view()),
]