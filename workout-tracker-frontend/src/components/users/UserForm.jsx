import React, { useState, useEffect } from "react";

const UserForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    if (initialData) {
      setForm({
        username: initialData.username || "",
        email: initialData.email || "",
        password: "", // Admin có thể nhập lại password mới
      });
    } else {
      setForm({ username: "", email: "", password: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    // Reset form nếu đang thêm mới
    if (!initialData) {
      setForm({ username: "", email: "", password: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-4 mb-6 w-full md:w-2/3"
    >
      <h2 className="text-lg font-semibold mb-4">
        {initialData ? "Update User" : "Add User"}
      </h2>

      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        required
        className="border rounded w-full p-2 mb-3"
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="border rounded w-full p-2 mb-3"
      />

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder={
          initialData
            ? "Enter new password (leave blank to keep current)"
            : "Password"
        }
        className="border rounded w-full p-2 mb-3"
        required={!initialData} // bắt buộc khi create, không bắt khi update
      />

      <div className="flex justify-end space-x-2">
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
