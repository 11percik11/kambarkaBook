export type Hero = {
    id: number;
    surname: string;
    name: string;
    patronymic: string;
    peopleImages: PeopleImages[];
    birthDate: string;
    birthPlace: string;
    invocationPlace: string;
    invocationDate: string;
    militaryRank: string;
    armyUnit: string;
    deathDate: string;
    burialPlace: string;
    description: string;
    awards: Award[];
    peopleMedia: PeopleMedia[];
  };

  export type PeopleImages = {
    id: number;
    image: string;
  }
  
  export type Award = {
    id: number;
    title: string;
    image: string;
  };
  
  export type PeopleMedia = {
    id: number;
    media: string;
    title: string;
  };

  export interface Person {
    id: number;
    surname: string;
    name: string;
    patronymic: string;
    image: string;
  }
  
  export interface Pagination {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  }
  
  export interface ApiResponse {
    items: Person[];
    pagination: Pagination;
  }