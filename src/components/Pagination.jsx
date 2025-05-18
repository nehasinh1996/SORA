import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="relative my-6">
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1 text-black font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
