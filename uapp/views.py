from django.shortcuts import render, HttpResponse
from .models import BlogPost

# # Create your views here.
# def home(request):
#     return HttpResponse("Hello, World")

# HTML Template Version
def home(request):
    return render(request, "home.html")

def contact(request):
    return render(request, "contact.html")

def blog(request):
    return render(request, "blog.html")
