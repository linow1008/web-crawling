'use client';

import React from 'react';

interface ModalPlusOnGoingProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalPlusOnGoing: React.FC<ModalPlusOnGoingProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">내용을 추가하시겠습니까?</h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPlusOnGoing;
