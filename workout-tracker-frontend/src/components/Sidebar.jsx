import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiBarChart2,
  FiActivity,
  FiUser,
  FiLogOut,
  FiFileText,
} from "react-icons/fi";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Exercises", path: "/exercises", icon: <FiActivity /> },
    { name: "Workouts", path: "/workouts", icon: <FiFileText /> },
    { name: "Progress", path: "/progress", icon: <FiBarChart2 /> },
    { name: "Stats", path: "/stats", icon: <FiBarChart2 /> },
  ];

  if (isAdmin) {
    menuItems.push({
      name: "User Management",
      path: "/users",
      icon: <FiUser />,
    });
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-all ${
        collapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg rounded-r-xl`}
    >
      {/* Header / User info */}
      <div className="mb-6 p-4">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h2 className="text-xl font-bold text-blue-700">Menu</h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-lg"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>
        {!collapsed && (
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user?.username}</p>
              <p className="text-xs text-gray-500">
                {isAdmin ? "Admin" : "User"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Menu */}
      <ul className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                  active
                    ? "bg-blue-200 text-blue-800 font-semibold"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-lg hover:bg-red-100 transition-colors duration-200 text-red-600 font-semibold"
        >
          <FiLogOut className="text-lg" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
