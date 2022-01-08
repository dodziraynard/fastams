from django.shortcuts import get_object_or_404, redirect, render
from django.views import View
from django.contrib import messages
from dashboard.models import Message
from dashboard.tasks import resend_sms_with_ids
from fastsms.utils.functions import filter_sms_from_query_parameter
from dashboard.forms import SettingForm
from dashboard.models import Setting
from dashboard.tasks import send_sms

from dashboard.models import BulkSMS
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.urls import reverse
from fastsms.utils.constants import (
    MESSAGE_FAILED,
    MESSAGE_SUCCESS,
    MESSAGE_PENDING,
)


class IndexView(View):
    template_name = 'dashboard/index.html'

    @method_decorator(login_required(login_url="accounts:login"))
    def get(self, request):
        context = {
            "successes": Message.objects.filter(status=MESSAGE_SUCCESS),
            "failures": Message.objects.filter(status=MESSAGE_FAILED),
            "pendings": Message.objects.filter(status=MESSAGE_PENDING),
        }
        return render(request, self.template_name, context)


class MessagesView(View):
    template_name = 'dashboard/messages.html'

    @method_decorator(login_required(login_url="accounts:login"))
    def get(self, request):
        messages = filter_sms_from_query_parameter(request)
        context = {
            "sms": messages,
            **{k: v
               for k, v in request.GET.items()},
        }
        return render(request, self.template_name, context)


class ComposeMessageView(View):
    template_name = 'dashboard/compose.html'

    @method_decorator(login_required(login_url="accounts:login"))
    def get(self, request):
        _id = request.GET.get("id")
        template = BulkSMS.objects.filter(id=_id).first()
        context = {
            "template": template,
            "setting": Setting.objects.first(),
        }
        return render(request, self.template_name, context)

    @method_decorator(login_required(login_url="accounts:login"))
    def post(self, request):
        message = request.POST.get("message")
        numbers = request.POST.get("numbers")
        file = request.FILES.get("numbers_file")

        if not (message and any([numbers, file])):
            if not message:
                error = "Can't send empty message."
            elif not any([numbers, file]):
                error = "Please enter recipient number or upload a file containing the numbers."
            messages.add_message(request, messages.ERROR, error)
            return redirect("dashboard:index")

        bulk_sms = BulkSMS.objects.create(text=message,
                                          numbers=numbers,
                                          file=file)
        send_sms(bulk_sms.id)
        return redirect("dashboard:index")


class SettingView(View):
    template_name = "dashboard/settings.html"
    form_class = SettingForm

    @method_decorator(login_required(login_url="accounts:login"))
    def get(self, request, **kwargs):
        context = {
            "setting": Setting.objects.first(),
        }
        return render(request, self.template_name, context)

    @method_decorator(login_required(login_url="accounts:login"))
    def post(self, request, **kwargs):
        setting = Setting.objects.first()
        key = request.POST.get("api_key")
        sender_id = request.POST.get("sender_id")
        if key:
            setting.api_key = key
        if sender_id:
            setting.sender_id = sender_id
        setting.save()
        return redirect(request.META.get("HTTP_REFERER"))


class RetryFailedSMSView(View):
    template_name = 'dashboard/messages.html'

    @method_decorator(login_required(login_url="accounts:login"))
    def get(self, request, **kwargs):
        sms_id = request.GET.get("id")
        if sms_id:
            # Retry specific message
            sms_ids = [sms_id]
        else:
            sms = filter_sms_from_query_parameter(request)
            sms_ids = [s.get("id") for s in sms.values("id")]
        resend_sms_with_ids(sms_ids)
        messages.add_message(request, messages.INFO,
                             f"Retrying {len(sms_ids)} message(s)")
        query = request.META.get("QUERY_STRING")
        return redirect(reverse("dashboard:messages") + "?" + query)


class MessageDetailView(View):
    template_name = 'dashboard/message_detail.html'

    @method_decorator(login_required(login_url="accounts:login"))
    def get(self, request, sms_id, **kwargs):
        message = get_object_or_404(Message, id=sms_id)
        context = {
            "message": message,
        }
        return render(request, self.template_name, context)
