import "./styles/addBook.css";

import { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    quantity: 0,
    penalty_fee: 10,
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
      const response = await axios.post(
        "http://localhost:5000/api/books/create",
        formData
      );
      console.log("Book added:", response.data);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book");
    }
  };

  return (
    <div className="container">
      <button id="add-btn" onClick={() => setShowForm(!showForm)}>
        Add Book
      </button>
      {showForm && (
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <h2>Add Book</h2>
            <label>
              Name:
              <input
                placeholder="Book Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
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
            <br />
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
            <br />
            <label>
              Penalty_fee:
              <input
                defaultValue={10}
                placeholder="Penalty_fee"
                type="number"
                name="quantity"
                value={formData.penalty_fee}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <div className="buttons">
              <button type="submit">Submit</button>
              <button
                type="reset"
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

export default AddBook;
