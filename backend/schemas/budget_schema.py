from pydantic import BaseModel


class BudgetCreate(BaseModel):
    amount: float


class BudgetResponse(BaseModel):
    id: int
    amount: float

    class Config:
        from_attributes = True