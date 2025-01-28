import React, { createContext, useReducer } from "react";

const initialState = {
  income: 500,
  expenses: [
    { id: 1, text: "Shopping", amount: -75 },
    { id: 2, text: "Car", amount: -125 },
  ],
};

export const ExpenseContext = createContext(initialState);

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  function addTransaction(transaction) {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  }

  function deleteTransaction(id) {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }

  return (
    <ExpenseContext.Provider
      value={{
        income: state.income,
        expenses: state.expenses,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
