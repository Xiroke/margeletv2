from typing import Protocol
from uuid import UUID


class IdModelBase(Protocol):
    id: UUID
