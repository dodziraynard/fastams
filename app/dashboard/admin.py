from django.contrib import admin
from dashboard.models import BulkSMS, Message, Setting
from django.conf import settings
import logging

admin.site.register(Message)
admin.site.register(BulkSMS)
admin.site.register(Setting)

logger = logging.getLogger("django")

# Create Init Settings
try:
    if not Setting.objects.first():
        Setting.objects.create(api_key=settings.SMS_API_KEY,
                               sender_id="KETASCO")
except Exception as e:
    logger.info("Failed to create defautl settings.: " + str(e))
