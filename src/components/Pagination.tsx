import React from 'react';

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentGroup: number;
  groupStart: number;
  groupEnd: number;
  firstGroupStart: number;
  lastGroupStart: number;
  pageNumbers: number[];
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  currentGroup,
  groupStart,
  groupEnd,
  firstGroupStart,
  lastGroupStart,
  pageNumbers,
  totalPages,
}) => {
  return (
    <div className="mt-8 flex items-center justify-center space-x-2">
      {currentGroup > 0 && (
        <>
          <button
            onClick={() => setPage(firstGroupStart)}
            className="rounded border bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
          >
            {'<<'}
          </button>
          <button
            onClick={() => setPage(groupStart - 1)}
            className="rounded border bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
          >
            {'<'}
          </button>
        </>
      )}

      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          disabled={page === p}
          className={`rounded border px-3 py-1 transition ${
            page === p ? 'bg-gray-400 text-white' : 'bg-white hover:bg-gray-200'
          }`}
        >
          {p}
        </button>
      ))}

      {groupEnd < totalPages && (
        <>
          <button
            onClick={() => setPage(groupEnd + 1)}
            className="rounded border bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
          >
            {'>'}
          </button>
          <button
            onClick={() => setPage(lastGroupStart)}
            className="rounded border bg-gray-200 px-3 py-1 transition hover:bg-gray-300"
          >
            {'>>'}
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
