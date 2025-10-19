import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react"; // biểu tượng tạ hiện đại

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex">
      <Sidebar role={user.role} />

      {/* Nền gradient + căn giữa nội dung */}
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
        {/* Phần tiêu đề chính có hiệu ứng fade-in */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center items-center mb-4">
            <Dumbbell className="text-blue-600 w-10 h-10 mr-2" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Welcome to <span className="text-blue-600">Workout Tracker</span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg text-gray-600"
          >
            {user?.username
              ? `Glad to see you again, ${user.username}! 💪`
              : "Track your workouts, progress, and goals effortlessly."}
          </motion.p>
        </motion.div>

        {/* Hiệu ứng biểu tượng chuyển động nhẹ */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png"
            alt="Workout illustration"
            className="w-48 md:w-64 opacity-90"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
