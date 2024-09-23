import { useState, useCallback, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { fetchMembers, deleteMember } from "../utils/api";
import AddMember from "./AddMember";
import EditMember from "./EditMember";

function Members() {
  const [Members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState(null);

  let perPage = 10;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    let response;
    try {
      response = await fetchMembers(currentPage, perPage);
      setMembers(response.data.members);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError("Error loading Members");
      console.error(err);
    }
    setIsLoading(false);
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteMember(id);
      if (response.status === 200) {
        fetchData();
      } else {
        console.error("Failed to delete member");
        alert("Member has books issued. Cannot delete.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      setMessage({ type: "error", text: "Member has books issued!" });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="records">
      <h1>Members</h1>
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {Members.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Members.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.name}</td>
                  <td className="actions">
                    <EditMember member={member} onMemberUpdated={fetchData} />
                    <button
                      className="delete"
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <AddMember onmemberAdded={fetchData} />
        </>
      ) : (
        <p>No Members found.</p>
      )}
    </div>
  );
}

export default Members;
