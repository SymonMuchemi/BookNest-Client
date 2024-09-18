import React from "react";
import useSWR from "swr";
import { Search, Edit, Trash2 } from "lucide-react";
import AddBook from "./AddBook";
import {
  fetchBooks,
  fetchBooksByAuthor,
  fetchBooksByTitle,
  deleteBook,
} from "../utils/api";

const fetcher = (url, params) => {
  if (url.includes("get_by_author")) {
    return fetchBooksByAuthor(params).then((res) => res.data);
  } else if (url.includes("get_by_title")) {
    return fetchBooksByTitle(params).then((res) => res.data);
  } else {
    return fetchBooks(params).then((res) => res.data);
  }
};

function Books() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchType, setSearchType] = React.useState("title");

  const getSearchKey = () => {
    if (!searchTerm) return ["/get_books"];
    if (searchType === "author") return ["/get_by_author", searchTerm];
    return ["/get_by_title", searchTerm];
  };

  const { data, error, isLoading } = useSWR(getSearchKey(), fetcher);

  const handleDelete = async (id) => {
    try {
      const response = await deleteBook(id);

      if (response.status === 200) {
        window.location.reload();
        console.log("Book deleted successfully");
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    console.log(searchType);
    const url = getSearchKey();
    console.log(url);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error);

    return <div>Error loading data</div>;
  }

  // if (data) console.log(data);

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
      {error && <div>Error loading data</div>}
      {data && data.books && data.books.length > 0 ? (
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
              {data.books.map((book, index) => (
                <tr key={index}>
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
          <AddBook />
        </>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default Books;
