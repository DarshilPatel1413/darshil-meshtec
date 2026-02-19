import React, { useState } from "react";

export default function AddUserForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim values to avoid space-only input
    const name = form.name.trim();
    const email = form.email.trim();
    const city = form.city.trim();

    if (!name || !email || !city) {
      setError("All fields are required");
      return;
    }

    // Optional email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Enter valid email");
      return;
    }

    onAdd({
      name,
      email,
      city,
    });

    // Reset form
    setForm({
      name: "",
      email: "",
      city: "",
    });

    setError("");
  };

  return (
    <form className="formCard" onSubmit={handleSubmit}>
  <h3>Add New User</h3>

  <div className="formRow">
    <input
      name="name"
      placeholder="Name"
      value={form.name}
      onChange={handleChange}
    />

    <input
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
    />

    <input
      name="city"
      placeholder="City"
      value={form.city}
      onChange={handleChange}
    />
  </div>

  {error && <p className="error">{error}</p>}

  <button className="primaryBtn" type="submit">
    Add User
  </button>

</form>

  );
}
