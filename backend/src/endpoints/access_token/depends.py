from typing import Annotated

from fastapi import Depends

from .service import read_access_token_cookie, write_access_token_cookie

access_token_factory = Annotated[str, Depends(read_access_token_cookie)]
write_access_token = write_access_token_cookie
