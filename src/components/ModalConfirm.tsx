'use client';

import React from 'react';

// 모달에서 표시할 메시지와 액션 핸들러를 prop으로 전달받습니다.
interface ModalConfirmProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  message,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null; // 모달이 열리지 않은 경우 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
        {/* 전달받은 메시지를 제목으로 표시 */}
        <h2 className="mb-4 text-xl font-bold">{message}</h2>
        <div className="flex justify-end space-x-4">
          {/* 취소 버튼: onClose 호출 */}
          <button
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            취소
          </button>
          {/* 확인 버튼: onConfirm 호출 */}
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

export default ModalConfirm;
