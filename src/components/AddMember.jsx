import { Plus } from "lucide-react";
import { useState } from "react";
import { createMember } from "../utils/api";

const AddMember = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    debt: 0,
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
      const response = await createMember(formData);
      console.log("Member registered:", response.data);
      setShowForm(false);
      window.location.reload();
    } catch (error) {
      console.log("Error creating member:", error);
      alert("Failed to create member");
    }
  };

  return (
    <div className="add-container">
      <button id="add-btn" onClick={() => setShowForm(!showForm)}>
        <Plus size={20} />
        Register a New Member
      </button>
      {showForm && (
        <div className="popup-form">
          <form onSubmit={handleSubmit}>
            <h2>Register a New Member</h2>
            <label>
              name:
              <input
                type="text"
                name="name"
                placeholder="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              debt:
              <input
                type="number"
                name="debt"
                placeholder="debt"
                value={formData.debt}
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

export default AddMember;
