import React from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <ExpenseTracker />
      </div>
    </ExpenseProvider>
  );
}

export default App;
