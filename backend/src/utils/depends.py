from fastapi.security import OAuth2PasswordBearer

# This is used only for authorize in docs page
Oauth2SchemeDep = OAuth2PasswordBearer(
    tokenUrl="auth/access_token",
    scheme_name="access_token",
)

__all__ = ["Oauth2SchemeDep"]
