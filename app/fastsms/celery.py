import os
from celery import Celery

app = Celery('fastsms')
app.config_from_object('django.conf:settings', namespace='CELERY')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fastsms.settings')
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
