from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import aiosmtplib


class SMTPEmail:
    """
    Class for sending email
    """

    def __init__(self, host: str, port: int, sender: str, password: str):
        self.host = host
        self.port = port
        self.sender = sender
        self.password = password

    async def send(self, subject, to, text) -> None:
        """
        send email
        """
        msg = MIMEMultipart()
        msg["Subject"] = subject
        msg["from"] = self.sender
        msg["to"] = to

        msg.attach(MIMEText(text, "plain"))

        server = aiosmtplib.SMTP(hostname=self.host, port=self.port)
        await server.connect()
        await server.login(self.sender, self.password)
        await server.send_message(msg)
        await server.quit()
