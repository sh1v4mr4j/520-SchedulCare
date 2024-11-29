from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.services.payment_service import PaymentService
from app.models.payment import CreateOrderRequest

# Initialize FastAPI app
app = APIRouter()

# Instantiate the PaymentService
payment_service = PaymentService()

# Health check endpoint
@app.get("/")
def index():
    return {"message": "Server is running"}

# Route to create an order
@app.post("/orders")
async def create_order(order_request: CreateOrderRequest):
    try:
        cart = [item.dict() for item in order_request.cart]
        print(cart)
        response = await payment_service.create_order(cart)
        return JSONResponse(content=response, status_code=201)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to capture an order
@app.post("/orders/{order_id}/capture")
async def capture_order(order_id: str):
    try:
        response = await payment_service.capture_order(order_id)
        return JSONResponse(content=response, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
