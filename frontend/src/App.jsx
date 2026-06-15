import { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";

function App() {
const [summary, setSummary] = useState({
total_budget: 0,
total_expenses: 0,
remaining_budget: 0,
budget_status: "",
});

const [expenses, setExpenses] = useState([]);

const [expenseData, setExpenseData] = useState({
title: "",
amount: "",
category: "",
});

useEffect(() => {
fetchSummary();
fetchExpenses();
}, []);

const fetchSummary = async () => {
try {
const response = await api.get("/budgets/summary");
setSummary(response.data);
} catch (error) {
console.error("Error fetching summary:", error);
}
};

const fetchExpenses = async () => {
try {
const response = await api.get("/expenses/");
setExpenses(response.data);
} catch (error) {
console.error("Error fetching expenses:", error);
}
};

const handleChange = (e) => {
setExpenseData({
...expenseData,
[e.target.name]: e.target.value,
});
};

const addExpense = async () => {
try {
await api.post("/expenses/", {
title: expenseData.title,
amount: Number(expenseData.amount),
category: expenseData.category,
});

  await fetchExpenses();
  await fetchSummary();

  setExpenseData({
    title: "",
    amount: "",
    category: "",
  });
} catch (error) {
  console.error("Error adding expense:", error);
}


};

return ( <div className="container"> <nav className="navbar"> <div className="logo">
Finance Handler AI </div>

```
    <div className="nav-links">
      Dashboard
    </div>
  </nav>

  <div className="welcome-section">
    <h2>Welcome Back 👋</h2>
  </div>

  <div className="hero">
    <div className="hero-content">
      <h1>Finance Handler AI</h1>

      <p>
        Smart AI Powered Personal Finance Management
      </p>

      <div className="hero-buttons">
        <button>Add Expense</button>
        <button>Add Budget</button>
      </div>
    </div>
  </div>

  <div className="cards">
    <div className="card">
      <h2>Total Budget</h2>
      <p>₹{summary.total_budget}</p>
    </div>

    <div className="card">
      <h2>Total Expenses</h2>
      <p>₹{summary.total_expenses}</p>
    </div>

    <div className="card">
      <h2>Remaining Budget</h2>
      <p>₹{summary.remaining_budget}</p>
    </div>

    <div className="card">
      <h2>Budget Status</h2>
      <p>{summary.budget_status}</p>
    </div>
  </div>

  <div className="expense-form">
    <h2>Add Expense</h2>

    <input
      type="text"
      name="title"
      placeholder="Title"
      value={expenseData.title}
      onChange={handleChange}
    />

    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={expenseData.amount}
      onChange={handleChange}
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      value={expenseData.category}
      onChange={handleChange}
    />

    <button onClick={addExpense}>
      Add Expense
    </button>
  </div>

  <div className="transactions">
    <h2>Recent Transactions</h2>

    {expenses.length === 0 ? (
      <p>No expenses found.</p>
    ) : (
      expenses.map((expense) => (
        <div
          key={expense.id}
          className="transaction-card"
        >
          <h3>{expense.title}</h3>

          <p>₹{expense.amount}</p>

          <span>{expense.category}</span>
        </div>
      ))
    )}
  </div>
</div>


);
}

export default App;
