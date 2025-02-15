'use client';

import React from 'react';
import { SortState } from '@/types/entryType';

interface FilterProps {
  dateFilter: SortState;
  viewsFilter: SortState;
  cycleDateFilter: () => void;
  cycleViewsFilter: () => void;
}

const Filter: React.FC<FilterProps> = ({
  dateFilter,
  viewsFilter,
  cycleDateFilter,
  cycleViewsFilter,
}) => {
  return (
    <div className="mb-6 flex items-center justify-center space-x-6">
      {/* 날짜 필터 */}
      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium">날짜:</span>
        <button
          onClick={cycleDateFilter}
          className="flex items-center rounded border px-3 py-1 transition hover:bg-gray-100"
        >
          {dateFilter === 'default' ? (
            <span>기본</span>
          ) : dateFilter === 'asc' ? (
            <>
              <span>오름차순</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 5l5 5H5l5-5z" />
              </svg>
            </>
          ) : (
            <>
              <span>내림차순</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 15l-5-5h10l-5 5z" />
              </svg>
            </>
          )}
        </button>
      </div>

      {/* 조회수 필터 */}
      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium">조회수:</span>
        <button
          onClick={cycleViewsFilter}
          className="flex items-center rounded border px-3 py-1 transition hover:bg-gray-100"
        >
          {viewsFilter === 'default' ? (
            <span>기본</span>
          ) : viewsFilter === 'asc' ? (
            <>
              <span>오름차순</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 5l5 5H5l5-5z" />
              </svg>
            </>
          ) : (
            <>
              <span>내림차순</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 15l-5-5h10l-5 5z" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Filter;
