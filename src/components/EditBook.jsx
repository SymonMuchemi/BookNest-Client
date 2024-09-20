import { Edit } from "lucide-react";
import { useState } from "react";
import { updateBook } from "../utils/api";

const EditBook = (book) => {
  console.log(book);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    quantity: book.quantity,
    penalty_fee: book.penalty_fee,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBook(formData);
      console.log("Book added:", response.data);
      setShowForm(false);
    } catch (error) {
      console.log("Error adding book:", error);
      alert("Failed to add book");
    }
  };

  return (
    <div className="add-container">
      <button id="edit-btn" onClick={() => setShowForm(!showForm)}>
        <Edit size={20} />
      </button>
      {showForm && (
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <h2>{`Update ${book.title}`}</h2>
            <label>
              Name:
              <input
                placeholder="Book Name"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Author:
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Quantity:
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Penalty Fee:
              <input
                type="number"
                name="penalty_fee"
                placeholder="Penalty Fee"
                value={formData.penalty_fee}
                onChange={handleInputChange}
                required
              />
            </label>
            <div className="buttons">
              <button type="submit">Submit</button>
              <button
                type="button"
                className="cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBook;
