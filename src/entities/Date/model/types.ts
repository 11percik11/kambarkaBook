export interface Date {
    id: number;
    date: string;
    description: string;
    video: string;
    type: string;
  }
  
  export interface Pagination {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  }
  
  export interface ApiResponse {
    items: Date[];
    pagination: Pagination;
  }