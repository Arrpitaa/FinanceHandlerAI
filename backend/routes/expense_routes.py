from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from schemas.expense_schema import (
    ExpenseCreate,
    ExpenseResponse
)

from services.expense_service import (
    create_expense,
    get_all_expenses,
    delete_expense
)

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.get(
    "/",
    response_model=list[ExpenseResponse]
)
def get_expenses(
    db: Session = Depends(get_db)
):
    return get_all_expenses(db)


@router.post(
    "/",
    response_model=ExpenseResponse
)
def add_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):
    return create_expense(
        db=db,
        title=expense.title,
        amount=expense.amount,
        category=expense.category
    )

@router.delete("/{expense_id}")
def remove_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    return delete_expense(
        db=db,
        expense_id=expense_id
    )