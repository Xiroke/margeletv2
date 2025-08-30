import logging

from colorama import Fore, Style, init


class ColoredFormatter(logging.Formatter):
    COLORS = {
        "DEBUG": Fore.BLUE,
        "INFO": Fore.GREEN,
        "WARNING": Fore.YELLOW,
        "ERROR": Fore.RED,
        "CRITICAL": Fore.RED + Style.BRIGHT,
    }

    def format(self, record):
        color = self.COLORS.get(record.levelname, Fore.WHITE)
        message = super().format(record)
        return f"{color}{message}{Style.RESET_ALL}"


def setup_logging():
    init(autoreset=True)

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    stream_handler = logging.StreamHandler()
    file_handler = logging.FileHandler("log.log", mode="a")

    formatter = ColoredFormatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")

    stream_handler.setFormatter(formatter)
    file_handler.setFormatter(formatter)

    logger.addHandler(stream_handler)
    logger.addHandler(file_handler)


def register_logging():
    setup_logging()
    logging.getLogger("pymongo").setLevel(logging.INFO)
    logging.getLogger("multipart").setLevel(logging.INFO)
    logging.getLogger("asyncio").setLevel(logging.INFO)
    logging.getLogger("botocore.hooks").setLevel(logging.INFO)
