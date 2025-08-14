from typing import Annotated

from fastapi import Depends

from config import settings

from .s3_service import S3BucketService


def s3_bucket_service_factory() -> S3BucketService:
    return S3BucketService(
        settings.s3.BUCKET_NAME,
        settings.s3.PATH + ":" + settings.s3.PORT,
        settings.s3.USER,
        settings.s3.PASSWORD,
    )


s3_service_factory = Annotated[S3BucketService, Depends(s3_bucket_service_factory)]
