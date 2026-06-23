import { useEffect, useState } from "react";
import "./App.css";
import api from "./services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
const [summary, setSummary] = useState({
total_budget: 0,
total_expenses: 0,
remaining_budget: 0,
budget_status: "",
});

const [expenses, setExpenses] = useState([]);
const [categorySummary, setCategorySummary] = useState({});

const [expenseData, setExpenseData] = useState({
title: "",
amount: "",
category: "",
});

const [budgetAmount, setBudgetAmount] = useState("");

const spendingPercentage =
summary.total_budget > 0
? (
(summary.total_expenses /
summary.total_budget) *
100
).toFixed(1)
: 0;

const highestCategory =

Object.entries(categorySummary).length > 0
? (
Object.entries(categorySummary).sort(
(a, b) => b[1] - a[1]
)[0][0] || "Uncategorized"
)
: "N/A";
const chartData =
  Object.entries(categorySummary).map(
    ([category, amount]) => ({
      name:
        category ||
        "Uncategorized",
      value: amount,
    })
  );


useEffect(() => {
fetchSummary();
fetchExpenses();
fetchCategorySummary();
}, []);

const fetchSummary = async () => {
try {
const response = await api.get(
"/budgets/summary"
);
setSummary(response.data);
} catch (error) {
console.error(error);
}
};

const fetchExpenses = async () => {
try {
const response = await api.get(
"/expenses/"
);
setExpenses(response.data);
} catch (error) {
console.error(error);
}
};

const fetchCategorySummary = async () => {
try {
const response = await api.get(
"/expenses/category-summary"
);


  setCategorySummary(response.data);
} catch (error) {
  console.error(error);
}


};

const handleChange = (e) => {
setExpenseData({
...expenseData,
[e.target.name]: e.target.value,
});
};

const addExpense = async () => {

if (
!expenseData.title.trim() ||
!expenseData.amount ||
!expenseData.category.trim()
) {
alert(
"Please fill all fields before adding expense."
);
return;
}

try {
await api.post("/expenses/", {
title: expenseData.title,
amount: Number(expenseData.amount),
category: expenseData.category,
});


await fetchExpenses();
await fetchSummary();
await fetchCategorySummary();

setExpenseData({
  title: "",
  amount: "",
  category: "",
});


} catch (error) {
console.error(error);
}
};


const addBudget = async () => {
try {
await api.post("/budgets/", {
amount: Number(
budgetAmount
),
});


  await fetchSummary();

  setBudgetAmount("");
} catch (error) {
  console.error(error);
}


};

return ( <div className="container"> <nav className="navbar"> <div className="logo">
Finance Handler AI </div>


    <div className="nav-links">
      Dashboard
    </div>
  </nav>

  <div className="welcome-section">
    <h2>Welcome Back 👋</h2>
  </div>

  <div className="hero">
    <div className="hero-content">
      <h1>
        Finance Handler AI
      </h1>

      <p>
        Smart AI Powered Personal
        Finance Management
      </p>

      <div className="hero-buttons">
        <button>
          Add Expense
        </button>

        <button
          onClick={() =>
            document
              .getElementById(
                "budget-form"
              )
              ?.scrollIntoView({
                behavior:
                  "smooth",
              })
          }
        >
          Add Budget
        </button>
      </div>
    </div>
  </div>

  <div className="cards">
    <div className="card">
      <h2>Total Budget</h2>
      <p>
        ₹
        {summary.total_budget}
      </p>
    </div>

    <div className="card">
      <h2>Total Expenses</h2>
      <p>
        ₹
        {summary.total_expenses}
      </p>
    </div>

    <div className="card">
      <h2>
        Remaining Budget
      </h2>
      <p>
        ₹
        {summary.remaining_budget}
      </p>
    </div>

    <div className="card">
      <h2>Status</h2>
      <p>
        {summary.budget_status}
      </p>
    </div>
  </div>

  <div className="expense-form">
    <h2>Add Expense</h2>

    <input
      type="text"
      name="title"
      placeholder="Title"
      value={expenseData.title}
      onChange={
        handleChange
      }
    />

    <input
      type="number"
      name="amount"
      placeholder="Amount"
      value={expenseData.amount}
      onChange={
        handleChange
      }
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      value={expenseData.category}
      onChange={
        handleChange
      }
    />

    <button
      onClick={addExpense}
    >
      Add Expense
    </button>
  </div>

  <div
    id="budget-form"
    className="budget-form"
  >
    <h2>Add Budget</h2>

    <input
      type="number"
      placeholder="Enter Budget Amount"
      value={budgetAmount}
      onChange={(e) =>
        setBudgetAmount(
          e.target.value
        )
      }
    />

    <button
      onClick={addBudget}
    >
      Add Budget
    </button>
  </div>

  <div className="analytics">
    <h2>
      Budget Analytics
    </h2>

    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          width: `${Math.min(
            spendingPercentage,
            100
          )}%`,
        }}
      />
    </div>

    <p>
      Budget Used:{" "}
      {spendingPercentage}%
    </p>
  </div>

  <div className="stats-grid">
    <div className="stat-card">
      <h3>
        Total Transactions
      </h3>
      <p>{expenses.length}</p>
    </div>

    <div className="stat-card">
      <h3>Spent</h3>
      <p>
        ₹
        {summary.total_expenses}
      </p>
    </div>

    <div className="stat-card">
      <h3>Remaining</h3>
      <p>
        ₹
        {summary.remaining_budget}
      </p>
    </div>
  </div>

  <div className="category-analytics">
    <h2>
      Category Analytics
    </h2>

    {Object.entries(
      categorySummary
    ).map(
      ([category, amount]) => (
        <div
          key={category}
          className="category-card"
        >
          <h3>
            {category}
          </h3>

          <p>₹{amount}</p>
        </div>
      )
    )}
  </div>

<div className="chart-section">
  <h2>Expense Distribution</h2>

  <ResponsiveContainer
    width="100%"
    height={350}
  >
    <PieChart>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        outerRadius={120}
      >
        {chartData.map(
          (entry, index) => (
            <Cell
              key={index}
            />
          )
        )}
      </Pie>

      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
  <div className="ai-insights">
    <h2>AI Insights 🤖</h2>

    <div className="insight-card">
      <h3>
        Highest Spending
        Category
      </h3>

      <p>
        {highestCategory}
      </p>
    </div>

    <div className="insight-card">
      <h3>
        Budget Usage
      </h3>

      <p>
        {spendingPercentage}%
      </p>
    </div>

    <div className="insight-card">
      <h3>
        Recommendation
      </h3>

      <p>
        Focus on reducing
        spending in{" "}
        {highestCategory} to
        maximize savings.
      </p>
    </div>
  </div>

  <div className="transactions">
    <h2>
      Recent Transactions
    </h2>

    {expenses.length === 0 ? (
      <p>
        No expenses found.
      </p>
    ) : (
      expenses.map(
        (expense) => (
          <div
            key={expense.id}
            className="transaction-card"
          >
            <h3>
              {
                expense.title
              }
            </h3>

            <p>
              ₹
              {
                expense.amount
              }
            </p>

            <span>
              {
                expense.category
              }
            </span>
          </div>
        )
      )
    )}
  </div>
</div>

);
}

export default App;
