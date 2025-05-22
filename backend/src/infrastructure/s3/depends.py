from typing import Annotated

from fastapi import Depends

from config import global_setttigns, settings

from .s3_service import S3BucketService


def s3_bucket_service_factory() -> S3BucketService:
    return S3BucketService(
        settings.S3_BUCKET_NAME,
        settings.S3_PATH + ":" + global_setttigns.S3_PORT,
        global_setttigns.S3_USER,
        global_setttigns.S3_PASSWORD,
    )


s3_service_factory = Annotated[S3BucketService, Depends(s3_bucket_service_factory)]
