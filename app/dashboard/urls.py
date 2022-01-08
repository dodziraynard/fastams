from django.urls import path
from . import views

app_name = "dashboard"
urlpatterns = [
    path('', views.IndexView.as_view(), name="index"),
    path('messages', views.MessagesView.as_view(), name="messages"),
    path('compose', views.ComposeMessageView.as_view(), name="compose"),
    path('settings', views.SettingView.as_view(), name="settings"),
    path('retry_failed_sms',
         views.RetryFailedSMSView.as_view(),
         name="retry_failed_sms"),
    path('message_details/<str:sms_id>',
         views.MessageDetailView.as_view(),
         name="message_details"),
]
