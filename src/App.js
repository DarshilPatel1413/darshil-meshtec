import React, { useMemo, useState } from "react";
import useFetchUsers from "./hooks/useFetchUsers";
import UserTable from "./components/UserTable";
import UserModal from "./components/UserModal";
import AddUserForm from "./components/AddUserForm";
import "./App.css";

const API = "https://jsonplaceholder.typicode.com/users";

function App() {
  const { data: users, setData: setUsers, loading, error } = useFetchUsers(API);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    let list = [...users];

    if (search) {
      list = list.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    list.sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

    return list;
  }, [users, search, sortOrder]);

  const addUser = (user) => {
    const newUser = {
      id: Date.now(),
      ...user,
      company: { name: "Local Company" },
      address: { city: user.city },
    };

    const updated = [newUser, ...users];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  if (loading) return <p className="center">Loading users...</p>;
  if (error) return <p className="center error">{error}</p>;

  return (
   <div className="app">
  <div className="container">
    <h1 className="title">User Dashboard</h1>

    <div className="topBar">
      <input
        className="searchInput"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="sortBtn"
        onClick={() =>
          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }
      >
        Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
      </button>
    </div>

    <AddUserForm onAdd={addUser} />

    <UserTable users={filteredUsers} onSelect={setSelectedUser} />

    {selectedUser && (
      <UserModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    )}
  </div>
</div>

  );
}

export default App;
