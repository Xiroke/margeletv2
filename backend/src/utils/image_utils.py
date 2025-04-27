import os
from io import BytesIO

from fastapi import HTTPException, UploadFile
from PIL import Image

from src.infrastructure.s3 import S3BucketService


async def save_image_in_s3(
    prefix: str, filename: str, image: UploadFile, s3_bucket_service: S3BucketService
):
    """Save image in s3"""

    path_to_file = os.path.join(prefix, f"{filename}.jpg")
    try:
        # convert image to .jpg and save
        with Image.open(BytesIO(await image.read())) as img:
            img_byte_arr = BytesIO()
            img.save(img_byte_arr, format="JPEG")
            img_byte_arr.seek(0)

        await s3_bucket_service.upload_file_object(
            prefix, f"{filename}.jpg", img_byte_arr.getvalue()
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Unknown error occurred")  # noqa: B904

    return path_to_file
