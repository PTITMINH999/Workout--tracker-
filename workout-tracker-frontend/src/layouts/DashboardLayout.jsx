import React from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, onLogout, role }) => {
  return (
    <div className="flex">
      <Sidebar onLogout={onLogout} role={role} />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
};

export default DashboardLayout;
