
function ExpenseList({ transactions, deleteTransaction, editTransaction }) {
  return (
    <div>
      <h2>Expense List</h2>

      <table>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.text}</td>
              <td>₹{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>
                <button
                  onClick={() => editTransaction(transaction)}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
