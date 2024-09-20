import { Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { updateMember } from "../utils/api";
import PropTypes from "prop-types";

const EditMember = ({ member, onMemberUpdated }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: member.id,
    name: member.name,
    debt: member.debt,
  });

  useEffect(() => {
    setFormData({
      id: member.id,
      name: member.name,
      debt: member.debt,
    });
  }, [member]);

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
      const response = await updateMember(formData);
      console.log("member updated:", response.data);
      setShowForm(false);
      if (onMemberUpdated) {
        onMemberUpdated();
      }
    } catch (error) {
      console.log("Error updating member:", error);
      alert("Failed to update member");
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
            <h2>{`Update ${member.name}`}</h2>
            <label>
              Id:
              <input
                placeholder="New Member's ID"
                type="number"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Name:
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

EditMember.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    debt: PropTypes.number.isRequired,
  }).isRequired,
  onMemberUpdated: PropTypes.func.isRequired,
};

export default EditMember;
