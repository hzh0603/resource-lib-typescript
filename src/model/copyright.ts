// 出版版权实体
export interface PublishingCopyright {
    id?: string;
    resourceName?: string;
    isbnNum?: string;
    authorPenName?: string;
    authorRealName?: string;
    contractType?: number;
    approvalState?: number;
    firstClassName?: string;
    secondClassName?: string;
    pressName?: string;
    [propName: string]: any;
}