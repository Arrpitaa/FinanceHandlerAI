from sqlalchemy.orm import Session

from models.budget import Budget
from models.expense import Expense


def create_budget(
    db: Session,
    amount: float
):
    budget = Budget(
        amount=amount
    )

    db.add(budget)
    db.commit()
    db.refresh(budget)

    return budget


def get_all_budgets(db: Session):
    return db.query(Budget).all()


def get_budget_summary(db: Session):
    total_budget = sum(
        budget.amount
        for budget in db.query(Budget).all()
    )

    total_expenses = sum(
        expense.amount
        for expense in db.query(Expense).all()
    )

    remaining_budget = (
        total_budget - total_expenses
    )

    if remaining_budget >= 0:
        budget_status = "Within Budget"
    else:
        budget_status = "Budget Exceeded"

    return {
        "total_budget": total_budget,
        "total_expenses": total_expenses,
        "remaining_budget": remaining_budget,
        "budget_status": budget_status
    }