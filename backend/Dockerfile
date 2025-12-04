FROM python:3.13-slim

ENV PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY backend/pyproject.toml backend/uv.lock ./

RUN uv sync --frozen --no-install-project --no-dev

ENV PATH="/app/.venv/bin:$PATH"

COPY backend ./backend

COPY backend/scripts/entrypoint.sh /entrypoint.sh

RUN sed -i 's/\r$//' /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /app/backend

ENTRYPOINT ["/entrypoint.sh"]