export interface Result<T> {
     code?: string;
     msg?: string;
     data?: T;
     pageNum?: number;
     size?: number;
     totalCount?: number;
     totalPage?: number;
}