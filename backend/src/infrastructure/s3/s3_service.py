import logging
from io import BytesIO

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

        session = aioboto3.Session()

        # return context manager

        self.client = session.client(
            "s3",
            endpoint_url=self.endpoint,
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
        )

    async def save(
        self,
        key: str,
        value: str | bytes,
    ) -> None:
        """
        Upload file to S3
        key - path to file
        value - file
        """
        destination_file_name = key

        if isinstance(value, bytes):
            buffer = BytesIO(value)
        else:
            buffer = BytesIO(value.encode("utf-8"))

        await self.client.upload_fileobj(
            buffer, self.bucket_name, destination_file_name
        )

    async def list_objects(self, key: str) -> list[str]:
        """
        List objects in the bucket
        key - path to file
        """
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

    async def get(self, key: str, chunk_size: int = 69 * 1024):
        """
        Get file object from S3
        key - path to file
        """

        try:
            file_obj = await self.client.get_object(
                Bucket=self.bucket_name, Key=key, chunk_size=chunk_size
            )

            file_data = await file_obj["Body"].read()

        except ClientError as e:
            if e.response["Error"]["Code"] == "NoSuchKey":
                raise HTTPException(  # noqa: B904
                    status_code=404,
                    detail="File not found",
                )
            logger.error(str(e))
            raise HTTPException(500, "Unknown error")

        if file_data is None:
            raise ServiceNotFoundException()

        return file_data

    async def delete(self, key: str) -> None:
        """
        Delete file object from S3
        key - path to file
        """
        self.client.delete_object(Bucket=self.bucket_name, Key=key)

    async def save_image(self, key: str, value: UploadFile):
        """
        Upload file to S3
        key - path to file
        value - image
        """
        try:
            # convert image to .jpg and save
            with Image.open(BytesIO(await value.read())) as img:
                img = img.convert("RGB")
                img_byte_arr = BytesIO()
                img.save(img_byte_arr, format="JPEG")
                img_byte_arr.seek(0)

            await self.save(key, img_byte_arr.getvalue())
        except Exception:
            raise ServerException()

        return key
