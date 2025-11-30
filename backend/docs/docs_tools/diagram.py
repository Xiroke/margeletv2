r"""
Paste this in console if you want install it on windows
uv pip install --config-settings="--global-option=build_ext" --config-settings="
--global-option=-IC:\Program Files\Graphviz\include" --config-settings="
--global-option=-LC:\Program Files\Graphviz\lib" pygraphviz
uv pip install erdantic
uv pip install eralchemy
Taken from
https://pygraphviz.github.io/documentation/stable/install.html
"""

import os
import pathlib
import sys
from pathlib import Path

from dotenv import load_dotenv

# Загружаем .env из корня проекта
load_dotenv(
    dotenv_path=pathlib.Path(__file__).resolve().parent.parent.parent.parent / ".env"
)

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

if sys.platform == "win32":
    path = pathlib.Path(r"C:\Program Files\Graphviz\bin")
    if path.is_dir() and str(path) not in os.environ["PATH"]:
        os.environ["PATH"] += f";{path}"

import erdantic as erd
from eralchemy import render_er

from src.core.db.database import Base
from src.core.db.models import *  # noqa: F403

## Draw from SQLAlchemy base
render_er(Base, str(Path(__file__).parent) + "/postgres_diagram.png")


from src.core.nosql.models import MessageModel

erd.draw(MessageModel, out=str(Path(__file__).parent) + "/schema_mongo_db.png")


### Class diagram
### pyreverse -o png -p Margelet src
