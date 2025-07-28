"""
Configuración de Celery para Gym Fit.
"""

import os
from celery import Celery

# Configurar Django settings para Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.local')

app = Celery('gymfit')

# Configuración desde Django settings
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-descubrir tareas en todas las apps
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
