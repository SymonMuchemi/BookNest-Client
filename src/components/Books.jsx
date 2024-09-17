import fetcher from "../utils";
import React from "react";
import useSWR from "swr";
import "./books.css";
import axios from "axios";
import AddBook from "./AddBook";

const baseUrl = "http://127.0.0.1:5000/api";

function Books() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchType, setSearchType] = React.useState("title");

  const getSearchURL = () => {
    if (searchTerm === "") {
      return `${baseUrl}/books/get_books?per_page=10`;
    }

    if (searchTerm === "author") {
      return `${baseUrl}/books/get_by_author/${searchTerm}`;
    }

    return `${baseUrl}/books/get_by_title/${searchTerm}`;
  };

  const { data, error, isLoading } = useSWR(getSearchURL(), fetcher);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/books/delete/${id}`);

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
    const url = getSearchURL();
    console.log(url);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  if (data) console.log(data);

  return (
    <div className="books">
      <h1>Books</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search"
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
        <button type="submit">Search</button>
      </form>
      {data && data.books && data.books.length > 0 ? (
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
                  <button className="edit">Edit</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books found.</p>
      )}
      {data && data.books && data.books.length > 0 && <AddBook />}
    </div>
  );
}

export default Books;
