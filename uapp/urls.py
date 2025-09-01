from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import handler404
from django.shortcuts import render

def custom_404(request, exception=None):
    return render(request, "404.html", status=404)

handler404 = custom_404


urlpatterns = [
    path('', views.home, name='home'),
    path('about', views.about, name='about'),
    path('contact', views.contact, name='contact'),
    path('blog', views.blog, name='blog'),
]