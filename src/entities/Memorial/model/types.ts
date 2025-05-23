export type Memorial = {
    id: number;
    title: string;
    place: string;
    setupDate: string;
    updateDate: string; 
    description: string;
    history: string;
    memorialImages: MemorialImage[];
};

export type MemorialImage = {
    id: number;
    title: string;
    image: string;
};

export type MemorialPagination = {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
};

export type MemorialResponseApi = {
    items: MemorialImage[];
    pagination: MemorialPagination;
};

  export type MemorialImages = {
    id: number;
    image: string;
  }