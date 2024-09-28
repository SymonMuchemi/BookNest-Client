import { Plus } from "lucide-react";
import { useState } from "react";
import { createBook } from "../../utils/api";

const AddBook = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
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
      const response = await createBook(formData);
      console.log("Book added:", response.data);
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.log("Error adding book:", error);
      alert("Failed to add book");
    }
  };

  return (
    <div className="add-container">
      <button id="add-btn" onClick={() => setShowForm(!showForm)}>
        <Plus size={20} />
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

export default AddBook;
