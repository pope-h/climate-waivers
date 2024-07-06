import pika
import os
import json

import logging
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from djoser.compat import get_user_email
from urllib.parse import urljoin
from app.models import User, Token

from .utils import Util

logger = logging.getLogger(__name__)

# Connection URL
AMQP_URL = os.environ.get("AMQP_URL")

# Queues
QUEUES = {
    "custom_mail": "custom_mail",
    "forget_password": "forget_password",
    "onboarding": "onboarding",
    "verification": "verification",
}

# Data types
DATA_TYPES = {
    "custom_mail": {"email": str, "data": {"content": str}},
    "disaster_alert": {"email": str, "data": {"location": str, "disasterType": str}},
    "forget_password": {"email": str, "data": {"token": str}},
    "onboarding": {"email": str, "data": {}},
    "verification": {"email": str, "data": {"code": str}},
}


def send_message(queue_name, message):
    # Connect to RabbitMQ
    connection = pika.BlockingConnection(pika.URLParameters(AMQP_URL))
    channel = connection.channel()

    # Declare the queue
    channel.queue_declare(queue=queue_name, durable=False)

    # Publish the message
    channel.basic_publish(
        exchange="",
        routing_key=queue_name,
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ),
    )

    print(f" [x] Sent {message} to {queue_name}")

    # Close connection
    connection.close()


def send_activation_email(user_pk: int):
    if user := User.objects.filter(pk=user_pk).first():
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        confirmation_url = f"{settings.FRONTEND_URL}/register/verify/{token.token}/"
        send_message(
            "verification",
            message=json.dumps(
                {
                    "email": get_user_email(user),
                    "data": {"code": confirmation_url},
                }
            ),
        )
        logger.info(
            f"send_activation_email: Successfully sent message to user {user.pk}"  # noqa
        )
    else:
        logger.warning(f"send_activation_email: User: {user_pk} not found")


def send_reset_password_email(user_pk: int):
    if user := User.objects.filter(pk=user_pk).first():
        Token.objects.filter(user=user).delete()
        token = Token.objects.create(user=user)
        url = f"{settings.FRONTEND_URL}/forgot-password/{token.token}/"
        send_message(
            "forget_password",
            message=json.dumps(
                {
                    "email": get_user_email(user),
                    "data": {"token": url},  # Assuming token.token is a string
                }
            ),
        )
        logger.info(
            f"send_reset_password_email: Successfully sent message to user {user.pk}"
        )
    else:
        logger.warning(f"send_reset_password_email: User: {user_pk} not found")
