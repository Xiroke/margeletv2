from typing import Protocol


class SMTP(Protocol):
    async def send(self, subject: str, to: str, text: str): ...
