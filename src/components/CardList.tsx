'use client';

import React from 'react';
import { Entry } from '@/types/entryType';
import { FaPlus, FaCheck, FaTrash } from 'react-icons/fa';

interface CardListProps {
  entries: Entry[];
  isLoading: boolean;
  status: 'scheduled' | 'ongoing' | 'completed';
  onPlusClick?: (entryId: string) => void;
  onCheckClick?: (entryId: string) => void;
  onDeleteClick?: (entryId: string) => void;
}

const CardList: React.FC<CardListProps> = ({
  entries,
  isLoading,
  status,
  onPlusClick,
  onCheckClick,
  onDeleteClick,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center text-lg">로딩중...</div>;
  }

  return (
    <ul className="grid grid-cols-3 gap-5">
      {entries.map((entry) => (
        <a
          key={entry.id}
          href={entry.detail_url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-[150px] overflow-hidden rounded shadow transition hover:scale-105"
          style={{
            backgroundImage: `url(${entry.image_url})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50 transition group-hover:opacity-40"></div>
          <p className="absolute right-[5px] top-[5px] rounded-xl bg-blue-500 px-2 py-1 text-[11px] font-bold text-white">
            {entry.views.toLocaleString()}
          </p>
          <div className="relative h-full p-4">
            <h2 className="mb-2 text-2xl font-semibold text-white">
              {entry.title}
            </h2>
            <p className="mb-1 text-white">{entry.date}</p>
            <div className="absolute bottom-0 ml-[-16px] flex w-full items-center justify-end px-3 py-1">
              {status === 'scheduled' && (
                <>
                <div
                  className="relative flex items-center justify-center rounded-full border p-[5px] text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:shadow-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onPlusClick) {
                      onPlusClick(entry.id);
                    }
                  }}
                >
                  <FaPlus size={10} />
                </div>
                <div
                    className="relative flex items-center justify-center rounded-full border p-[5px] text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:shadow-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onDeleteClick) {
                        onDeleteClick(entry.id);
                      }
                    }}
                  >
                    <FaTrash size={10} />
                  </div>
                </>
              )}
              {status === 'ongoing' && (
                <>
                  <div
                    className="relative mr-2 flex items-center justify-center rounded-full border p-[5px] text-white hover:border-transparent hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:shadow-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onCheckClick) {
                        onCheckClick(entry.id);
                      }
                    }}
                  >
                    <FaCheck size={10} />
                  </div>
                  <div
                    className="relative flex items-center justify-center rounded-full border p-[5px] text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:shadow-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (onDeleteClick) {
                        onDeleteClick(entry.id);
                      }
                    }}
                  >
                    <FaTrash size={10} />
                  </div>
                </>
              )}
              {/* 상태가 completed일 경우 삭제 아이콘 버튼만 렌더링 */}
              {status === 'completed' && (
                <div
                  className="relative flex items-center justify-center rounded-full border p-[5px] text-white hover:border-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:shadow-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onDeleteClick) {
                      onDeleteClick(entry.id);
                    }
                  }}
                >
                  <FaTrash size={10} />
                </div>
              )}
            </div>
          </div>
        </a>
      ))}
    </ul>
  );
};

export default CardList;
