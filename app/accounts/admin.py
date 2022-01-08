import os
import logging
from django.contrib import admin
from .models import User

logger = logging.getLogger("django")

admin.site.register(User)

SUPER_ADMIN_EMAIL_ADDRESS = os.environ.get("SUPER_ADMIN_EMAIL_ADDRESS",
                                           default="admin@email.com")
SUPER_ADMIN_PASSWORD = os.environ.get("SUPER_ADMIN_PASSWORD", default="admin")

# Create default superuser
try:
    superadmin, created = User.objects.get_or_create(
        email_address=SUPER_ADMIN_EMAIL_ADDRESS,
        is_superuser=True,
        is_staff=True)
    logger.info("Super user created: " + str(created))
    if created:
        superadmin.set_password(SUPER_ADMIN_PASSWORD)
        superadmin.save()
        superadmin.tile = "Mr."
        logger.info("Set default password.")
except Exception as e:
    logger.info("Failed to create defautl superuser.: " + str(e))
