export default function UserModal({ user, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <div className="modalHeader">
          <h2>{user.name}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modalContent">
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Website:</b> {user.website}</p>

          <p>
            <b>Address:</b>{" "}
            {user.address?.street}, {user.address?.city},{" "}
            {user.address?.zipcode}
          </p>
        </div>
      </div>
    </div>
  );
}
