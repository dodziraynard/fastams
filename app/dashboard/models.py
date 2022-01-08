from django.db import models
from fastsms.utils.constants import (
    MESSAGE_DRAFT,
    MESSAGE_FAILED,
    MESSAGE_SUCCESS,
    MESSAGE_PENDING,
)

STATUS_CHOICES = [
    (MESSAGE_DRAFT, MESSAGE_DRAFT),
    (MESSAGE_PENDING, MESSAGE_PENDING),
    (MESSAGE_SUCCESS, MESSAGE_SUCCESS),
    (MESSAGE_FAILED, MESSAGE_FAILED),
]


class BulkSMS(models.Model):
    text = models.TextField()
    numbers = models.TextField()
    file = models.FileField(upload_to="files", null=True, blank=True)
    status = models.CharField(max_length=50,
                              choices=STATUS_CHOICES,
                              default=MESSAGE_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "bulksms"

    def __str__(self):
        return self.text


class Message(models.Model):
    number = models.CharField(max_length=15)
    text = models.TextField()
    provider_response = models.TextField()
    status = models.CharField(max_length=50,
                              choices=STATUS_CHOICES,
                              default=MESSAGE_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    from_bulk = models.ForeignKey(BulkSMS,
                                  null=True,
                                  blank=True,
                                  on_delete=models.SET_NULL)

    class Meta:
        db_table = "messages"

    def __str__(self):
        return self.number


class Setting(models.Model):
    api_key = models.CharField(max_length=100, null=True, blank=True)
    sender_id = models.CharField(max_length=15, null=True, blank=True)
    balance = models.IntegerField(default=0)

    class Meta:
        db_table = "settings"

    def __str__(self):
        return "Settings"
