export default function UserTable({ users, onSelect }) {
  return (
    <div className="cardGrid">
      {users.map((user) => (
        <div
          key={user.id}
          className="userCard"
          onClick={() => onSelect(user)}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <div className="cardInfo">
            <span>{user.company?.name}</span>
            <span>{user.address?.city}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
