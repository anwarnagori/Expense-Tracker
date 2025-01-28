import React, { useState } from "react";
import './index.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false); 
  const [editId, setEditId] = useState(null);

  const handleExpenseAction = () => {
    if (expense && amount) {
      if (isEditing) {
        setExpenses(expenses.map((exp) =>
          exp.id === editId
            ? { ...exp, expense: expense, amount: parseFloat(amount) }
            : exp
        ));
        setIsEditing(false);
        setEditId(null);
      } else {
        setExpenses([
          ...expenses,
          { id: Date.now(), expense: expense, amount: parseFloat(amount) },
        ]);
      }

      setExpense("");
      setAmount("");
    } else {
      alert("Please enter both fields!");
    }
  };

  const startEditing = (id) => {
    const expenseToEdit = expenses.find((exp) => exp.id === id);
    setExpense(expenseToEdit.expense);
    setAmount(expenseToEdit.amount);
    setIsEditing(true);
    setEditId(id);
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Expense Name"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleExpenseAction}>
          {isEditing ? "Save Changes" : "Add Expense"}
        </button>
      </div>

      <div className="expenses-list">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.expense}: ${expense.amount}
              <button onClick={() => startEditing(expense.id)}>Edit</button>
              <button onClick={() => removeExpense(expense.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="total-expense">
        <h3>Total Expense: ${totalExpense.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default App;
