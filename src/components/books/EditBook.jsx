import { Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { updateBook } from "../../utils/api";
import PropTypes from "prop-types";

const EditBook = ({ book, onBookUpdated }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: book.id,
    title: book.title,
    author: book.author,
    quantity: book.quantity,
    penalty_fee: book.penalty_fee,
  });

  useEffect(() => {
    setFormData({
      id: book.id,
      title: book.title,
      author: book.author,
      quantity: book.quantity,
      penalty_fee: book.penalty_fee,
    });
  }, [book]);

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
      console.log("Book updated:", response.data);
      setShowForm(false);
      if (onBookUpdated) {
        onBookUpdated();
      }
    } catch (error) {
      console.log("Error updating book:", error);
      alert("Failed to update book");
    }
  };

  return (
    <div className="edit-container">
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

EditBook.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    penalty_fee: PropTypes.number.isRequired,
  }).isRequired,
  onBookUpdated: PropTypes.func.isRequired,
};

export default EditBook;
