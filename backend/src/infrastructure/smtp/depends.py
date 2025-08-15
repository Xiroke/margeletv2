from typing import Annotated

from fastapi import Depends

from config import settings

from .smtp import SMTPEmail


def SMTP_factory():
    return SMTPEmail(
        settings.smtp.HOST,
        settings.smtp.PORT,
        settings.smtp.USER,
        settings.smtp.PASSWORD,
    )


SmtpDep = Annotated[SMTPEmail, Depends(SMTP_factory)]

__all__ = ["SmtpDep"]
