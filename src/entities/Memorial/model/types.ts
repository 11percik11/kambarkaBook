export type Memorial = {
    id: number;
    title: string;
    place: string;
    name: string;
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



export type Free = {
    id: number;
    title: string;
    freeInfo: FreeInfo[];
    freeImages: FreeImages[];
}  

export type FreeImage = {
    id: number;
    title: string;
    image: string;
}  

export type FreeInfo = {
    id: number,
    title: string,
    description: string,
}

export type FreeImages = {
    id: number;
    image: string;
}

export type FreePagination = {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}

export type FreeResponseApi = {
    items: FreeImages[];
    pagination: FreePagination;
};