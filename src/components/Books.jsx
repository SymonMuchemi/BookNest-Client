import fetcher from "../fetcher";
import useSWR from "swr";
import "./books.css";
import axios from "axios";

function Books() {
  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:5000/api/books/get_books?per_page=10",
    fetcher
  );

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/books/delete/${id}`
      );

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  if (data) console.log(data);

  return (
    <div className="books">
      <h1>Books</h1>
      {data && (
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
      )}
    </div>
  );
}

export default Books;
