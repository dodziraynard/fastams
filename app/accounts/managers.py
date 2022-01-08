from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class UserManager(BaseUserManager):
    """
    Custom user model manager where Account email_address is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email_address, password, **extra_fields):
        if not email_address:
            raise ValueError(_('Email field must be set'))

        photo = extra_fields.pop("photo", None)
        user = self.model(email_address=email_address, **extra_fields)
        if photo:
            user.photo = photo[0]
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email_address, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email_address, password, **extra_fields)