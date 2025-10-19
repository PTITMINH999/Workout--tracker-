import React from "react";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white border rounded shadow">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b text-left">ID</th>
          <th className="py-2 px-4 border-b text-left">Username</th>
          <th className="py-2 px-4 border-b text-left">Email</th>
          <th className="py-2 px-4 border-b text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center py-4">
              No users found
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => onEdit(user)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
