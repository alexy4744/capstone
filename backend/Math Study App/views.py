from django.shortcuts import render, redirect
from .forms import StudentRegistration

def signup(request):
    if request.method == 'POST':
        form = StudentRegistration(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = StudentRegistration()
        return render(request, {'form' : form})