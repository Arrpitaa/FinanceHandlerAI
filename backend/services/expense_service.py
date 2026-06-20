from sqlalchemy.orm import Session

from models.expense import Expense


def create_expense(
    db: Session,
    title: str,
    amount: float,
    category: str
):
    expense = Expense(
        title=title,
        amount=amount,
        category=category
    )

    db.add(expense)
    db.commit()
    db.refresh(expense)

    return expense

def get_all_expenses(db: Session):
    return db.query(Expense).all()

def delete_expense(
    db: Session,
    expense_id: int
):
    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )

    if not expense:
        return {"message": "Expense not found"}

    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}
    
def get_category_summary(db: Session):
    expenses = db.query(Expense).all()

    summary = {}

    for expense in expenses:
        category = expense.category

        if category not in summary:
            summary[category] = 0

        summary[category] += expense.amount

    return summary