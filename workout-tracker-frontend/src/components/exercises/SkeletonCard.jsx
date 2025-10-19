import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

export default SkeletonCard;
