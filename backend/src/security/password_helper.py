from dataclasses import dataclass
from typing import Annotated

from fastapi import Depends
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher


@dataclass
class PasswordHelper:
    """
    Установка хешировщика
    В один момент их может быть несколько, где первый - приоритеный
    Документация:
    https://frankie567.github.io/pwdlib/guide/#password-hashing
    """

    password_hash: PasswordHash = PasswordHash((Argon2Hasher(),))

    def verify(self, plain_password: str, hashed_password: str) -> bool:
        return self.password_hash.verify(plain_password, hashed_password)

    def hash(self, password: str) -> str:
        return self.password_hash.hash(password)


def get_password_helper():
    return PasswordHelper()


PasswordHelperDep = Annotated[PasswordHelper, Depends(get_password_helper)]

all = ["PasswordHelperDep"]
