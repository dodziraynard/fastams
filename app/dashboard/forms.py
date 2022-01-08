from django import forms
from .models import Setting


class SettingForm(forms.ModelForm):
    api_key = forms.CharField(required=False)
    sender_id = forms.CharField(required=False)

    class Meta:
        model = Setting
        exclude = [
            "id",
        ]