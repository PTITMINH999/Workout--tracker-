import React, { useState, useContext } from "react";
import { Pencil, Trash2, Flame, Dumbbell, Activity } from "lucide-react";
import { toast } from "react-toastify";
import instance from "../../utils/axiosConfig";
import { AuthContext } from "../../context/AuthContext";

// Định nghĩa màu theo category
const categoryStyles = {
  HIIT: "bg-gradient-to-r from-orange-400 to-red-500 text-white",
  CARDIO: "bg-gradient-to-r from-pink-500 to-red-400 text-white",
  STRENGTH: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
  FLEXIBILITY: "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white",
  MOBILITY: "bg-gradient-to-r from-yellow-400 to-amber-500 text-white",
  ENDURANCE: "bg-gradient-to-r from-green-500 to-teal-500 text-white",
};

const categoryOptions = [
  "HIIT",
  "CARDIO",
  "STRENGTH",
  "Mobility",
  "Endurance",
  "FLEXIBILITY",
];

const ExerciseCard = ({ exercise, onDelete, onUpdate, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...exercise });
  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Gọi API PUT để lưu thay đổi
  const handleSave = async () => {
    try {
      const res = await instance.put(`/exercises/${exercise.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res.data.result;
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "❌ Failed to update exercise"
      );
    }
  };

  const category = exercise.category?.toUpperCase() || "DEFAULT";
  const colorStyle = categoryStyles[category] || categoryStyles.DEFAULT;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-5 border border-gray-100 relative overflow-hidden">
      {/* Chế độ chỉnh sửa */}
      {isEditing ? (
        <div className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Exercise name"
            className="w-full p-2 border rounded-md"
          />

          {/* Category combobox */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded-md"
          />
          <input
            name="caloriesBurned"
            value={form.caloriesBurned}
            onChange={handleChange}
            placeholder="Calories burned"
            type="number"
            className="w-full p-2 border rounded-md"
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-lg hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800">
              {exercise.name}
            </h3>
            {category === "CARDIO" || category === "HIIT" ? (
              <Flame className="text-red-500" />
            ) : (
              <Dumbbell className="text-blue-500" />
            )}
          </div>

          {/* Category badge */}
          <span
            className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${colorStyle} shadow-sm`}
          >
            {category}
          </span>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2">
            {exercise.description || "No description provided."}
          </p>

          {/* Info */}
          <div className="mt-3 text-sm text-gray-700 font-medium flex justify-between">
            <span>🔥 {exercise.caloriesBurned} kcal/session</span>
            <span className="flex items-center gap-1 text-gray-500">
              <Activity size={14} /> #{exercise.id}
            </span>
          </div>

          {/* Admin controls */}
          {isAdmin && (
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => onDelete(exercise.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExerciseCard;
