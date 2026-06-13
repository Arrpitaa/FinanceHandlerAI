from pydantic import BaseModel


class BudgetCreate(BaseModel):
    amount: float


class BudgetResponse(BaseModel):
    id: int
    amount: float

    class Config:
        from_attributes = True

class BudgetSummary(BaseModel):
    total_budget: float
    total_expenses: float
    remaining_budget: float
    budget_status: str