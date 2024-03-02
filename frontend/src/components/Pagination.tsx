import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className="flex flex-row justify-center my-4 gap-2">
      {[...Array(totalPages)].map((e, i) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          height="18"
          key={i}
        >
          <circle
            className={`${currentPage === (i + 1) ? 'fill-slate-800' : 'fill-slate-400'} hover:cursor-pointer hover:fill-slate-600`}
            cx="50" cy="50" r="50"
            onClick={() => onPageChange(i + 1)}
          />
        </svg>
      ))}
    </nav>
  );
};

export default Pagination;