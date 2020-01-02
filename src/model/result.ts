// http请求返回数据格式
export interface Result<T> {
     code?: string;
     msg?: string;
     data?: T;
     pageNum?: number;
     size?: number;
     totalCount?: number;
     totalPage?: number;
}

// 一般列表请求返回数据格式
export interface ListResult<T> {
     pageNum: number;
     totalPage: number;
     totalCount: number;
     size: number;
     data: Array<T>;
}