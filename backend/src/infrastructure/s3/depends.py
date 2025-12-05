from typing import Annotated

from fastapi import Depends

from config import settings

from .s3_service import S3BucketService


async def s3_bucket_service_factory():
    endpoint_url = f"http://{settings.s3.PATH}:{settings.s3.PORT}"

    service = S3BucketService(
        bucket_name=settings.s3.BUCKET_NAME,
        endpoint=endpoint_url,
        access_key=settings.s3.USER,
        secret_key=settings.s3.PASSWORD,
    )

    async with service as s3:
        yield s3


S3ServiceDep = Annotated[S3BucketService, Depends(s3_bucket_service_factory)]
