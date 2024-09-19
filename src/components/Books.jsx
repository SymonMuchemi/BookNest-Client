import { useState, useCallback, useEffect } from "react";
import { Search, Edit, Trash2 } from "lucide-react";
import AddBook from "./AddBook";
import { fetchBooks, fetchBooksBySearch, deleteBook } from "../utils/api";

function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (searchTerm) {
        response = await fetchBooksBySearch(
          searchType,
          searchTerm,
          currentPage,
          perPage
        );
      } else {
        response = await fetchBooks(`?page=${currentPage}&per_page=${perPage}`);
      }
      setBooks(response.data.books);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Error loading books");
      console.error(err);
    }
    setIsLoading(false);
  }, [searchTerm, searchType, currentPage, perPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteBook(id);
      if (response.status === 200) {
        fetchData();
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="books">
      <h1>Books</h1>
      <div className="flex justify-between mb-6">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          <button type="submit">
            <Search size={20} />
          </button>
        </form>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {books.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Author</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.quantity}</td>
                  <td className="actions">
                    <button className="edit">
                      <Edit size={16} />
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(book.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
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
          <AddBook onBookAdded={fetchData} />
        </>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default Books;
