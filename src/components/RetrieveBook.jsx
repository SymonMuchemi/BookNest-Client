import { useState } from "react";
import { retrieveBook } from "../utils/api";

const RetrieveBook = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    book_id: "",
    member_id: "",
    type: "return",
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
      const response = await retrieveBook(formData);
      console.log("Book retrieved successfully", response.data);
      setShowForm(false);
    } catch (error) {
      console.log("Error adding book:", error);
      alert("Failed to retrieve book");
    }
  };

  return (
    <div className="add-container">
      <button id="add-btn" onClick={() => setShowForm(!showForm)}>
        Retrieve Book
      </button>
      {showForm && (
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <h2>Retrieve Book</h2>
            <label>
              Book Id:
              <input
                placeholder="Book Id"
                type="number"
                name="book_id"
                value={formData.book_id}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Member Id:
              <input
                type="number"
                name="member_id"
                placeholder="Member Id"
                value={formData.member_id}
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

export default RetrieveBook;
