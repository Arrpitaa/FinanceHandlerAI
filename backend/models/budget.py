from sqlalchemy import Column, Integer, Float
from database import Base


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)

    amount = Column(Float, nullable=False)