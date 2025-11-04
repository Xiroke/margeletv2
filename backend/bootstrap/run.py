import uvicorn


def run():
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, workers=1)
