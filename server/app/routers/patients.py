from fastapi import APIRouter

from app.shared.response import Response

app = APIRouter()

@app.get("/healthCheck")
async def health_check():
    return Response(status_code=200, body="I'm alive")