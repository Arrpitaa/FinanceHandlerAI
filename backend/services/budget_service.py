from sqlalchemy.orm import Session

from models.budget import Budget


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