from typing import Annotated

from fastapi import Depends

from config import settings

from .impl.smtp_email import SMTPEmail
from .impl.smtp_log import SMTPLog
from .smtp import SMTP


def SMTP_factory():
    if settings.smtp.TYPE == "email":
        return SMTPEmail(
            settings.smtp.HOST,
            settings.smtp.PORT,
            settings.smtp.USER,
            settings.smtp.PASSWORD,
        )
    elif settings.smtp.TYPE == "log":
        return SMTPLog()


SmtpDep = Annotated[SMTP, Depends(SMTP_factory)]

__all__ = ["SmtpDep"]
