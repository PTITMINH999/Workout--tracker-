import React, { useState } from "react";

const SearchUser = ({ onSearch }) => {
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(id.trim());
    setId("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-6">
      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter User ID..."
        className="border rounded-l px-3 py-2 w-60"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Search
      </button>
    </form>
  );
};

export default SearchUser;
