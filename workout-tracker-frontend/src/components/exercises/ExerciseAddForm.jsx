import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

const ExerciseAddForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    caloriesBurned: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    onAdd(form);
    setForm({ name: "", description: "", category: "", caloriesBurned: "" });
  };

  const categories = [
    "Cardio",
    "Strength",
    "HIIT",
    "Flexibility",
    "Mobility",
    "Endurance",
    "Other",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl border border-gray-100 p-5 space-y-3"
    >
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <PlusCircle className="text-green-500" /> Add New Exercise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Exercise name"
          className="p-2 border rounded-md"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 border rounded-md bg-white"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded-md"
      />

      <input
        type="number"
        name="caloriesBurned"
        value={form.caloriesBurned}
        onChange={handleChange}
        placeholder="Calories burned"
        className="w-full p-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        Add Exercise
      </button>
    </form>
  );
};

export default ExerciseAddForm;
