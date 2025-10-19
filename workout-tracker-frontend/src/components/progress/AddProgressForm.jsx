import React, { useState } from "react";
import { toast } from "react-toastify";
import { progressApi } from "../../api/progressApi";

const AddProgressForm = ({ onAdded }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🕒 Tạo giá trị mặc định theo local time (múi giờ người dùng)
  const getLocalISOString = () => {
    const now = new Date();
    const localISOTime = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  };

  const [form, setForm] = useState({
    weight: "",
    bodyFat: "",
    notes: "",
    date: getLocalISOString(),
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🧭 Convert local time -> UTC ISO trước khi gửi
      const localDate = new Date(form.date);
      const utcDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      );

      const payload = {
        userId: user.id,
        date: utcDate.toISOString(),
        weight: parseFloat(form.weight),
        bodyFat: parseFloat(form.bodyFat),
        notes: form.notes,
      };

      await progressApi.add(payload);
      toast.success("Progress added successfully!");

      // Reset form về giờ hiện tại (local)
      setForm({
        weight: "",
        bodyFat: "",
        notes: "",
        date: getLocalISOString(),
      });

      onAdded?.();
    } catch (err) {
      console.error("Add progress failed:", err);
      toast.error("Failed to add progress");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-wrap items-end justify-between gap-4"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1 font-medium">Date</label>
        <input
          type="datetime-local"
          className="border border-gray-300 rounded-lg px-3 py-2 w-52 focus:ring-2 focus:ring-blue-500 outline-none"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1 font-medium">
          Weight (kg)
        </label>
        <input
          type="number"
          step="0.1"
          className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:ring-2 focus:ring-blue-500 outline-none"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1 font-medium">
          Body Fat (%)
        </label>
        <input
          type="number"
          step="0.1"
          className="border border-gray-300 rounded-lg px-3 py-2 w-28 focus:ring-2 focus:ring-blue-500 outline-none"
          value={form.bodyFat}
          onChange={(e) => setForm({ ...form, bodyFat: e.target.value })}
          required
        />
      </div>

      <div className="flex flex-col flex-grow min-w-[200px]">
        <label className="text-sm text-gray-700 mb-1 font-medium">Notes</label>
        <input
          type="text"
          placeholder="Optional..."
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-all disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default AddProgressForm;
