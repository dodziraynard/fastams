import os
from celery import Celery

app = Celery('messenger')
app.config_from_object('django.conf:settings', namespace='CELERY')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'messenger.settings')
os.environ.setdefault('FORKED_BY_MULTIPROCESSING', '1')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


def celery_info():
    return bool(app.control.inspect().active())
