from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from schemas.budget_schema import (
    BudgetCreate,
    BudgetResponse
)

from services.budget_service import (
    create_budget,
    get_all_budgets
)

router = APIRouter(
    prefix="/budgets",
    tags=["Budgets"]
)


@router.get(
    "/",
    response_model=list[BudgetResponse]
)
def get_budgets(
    db: Session = Depends(get_db)
):
    return get_all_budgets(db)


@router.post(
    "/",
    response_model=BudgetResponse
)
def add_budget(
    budget: BudgetCreate,
    db: Session = Depends(get_db)
):
    return create_budget(
        db=db,
        amount=budget.amount
    )