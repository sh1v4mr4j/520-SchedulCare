
from pydantic import BaseModel
from typing import List

# Pydantic models for request validation
class CartItem(BaseModel):
    name: str
    price: float
    quantity: int

class CreateOrderRequest(BaseModel):
    cart: List[CartItem]