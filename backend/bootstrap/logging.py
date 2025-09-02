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

    for handler in logger.handlers[:]:
        logger.removeHandler(handler)

    stream_handler = logging.StreamHandler()
    file_handler = logging.FileHandler("log.log", mode="a")

    text_style = "%(levelname)s - %(asctime)s - %(name)s - %(message)s"
    formatter = logging.Formatter(text_style)
    color_formatter = ColoredFormatter(text_style)

    file_handler.setFormatter(formatter)
    stream_handler.setFormatter(color_formatter)

    logger.addHandler(stream_handler)
    logger.addHandler(file_handler)


def register_logging():
    setup_logging()
    logging.getLogger("pymongo").setLevel(logging.INFO)
    logging.getLogger("multipart").setLevel(logging.INFO)
    logging.getLogger("asyncio").setLevel(logging.INFO)
    logging.getLogger("botocore.hooks").setLevel(logging.INFO)
