from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Annotated

import aiosmtplib
from fastapi import Depends

from config import settings


class SMTPEmail:
    """
    Class for sending email
    """

    async def send(self, to, subject, text) -> None:
        """
        send email
        """
        msg = MIMEMultipart()
        msg["Subject"] = subject
        msg["from"] = settings.SMTP_USER
        msg["to"] = to

        msg.attach(MIMEText(text, "plain"))

        server = aiosmtplib.SMTP(hostname=settings.SMTP_HOST, port=settings.SMTP_PORT)
        await server.connect()
        await server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        await server.send_message(msg)  # Отправка сообщения
        await server.quit()  # Закрываем соединение


smtp_email = Annotated[SMTPEmail, Depends()]

__all__ = ["smtp_email"]
