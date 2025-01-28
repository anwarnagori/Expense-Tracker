import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseTracker = () => {
  const { income, expenses, addTransaction, deleteTransaction } =
    useContext(ExpenseContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const transactionDate = selectedDate || new Date().toLocaleString();

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
      date: transactionDate,
    };

    addTransaction(newTransaction);
    setText("");
    setAmount("");
    setSelectedDate("");
  };

  const handleAmountChange = (id, increment) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id
        ? { ...expense, amount: expense.amount + increment }
        : expense
    );

    updatedExpenses.forEach((expense) => {
      addTransaction(expense);
    });
  };

  return (
    <div className="main-content">
      <div className="income">
        <h4>
          Income: <br />
          <span>${income}</span>
        </h4>
      </div>
      <div className="expense-tracker">
        <h2>Expense Tracker</h2>
        <h3>
          Balance:
          <br />
          <span className="balance">
            $
            {income +
              expenses.reduce((acc, expense) => acc + expense.amount, 0)}
          </span>
        </h3>
        <div className="content">
          <ul>
            {expenses.map((expense) => (
              <li
                key={expense.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="btns">
                  <button
                    onClick={() => handleAmountChange(expense.id, 1)}
                    className="plus"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleAmountChange(expense.id, -1)}
                    className="minus"
                  >
                    -
                  </button>
                </div>
                <div className="spans">
                  <span>{expense.text} </span>
                  <span>${expense.amount}</span>
                  <span>({expense.date})</span>
                </div>
                <button
                  onClick={() => deleteTransaction(expense.id)}
                  style={{ marginRight: "10px" }}
                  className="delete"
                >
                  DELETE
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button type="submit" className="add-item">
            Add New Item
          </button>
        </form>
      </div>
      <div className="expense">
        <h4>
          Expenses:
          <br />$
          {Math.abs(
            expenses.reduce(
              (acc, expense) => acc + (expense.amount < 0 ? expense.amount : 0),
              0
            )
          )}
        </h4>
      </div>
    </div>
  );
};

export default ExpenseTracker;
