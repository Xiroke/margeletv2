FROM python:3.12-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc pipx \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install uv.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

COPY .env /app/.env

# Copy the application into the container.
WORKDIR /app/backend

RUN uv pip install --no-cache-dir uvicorn[standard] --system

COPY ./backend .
# Install the application dependencies.
ENV UV_PROJECT_ENVIRONMENT="/usr/local"
RUN uv sync --no-cache --frozen

RUN alembic upgrade head

CMD ["uv", "run", "main.py"]