import React, { useEffect, useState } from "react";
import { userApi } from "../api/userApi";
import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";
import SearchUser from "../components/users/SearchUser";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(20);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await userApi.getAll();
      setUsers(res.data.result || []);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to load user list!";
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editing) {
        await userApi.update(editing.id, data);
        toast.success("User updated successfully!");
      } else {
        await userApi.create(data);
        toast.success("User created successfully!");
      }
      fetchUsers();
      setEditing(null);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to save user!";
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await userApi.delete(id);
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (err) {
        console.error(err);
        const msg = err.response?.data?.message || "Failed to delete user!";
        toast.error(msg);
      }
    }
  };

  const handleSearch = async (id) => {
    if (!id) {
      fetchUsers();
      return;
    }
    try {
      const res = await userApi.getById(id);
      setUsers([res.data.result]);
      setPage(0);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "User not found!";
      toast.warning(msg);
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // --- Frontend pagination ---
  const totalPages = Math.ceil(users.length / pageSize);
  const startIndex = page * pageSize;
  const currentPageData = users.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-700">👥 User Management</h1>
        <button
          onClick={handleBackToDashboard}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all"
        >
          🏠 Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <SearchUser onSearch={handleSearch} />

        <UserForm
          onSubmit={handleCreateOrUpdate}
          initialData={editing}
          onCancel={() => setEditing(null)}
        />

        <UserTable
          users={currentPageData}
          onEdit={setEditing}
          onDelete={handleDelete}
        />

        {/* Pagination controls */}
        <div className="flex justify-center items-center mt-4 space-x-3">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page + 1} / {totalPages || 1}
          </span>

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* ✅ Toast container chuẩn hóa */}
      <ToastContainer
        position="top-right"
        autoClose={3000} // Tự động đóng sau 3 giây
        hideProgressBar={false} // Hiện thanh tiến trình
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default UserManagement;
