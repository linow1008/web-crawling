export type Entry = {
  id: string;
  title: string;
  date: string;
  views: number;
  detail_url: string;
  image_url: string;
};

export type APIResponse = {
  data: Entry[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  dateFilter: string;
  viewsFilter: string;
};

export type SortState = 'default' | 'asc' | 'desc';
