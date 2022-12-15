from django.db.models.signals import post_save
from django.dispatch import receiver

from .tasks import send_register_mail
from .models import CustomUser


@receiver(post_save, sender=CustomUser)
def send_welcome_email(*args, **kwargs):
    instance = kwargs.get('instance')
    created = kwargs.get('created')
    print("USER ID---->", instance.id)

    if created:
        try:
            send_register_mail.delay(instance.id)
        except Exception as exc:
            print(exc)
