import logging

log = logging.getLogger(__name__)


class SMTPLog:
    """
    Class for sending email
    """

    async def send(self, subject, to, text) -> None:
        """
        send message to log
        """
        log.info("Message to %s, Subject: %s, Text: %s", to, subject, text)
