import React from "react";
import { Search } from "lucide-react";

const ExerciseFilter = ({ categories, onFilter, onSearch }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white shadow-sm rounded-xl border border-gray-100 p-4">
      {/* Search */}
      <div className="flex items-center w-full md:w-1/2">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search exercises..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Category Filter */}
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="border p-2 rounded-md w-full md:w-auto"
      >
        <option value="">All Categories</option>
        {categories.map((c, i) => (
          <option key={i} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExerciseFilter;
