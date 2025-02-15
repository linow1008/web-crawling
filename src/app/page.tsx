'use client';

import React, { useState } from 'react';
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { APIResponse, SortState } from '@/types/entryType';
import Pagination from '@/components/Pagination';
import Filter from '@/components/Filter';
import CardList from '@/components/CardList';
import Tabs, { TabType } from '@/components/Tab';
// 변경된 모달 컴포넌트를 임포트합니다.
import ModalConfirm from '@/components/ModalConfirm';

export default function Home() {
  // 페이지 번호 상태 관리
  const [page, setPage] = useState(1);
  // 날짜 필터 상태 관리 (default, asc, desc)
  const [dateFilter, setDateFilter] = useState<SortState>('default');
  // 조회수 필터 상태 관리 (default, asc, desc)
  const [viewsFilter, setViewsFilter] = useState<SortState>('default');
  // 탭 상태 관리 (예: scheduled, ongoing, completed)
  const [status, setStatus] = useState<TabType>('ongoing');
  // 모달 열림 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 선택된 엔트리의 id를 저장 (버튼 클릭 시 설정)
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  // 모달 액션 유형: 'plus', 'check', 'delete' 중 하나
  const [modalType, setModalType] = useState<
    'plus' | 'check' | 'delete' | null
  >(null);

  // TanStack QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient();

  // 날짜 필터 순환 함수: default -> desc -> asc -> default 순으로 변경 후 페이지 초기화
  const cycleDateFilter = () => {
    if (dateFilter === 'default') {
      setDateFilter('desc');
    } else if (dateFilter === 'desc') {
      setDateFilter('asc');
    } else {
      setDateFilter('default');
    }
    setPage(1);
  };

  // 조회수 필터 순환 함수: default -> desc -> asc -> default 순으로 변경 후 페이지 초기화
  const cycleViewsFilter = () => {
    if (viewsFilter === 'default') {
      setViewsFilter('desc');
    } else if (viewsFilter === 'desc') {
      setViewsFilter('asc');
    } else {
      setViewsFilter('default');
    }
    setPage(1);
  };

  // 엔트리 데이터를 불러오기 위한 API 호출 함수
  const fetchEntries = async (
    page: number,
    dateFilter: string,
    viewsFilter: string,
    status: string,
  ): Promise<APIResponse> => {
    const res = await fetch(
      `/api/entries?page=${page}&dateFilter=${dateFilter}&viewsFilter=${viewsFilter}&status=${status}`,
    );
    if (!res.ok) {
      throw new Error('네트워크 응답이 올바르지 않습니다.');
    }
    return res.json();
  };

  // react-query를 사용하여 데이터 로딩
  const { data, error, isLoading } = useQuery<
    APIResponse,
    Error,
    APIResponse,
    [string, number, string, string, string]
  >({
    queryKey: ['entries', page, dateFilter, viewsFilter, status],
    queryFn: () => fetchEntries(page, dateFilter, viewsFilter, status),
    placeholderData: keepPreviousData,
  });

  // 기존 상태 변경 API: plus(ongoing)와 check(completed)에서 사용합니다.
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch('/api/statusChange', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        throw new Error('상태 업데이트 실패');
      }
      return res.json();
    },
    onSuccess: () => {
      alert('상태 변경 성공');
      // 상태 변경 후 entries 데이터를 다시 가져옴
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
    onError: () => {
      alert('상태 변경 실패');
    },
  });

  // 삭제 API 호출을 위한 mutation: entry를 삭제합니다.
  const deleteEntryMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch('/api/entryDelete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error('삭제 실패');
      }
      return res.json();
    },
    onSuccess: () => {
      alert('삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
    onError: () => {
      alert('삭제 실패');
    },
  });

  // 데이터 로딩 오류 처리
  if (error instanceof Error)
    return (
      <div className="p-4 text-red-500">데이터 로딩 오류: {error.message}</div>
    );

  // 페이지네이션 관련 계산
  const totalPages = data?.totalPages || 0;
  const currentGroup = Math.floor((page - 1) / 10);
  const groupStart = currentGroup * 10 + 1;
  const groupEnd = Math.min(totalPages, groupStart + 9);
  const firstGroupStart = 1;
  const lastGroupStart = Math.floor((totalPages - 1) / 10) * 10 + 1;

  const pageNumbers = [];
  for (let i = groupStart; i <= groupEnd; i++) {
    pageNumbers.push(i);
  }

  // 탭 변경 핸들러: 탭 변경 시 페이지를 초기화합니다.
  const handleTabChange = (tab: TabType) => {
    console.log('현재 선택된 탭:', tab);
    setStatus(tab);
    setPage(1);
  };

  // 모달의 "확인" 버튼 클릭 시 실행될 함수
  const handleModalConfirm = () => {
    if (!selectedEntryId || !modalType) {
      alert('선택된 엔트리가 없습니다.');
      return;
    }
    if (modalType === 'plus') {
      // plus 버튼: 기존 API를 이용하여 status를 'ongoing'으로 변경
      updateStatusMutation.mutate({ id: selectedEntryId, status: 'ongoing' });
    } else if (modalType === 'check') {
      // check 버튼: 기존 API를 이용하여 status를 'completed'로 변경
      updateStatusMutation.mutate({ id: selectedEntryId, status: 'completed' });
    } else if (modalType === 'delete') {
      // delete 버튼: 새로운 삭제 API를 호출
      deleteEntryMutation.mutate(selectedEntryId);
    }
    // 액션 후 모달과 선택된 엔트리, modalType 초기화
    setIsModalOpen(false);
    setSelectedEntryId(null);
    setModalType(null);
  };

  // 모달 취소 시 실행될 함수 (모달 닫기)
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEntryId(null);
    setModalType(null);
  };

  // 모달에 표시할 메시지 결정 (modalType에 따라 다름)
  let modalMessage = '';
  if (modalType === 'plus') {
    modalMessage = '내용을 추가하시겠습니까?';
  } else if (modalType === 'check') {
    modalMessage = '상태를 완료로 변경하시겠습니까?';
  } else if (modalType === 'delete') {
    modalMessage = '해당 엔트리를 삭제하시겠습니까?';
  }

  return (
    <>
      <div className="mx-auto min-h-screen max-w-4xl border-x p-4">
        {/* 탭 컴포넌트 */}
        <Tabs activeTab={status} onTabChange={handleTabChange} />
        {/* 필터 컴포넌트 */}
        <Filter
          dateFilter={dateFilter}
          viewsFilter={viewsFilter}
          cycleDateFilter={cycleDateFilter}
          cycleViewsFilter={cycleViewsFilter}
        />
        <CardList
          entries={data?.data || []}
          isLoading={isLoading}
          status={status}
          // scheduled 상태일 때 플러스 버튼 클릭 시 처리
          onPlusClick={(entryId: string) => {
            setSelectedEntryId(entryId);
            setModalType('plus');
            setIsModalOpen(true);
          }}
          // ongoing 상태일 때 체크 버튼 클릭 시 처리
          onCheckClick={(entryId: string) => {
            setSelectedEntryId(entryId);
            setModalType('check');
            setIsModalOpen(true);
          }}
          // ongoing 및 completed 상태일 때 삭제 버튼 클릭 시 처리
          onDeleteClick={(entryId: string) => {
            setSelectedEntryId(entryId);
            setModalType('delete');
            setIsModalOpen(true);
          }}
        />
        {/* 페이지네이션 컴포넌트 */}
        <Pagination
          page={page}
          setPage={setPage}
          currentGroup={currentGroup}
          groupStart={groupStart}
          groupEnd={groupEnd}
          firstGroupStart={firstGroupStart}
          lastGroupStart={lastGroupStart}
          pageNumbers={pageNumbers}
          totalPages={totalPages}
        />
      </div>

      {/* 단일 모달 컴포넌트: 모달 메시지와 onConfirm, onClose 함수를 전달 */}
      <ModalConfirm
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
