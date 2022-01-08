from django.http import request
from dashboard.models import Message
from datetime import datetime, timedelta
from django.utils.timezone import make_aware
from django.db.models.query_utils import Q


def filter_sms_from_query_parameter(request):
    end = request.GET.get('end', "")
    start = request.GET.get('start', "")
    status = request.GET.get('status', "")
    count = request.GET.get('count', 300)
    query = request.GET.get('query')

    messages = Message.objects.all()
    if status:
        messages = messages.filter(status=status)
    try:
        start_date = datetime.strptime(start, '%Y-%m-%d')
    except ValueError:
        start_date = None
    try:
        end_date = datetime.strptime(end, '%Y-%m-%d')
    except ValueError:
        end_date = None
    if start_date:
        messages = messages.filter(created_at__gte=make_aware(start_date))
    if end_date:
        messages = messages.filter(created_at__lte=make_aware(end_date) +
                                   timedelta(days=1))
    if not count:
        count = 300

    if query:
        messages = messages.filter(
            Q(text__icontains=query) | Q(number__icontains=query))
    return messages.order_by("created_at")[:int(count)]


def check_balance():
    url = f"https://sms.arkesel.com/sms/api?action=check-balance&api_key={SMS_API_KEY}&response=json"
    response = request.get(url)