from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import handler404
from django.shortcuts import render

def custom_404(request, exception=None):
    return render(request, "404.html", status=404)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('uapp.urls')), # Include the URLs from uapp
    path("ckeditor/", include("ckeditor_uploader.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)