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

useEffect(() => {
fetchSummary();
}, []);

const fetchSummary = async () => {
try {
const response = await api.get("/budgets/summary");
setSummary(response.data);
} catch (error) {
console.error("Error fetching summary:", error);
}
};

return ( <div className="container">

```
  <nav className="navbar">
    <div className="logo">
      Finance Handler AI
    </div>

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

      <button>
        Add Expense
      </button>

      <button>
        Add Budget
      </button>

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
</div>

);
}

export default App;
