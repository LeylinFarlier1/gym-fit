"""
Configuración local para desarrollo en Docker.
"""

from .base import *
import os

# Debug
DEBUG = True

# Override SECRET_KEY for local development
SECRET_KEY = 'django-insecure-8^1acbp&@z-u9-&^r_%!8h2qd7)-^07$y^+wgr_+y$1-n!3)38'

# Ensure ALLOWED_HOSTS is set
ALLOWED_HOSTS = ['*']

# Database configuration for Docker
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'gymfit_db'),
        'USER': os.environ.get('POSTGRES_USER', 'gymadmin'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'gympassword'),
        'HOST': os.environ.get('SQL_HOST', 'db'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}

# Celery Configuration for Docker
CELERY_BROKER_URL = os.environ.get('CELERY_BROKER_URL', 'redis://cache:6379/0')
CELERY_RESULT_BACKEND = os.environ.get('CELERY_RESULT_BACKEND', 'redis://cache:6379/0')

# Configuración específica para desarrollo
CORS_ALLOW_ALL_ORIGINS = True  # Solo para desarrollo

# Logging para desarrollo
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}
