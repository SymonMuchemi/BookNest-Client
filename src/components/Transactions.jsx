import { useState, useCallback, useEffect } from "react";
import { fetchTransactions } from "../utils/api";
import RetrieveBook from "./RetrieveBook";
import IssueBook from "./IssueBook";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let perPage = 10;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    let response;
    try {
      response = await fetchTransactions(currentPage, perPage);
      setTransactions(response.data.transactions);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Error loading Transactions");
      console.error(err);
    }
    setIsLoading(false);
  }, [currentPage, perPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not returned";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="records">
      <h1>Transactions</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {transactions.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Member Name</th>
                <th>Book Title</th>
                <th>Date Issued</th>
                <th>Date Returned</th>
                <th>Charge</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>
                      {transaction.member_name} [{transaction.member_id}]
                    </td>
                    <td>
                      {transaction.book_title} [{transaction.book_id}]
                    </td>
                    <td>{formatDate(transaction.issued_on)}</td>
                    <td>{formatDate(transaction.returned_on)}</td>
                    <td>{transaction.charge}</td>
                    <td>{transaction.type}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="record-actions">
            <RetrieveBook />
            <IssueBook />
          </div>
        </>
      ) : (
        <p>No Transactions found.</p>
      )}
    </div>
  );
}

export default Transactions;
