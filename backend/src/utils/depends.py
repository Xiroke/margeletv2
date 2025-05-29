from fastapi.security import OAuth2PasswordBearer

# This is used only for authorize in docs page
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="auth/access_token",
    scheme_name="access_token",
)
