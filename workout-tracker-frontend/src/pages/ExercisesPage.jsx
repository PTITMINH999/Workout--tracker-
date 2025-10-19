import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseCard from "../components/exercises/ExerciseCard";
import ExerciseAddForm from "../components/exercises/ExerciseAddForm";
import ExerciseFilter from "../components/exercises/ExerciseFilter";
import SkeletonCard from "../components/exercises/SkeletonCard";
import instance from "../utils/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const ExercisesPage = () => {
  const { token, user } = useContext(AuthContext);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchExercises = useCallback(async () => {
    try {
      if (!token) return;
      setLoading(true);
      let url;

      if (debouncedSearch) {
        url = `/exercises/searchbyname?name=${encodeURIComponent(
          debouncedSearch
        )}&page=${page}&size=${pageSize}`;
      } else if (selectedCategory) {
        url = `/exercises/category/${selectedCategory}?page=${page}&size=${pageSize}`;
      } else {
        url = `/exercises?page=${page}&size=${pageSize}`;
      }

      const res = await instance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.result || res.data;
      const items = data.items || [];
      setExercises(items);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load exercises");
    } finally {
      setLoading(false);
    }
  }, [token, page, pageSize, selectedCategory, debouncedSearch]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await instance.get(`/exercises`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.result;
        const items = Array.isArray(data) ? data : data.items || [];
        const cats = [...new Set(items.map((e) => e.category))];
        setCategories(cats);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, [token]);

  const handleAdd = async (exercise) => {
    try {
      const res = await instance.post(`/exercises`, exercise, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.result) {
        setExercises((prev) => [res.data.result, ...prev]);
        toast.success("✅ Exercise added successfully!");
      }
    } catch (err) {
      toast.error("Failed to add exercise");
    }
  };

  const handleUpdate = (updated) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === updated.id ? updated : ex))
    );
    toast.success("✅ Exercise updated successfully!");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this exercise?")) return;
    try {
      await instance.delete(`/exercises/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
      toast.success("🗑️ Exercise deleted successfully!");
    } catch {
      toast.error("Failed to delete exercise");
    }
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setPage(0);
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    setPage(0);
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setPage((prev) => Math.min(prev + 1, totalPages - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:opacity-90 transition"
          >
            ⬅ Back to Dashboard
          </button>
          <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow-sm">
            🏋️ Exercises Management
          </h1>
        </div>

        {/* Filter + Search */}
        <ExerciseFilter
          categories={categories}
          onFilter={handleFilter}
          onSearch={handleSearch}
        />

        {/* Add Form (Admin only) */}
        {isAdmin && (
          <div className="mt-6">
            <ExerciseAddForm onAdd={handleAdd} />
          </div>
        )}

        {/* Exercise Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : exercises.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {exercises.map((ex) => (
              <ExerciseCard
                key={ex.id}
                exercise={ex}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-12 text-lg">
            😥 No exercises found.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="font-medium text-gray-700">
              Page {page + 1} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page + 1 >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExercisesPage;
