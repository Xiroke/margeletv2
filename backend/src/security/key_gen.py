import secrets
from typing import Annotated

from fastapi import Depends


def generate_random_key():
    """Generate a key"""
    return secrets.token_urlsafe(32)


RandomKeyGen = Annotated[str, Depends(generate_random_key)]

all = ["RandomKeyGen"]
