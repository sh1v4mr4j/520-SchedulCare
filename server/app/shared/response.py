from typing import Any
from pydantic import BaseModel
from app.shared.status import Status


class Response(BaseModel):
    status_code: Status
    body: Any

    class Config:
        arbitrary_types_allowed = True
        validate_assignment = False
        validate_default = False
        use_enum_values = True