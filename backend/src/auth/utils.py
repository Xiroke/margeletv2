from fastapi import Request


def get_token_from_cookie(request: Request):
    return request.cookies.get("refresh_token")
