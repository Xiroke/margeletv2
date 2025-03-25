from fastapi import FastAPI
from src.auth.router import router as auth_router

app = FastAPI()

app.include_router(auth_router)


@app.get("/")
def ping():
    return "pong"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
