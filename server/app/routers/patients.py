from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from app.routers.tester import NoBiggie
from app.shared.response import ResponseUtils

app = APIRouter()

@app.get("/healthCheck")
async def health_check():
    return ResponseUtils.ok("I'm alive")

@app.get("/healthCheck2")
async def health_check2():
    nb = NoBiggie(age=10, name="John")
    return JSONResponse(content=jsonable_encoder(nb), status_code=200)