
import { useState } from "react";

function EditExpenseForm({ editTransaction, transaction }) {
  const [text, setText] = useState(transaction.text);
  const [amount, setAmount] = useState(transaction.amount);
  const [date, setDate] = useState(transaction.date);

  const handleSubmit = (e) => {
    e.preventDefault();

    editTransaction({
      ...transaction,
      text,
      amount: Number(amount),
      date
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Expense</h2>

      <label>Expense Name</label>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">Update Expense</button>
    </form>
  );
}

export default EditExpenseForm;
