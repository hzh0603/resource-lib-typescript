export interface ScopedSlots {
    customRender?: string;
    filterDropdown?: string;
    filterIcon?: string;
    [propName: string]: any;
}

export interface ColumnConfig {
    title: string;
    dataIndex: string;
    width: number;
    fixed?: string;
    scopedSlots?: ScopedSlots
    filterMultiple?: boolean;
    sorter?: boolean;
    [propName: string]: any;
}

export interface PageCondition {
    pageNum: number;
    pageSize: number;
}

export interface FilterCondition {
    // 过滤字段
    filterField: string;
    // 操作符
    operator: string; // like
    // 过滤值
    filterValue: any;
    // 初始值
    initialValue?: any;
    // 过滤类型 用于方便数据转换
    filterType?: string;
    // 用于时间段
    extra?: string;
}

export interface SortCondition {
    sortField?: string;
    sortRule?: string;
}

export interface QueryCondition {
    pageCondition: PageCondition;
    filterConditions: FilterCondition[];
    sortCondition: SortCondition;
    bizCondition: any;
}

export interface ExportInfo {
    exportType?: number;
    columnName?: Array<string>;
    exportAllUrl?: string;
    exportSelectUrl?: string;
    exportName?: string;
    exportPermission?: number;
}