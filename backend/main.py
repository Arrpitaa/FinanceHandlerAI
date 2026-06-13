from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_routes import router as user_router
from routes.auth_routes import router as auth_router
from routes.expense_routes import router as expense_router
from routes.budget_routes import router as budget_router

from database import engine
from models.user import User
from models.expense import Expense
from models.budget import Budget

# Create database tables
User.metadata.create_all(bind=engine)
Expense.metadata.create_all(bind=engine)
Budget.metadata.create_all(bind=engine)

app = FastAPI(
    title="Finance Handler AI",
    description="Agentic AI Finance Management System",
    version="1.0.0"
)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(expense_router)
app.include_router(budget_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Finance Handler AI Backend Running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "success",
        "server": "running"
    }