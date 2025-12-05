import logging
from io import BytesIO
from types import TracebackType
from typing import Optional, Type

import aioboto3
from botocore.exceptions import ClientError
from fastapi import HTTPException, UploadFile
from PIL import Image

from src.core.abstract.storage_base import StorageBase
from src.utils.exceptions import ServerException, ServiceNotFoundException

logger = logging.getLogger(__name__)


class S3BucketService(StorageBase):
    def __init__(
        self, bucket_name: str, endpoint: str, access_key: str, secret_key: str
    ):
        self.bucket_name = bucket_name
        self.endpoint = endpoint
        self.access_key = access_key
        self.secret_key = secret_key
        self.session = aioboto3.Session()
        self.client = None
        self._exit_stack = None

    async def __aenter__(self):
        self.client = await self.session.client(
            "s3",
            endpoint_url=self.endpoint,
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
        ).__aenter__()
        return self

    async def __aexit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc_val: Optional[BaseException],
        exc_tb: Optional[TracebackType],
    ):
        if self.client:
            await self.client.__aexit__(exc_type, exc_val, exc_tb)

    async def save(
        self,
        key: str,
        value: str | bytes,
    ) -> None:
        destination_file_name = key

        if isinstance(value, bytes):
            buffer = BytesIO(value)
        else:
            buffer = BytesIO(value.encode("utf-8"))

        await self.client.upload_fileobj(
            buffer, self.bucket_name, destination_file_name
        )

    async def list_objects(self, key: str) -> list[str]:
        response = await self.client.list_objects_v2(
            Bucket=self.bucket_name, Prefix=key
        )

        storage_content: list[str] = []

        try:
            contents = response["Contents"]
        except KeyError:
            return storage_content

        for item in contents:
            storage_content.append(item["Key"])

        return storage_content

    async def get(self, key: str):
        try:
            file_obj = await self.client.get_object(Bucket=self.bucket_name, Key=key)

            file_data = await file_obj["Body"].read()

        except ClientError as e:
            if e.response["Error"]["Code"] == "NoSuchKey":
                raise HTTPException(
                    status_code=404,
                    detail="File not found",
                )
            logger.error(str(e))
            raise HTTPException(500, "Unknown error")

        if file_data is None:
            raise ServiceNotFoundException()

        return file_data

    async def delete(self, key: str) -> None:
        # ВАЖНО: Здесь тоже не хватало await!
        await self.client.delete_object(Bucket=self.bucket_name, Key=key)

    async def save_image(self, key: str, value: UploadFile):
        try:
            with Image.open(BytesIO(await value.read())) as img:
                img = img.convert("RGB")
                img_byte_arr = BytesIO()
                img.save(img_byte_arr, format="JPEG")
                img_byte_arr.seek(0)

            await self.save(key, img_byte_arr.getvalue())
        except Exception:
            raise ServerException()

        return key
