
import { useState, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import AddExpenseForm from "./components/AddExpenseForm";
import EditExpenseForm from "./components/EditExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Load transactions from localStorage
  useEffect(() => {
    const savedTransactions = JSON.parse(
      localStorage.getItem("transactions")
    );

    if (savedTransactions) {
      setTransactions(savedTransactions);
    }
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  // Update a transaction
  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  };

  // Select a transaction for editing
  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  // Calculate total expenses
  const calculateTotalExpenses = transactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  return (
    <div className="App">
      <Header />

      <main className="container">
        {editingTransaction ? (
          <EditExpenseForm
            editTransaction={updateTransaction}
            transaction={editingTransaction}
          />
        ) : (
          <AddExpenseForm addTransaction={addTransaction} />
        )}

        <h2 className="total">
          Total Expenses: ₹{calculateTotalExpenses}
        </h2>

        <ExpenseList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
        />
      </main>
    </div>
  );
}

export default App;
