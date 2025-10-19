import React, { useEffect, useState } from "react";
import { workoutApi } from "../../api/workoutApi";
import { toast } from "react-toastify";

const EditWorkoutModal = ({ workout, onClose, onUpdated }) => {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (workout) {
      // Không dùng toISOString — chỉ lấy định dạng local yyyy-MM-ddTHH:mm
      const formattedDate = workout.date
        ? new Date(workout.date)
            .toLocaleString("sv-SE")
            .replace(" ", "T")
            .slice(0, 16)
        : "";
      setDate(formattedDate);
      setNotes(workout.notes || "");
    }
  }, [workout]);

  const handleSave = async () => {
    try {
      const payload = {
        userId: workout.userId,
        // Gửi nguyên chuỗi local thay vì UTC để không lệch giờ và không gây lỗi input
        date: date,
        notes,
      };
      await workoutApi.update(workout.id, payload);
      toast.success("Workout updated successfully!");
      onUpdated?.();
      onClose();
    } catch (err) {
      toast.error("Failed to update workout");
      console.error(err);
    }
  };

  if (!workout) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold text-gray-700">✏️ Edit Workout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded-md"
          >
            ✖
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              className="w-full border rounded-lg px-3 py-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Notes</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi chú buổi tập..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Exercises
            </label>
            {workout.exercises && workout.exercises.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {workout.exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className="border rounded-lg px-3 py-2 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold">
                        {ex.name || ex.exerciseName}
                      </div>
                      <div className="text-sm text-gray-600">
                        Sets: {ex.sets} • Reps: {ex.reps}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">ID: {ex.id}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                Chưa có bài tập nào trong buổi này
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditWorkoutModal;
