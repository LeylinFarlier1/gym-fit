"""
URLs para la aplicación Gym.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Importar viewsets cuando los creemos
# from .views import MiembrosViewSet, ClasesViewSet, etc.

router = DefaultRouter()
# router.register(r'miembros', MiembrosViewSet)
# router.register(r'clases', ClasesViewSet)
# Agregar más rutas aquí cuando las creemos

urlpatterns = [
    path('', include(router.urls)),
]
