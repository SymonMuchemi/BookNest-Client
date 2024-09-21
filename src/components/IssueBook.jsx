import { useState } from "react";
import { issueBook } from "../utils/api";

const IssueBook = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    book_id: "",
    member_id: "",
  });
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const response = await issueBook(formData);
      console.log("Book issued successfully:", response.data);
      setMessage({ type: "success", text: response.data.Message });
      setShowForm(false);
      setFormData({ book_id: "", member_id: "" });
    } catch (error) {
      console.error("Error issuing book:", error);
      if (error.response) {
        if (error.response.status === 400) {
          setMessage({
            type: "error",
            text: error.response.data.Error || "Failed to issue book",
          });
        } else {
          setMessage({ type: "error", text: "An unexpected error occurred" });
        }
      } else if (error.request) {
        setMessage({ type: "error", text: "No response from server" });
      } else {
        setMessage({ type: "error", text: "Error in request setup" });
      }
    }
  };

  return (
    <div className="add-container">
      <button id="add-btn" onClick={() => setShowForm(!showForm)}>
        Issue Book
      </button>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {showForm && (
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <h2>Issue Book</h2>
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

export default IssueBook;
