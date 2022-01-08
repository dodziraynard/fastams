import django

django.setup()
from dashboard.models import Setting
from fastams.utils.constants import MESSAGE_SUCCESS, MESSAGE_FAILED
from dashboard.models import Message
from dashboard.models import BulkSMS
from django.conf import settings
import pandas as pd
from celery import shared_task
import requests
from requests.exceptions import RequestException, Timeout


@shared_task
def make_sms_request(api_key, msg_id, frm):
    message = Message.objects.filter(id=msg_id).first()
    if not message: return None
    url = f"https://sms.arkesel.com/sms/api?action=send-sms&api_key={api_key}&to={message.number}&from={frm}&sms={message.text}"
    response = requests.get(url)
    try:
        if response.status_code == 200:
            response = response.json()
            message.provider_response = str(response)
            balance = response.get("balance")
            if balance:
                setting = Setting.objects.first()
                setting.balance = balance
                setting.save()
            if response.get("code") == "ok":
                message.status = MESSAGE_SUCCESS
                message.save()
                return message.status
    except (RequestException, ConnectionError, Timeout) as e:
        message.provider_response = str(e)
    message.status = MESSAGE_FAILED
    message.save()
    return message.status


@shared_task
def send_sms(bulk_sms_id):
    api_key = Setting.objects.first().api_key
    Message.objects.all().delete()
    bulk_sms = BulkSMS.objects.filter(id=bulk_sms_id).first()
    if not bulk_sms:
        return "NO BULK SMS FOUND"

    text = bulk_sms.text

    # Process Inputted numbeds
    details = bulk_sms.numbers.split(",")
    if details:
        for detail in details:
            if not detail: continue

            if len(detail.split(";")) > 1:
                number, name = detail.split(";")
            else:
                number, name = detail.strip(), ""

            sms = text.replace("%name%", name)
            message = Message.objects.create(text=sms,
                                             number=number,
                                             from_bulk=bulk_sms)
            make_sms_request.delay(api_key, message.id, "HRD")
            break

    # Process Uploaded number file
    file = bulk_sms.file
    if file:
        url = settings.BASE_DIR / file.url[1:]
        df = pd.read_excel(url, header=4, dtype=str)
        result = [(x, y) for x, y in zip(df['NUMBER'], df['NAME'])]

        for number, name in result:
            sms = text
            if isinstance(name, str):
                sms = sms.replace("%name%", name)
            message = Message.objects.create(text=sms,
                                             number=number,
                                             from_bulk=bulk_sms)
            make_sms_request.delay(api_key, message.id, "KETASCO")
            break


def resend_sms_with_ids(ids):
    api_key = Setting.objects.first().api_key
    for _id in ids:
        make_sms_request.delay(api_key, _id, "KETASCO")