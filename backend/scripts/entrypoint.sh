#!/bin/sh
set -e

echo "Running Alembic migrations..."
alembic upgrade head

echo "Starting application..."
exec uv run main.py