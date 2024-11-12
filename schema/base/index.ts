export type BaseResponse<T> = {
    message: string;
    data?: T;
    error?: Record<string, string>;
  };
  
  export type PaginationMeta = {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
  
  export type PaginatedBaseResponse<T> = BaseResponse<T> & {
    meta: PaginationMeta;
  };
  