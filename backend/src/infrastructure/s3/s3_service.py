import aioboto3
from pathlib import Path
from io import BytesIO

from config import global_setttigns


class S3BucketService:
    def __init__(
        self, bucket_name: str, endpoint: str, access_key: str, secret_key: str
    ):
        self.bucket_name = bucket_name
        self.endpoint = endpoint
        self.access_key = access_key
        self.secret_key = secret_key

    async def create_s3_client(self):
        """
        Create S3 client context
        """
        session = aioboto3.Session()
        # return context manager
        return lambda: session.client(
            "s3",
            endpoint_url=self.endpoint,
            aws_access_key_id=self.access_key,
            aws_secret_access_key=self.secret_key,
        )

    async def upload_file_object(
        self,
        prefix: str,
        source_file_name: str,
        content: str | bytes,
    ) -> None:
        """
        Upload file to S3

        Args:
            prefix (str): Path to the file in the bucket
            source_file_name (str): Name which will be used in the bucket
            content (str | bytes): Content of the file or path to the file

        Example:
            upload_file_object(
                "/margelet/files",
                "file1.txt",
                "Hello world"
            )
        """
        client_context = await self.create_s3_client()
        destination_file_name = str(Path(prefix, source_file_name))

        if isinstance(content, bytes):
            buffer = BytesIO(content)
        else:
            buffer = BytesIO(content.encode("utf-8"))

        async with client_context() as client:
            await client.upload_fileobj(buffer, self.bucket_name, destination_file_name)

    async def list_objects(self, prefix: str) -> list[str]:
        """
        List objects in the bucket

        Args:
            prefix (str): Path to the file in the bucket

        Returns:
            list[str]: List of objects in the bucket

        Example:
            list_objects("margelet/files")
            # ["margelet/files/file1.txt", "margelet/files/file2.txt"]
        """
        client_context = await self.create_s3_client()

        async with client_context() as client:
            response = await client.list_objects_v2(
                Bucket=self.bucket_name, Prefix=prefix
            )

        storage_content: list[str] = []

        try:
            contents = response["Contents"]
        except KeyError:
            return storage_content

        for item in contents:
            storage_content.append(item["Key"])

        return storage_content

    async def get_file_object(self, prefix: str):  # -> Optional[StreamingBody]:
        """
        Get file object from S3

        Args:
            prefix (str): Path to the file in the bucket

        Example:
            file_body = await s3_service.get_file_object("margelet/files/file1.txt")
            content = await file_body.read()
        """
        client_context = await self.create_s3_client()
        async with client_context() as client:
            try:
                file_obj = await client.get_object(Bucket=self.bucket_name, Key=prefix)
            except Exception as ex:
                if ex.response["Error"]["Code"] == "NoSuchKey":
                    return None
                raise ex
        return file_obj["Body"]

    async def delete_file_object(self, prefix: str, source_file_name: str) -> None:
        """
        Delete file object from S3

        Args:
            prefix (str): Path to the file in the bucket
            source_file_name (str): Name which will be used in the bucket
        """
        client_context = await self.create_s3_client()
        async with client_context() as client:
            path_to_file = str(Path(prefix, source_file_name))
            client.delete_object(Bucket=self.bucket_name, Key=path_to_file)


def s3_bucket_service_factory() -> S3BucketService:
    return S3BucketService(
        'margelet',
        'https://localhost:' + global_setttigns.S3_PORT,
        global_setttigns.S3_USER,
        global_setttigns.S3_PASSWORD,
    )
