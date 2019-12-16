import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import * as uuidv4 from 'uuid/v4';
import commonUtil from "../../util/common-util";
import { ColumnConfig, QueryCondition } from '../../model/table';
@Component
export default class hTable extends Vue {
    @Prop({ default: false }) public showSelect: boolean;
    @Prop({ default: false }) public showRowRender: boolean;
    @Prop() public columns: Array<ColumnConfig>;
    @Prop() public dataSet: Array<any>;
    @Prop() public searchConfig: Array<any>;
    @Prop() public pagination: boolean | object;
    @Prop() public loading: Array<any>;
    @Prop() public exportInfo: boolean | number;
    @Prop({ default: 450 }) public scrollY: number;

    public selectedRowKeys = [];
    public selectedRows = [];
    public templateColumns: Array<ColumnConfig> = [];
    public toolColumns: Array<ColumnConfig> = [];
    public expandedRowKeys = [];
    public allowClear = true;
    public searchText = '';
    public searchParams = {
        pagination: {
            current: 1,
            pageSize: 10
        },
        filters: {},
        sorter: { order: '', field: '' }
    };
    public scrollX = 1000;
    public selectWidth = 0;
    public tableIds = uuidv4();
    // checkBox 勾选
    get rowSelection() {
        // 判断是否可选则
        if (this.showSelect) {
            return {
                selectedRowKeys: this.selectedRowKeys,
                onChange: this.onSelectChange
            }
        } else {
            return null;
        }
    }

    public mounted() {
        this.scrollX = this.columns.reduce((a, b) => {
            return b.width + a
        }, 0);
        this.$nextTick(() => {
            if (this.showSelect) {
                this.selectWidth = document.getElementsByClassName('ant-table-selection-column')[0]['offsetWidth'];
                this.scrollX = this.selectWidth + this.scrollX;
            }
            if (!this.showRowRender) {
                if (this.$refs[this.tableIds]['offsetWidth'] > this.scrollX) {
                    this.columns.map(item => {
                        if (item.fixed) {
                            delete item.fixed
                        }
                    })
                }
            }
        });

        this.templateColumns = this.columns.filter(item => item.scopedSlots && item.scopedSlots.customRender);
        this.toolColumns = this.columns.filter(item => {
            if (item.scopedSlots) {
                if (!item.scopedSlots.customRender) {
                    return true;
                }
            } else {
                return true
            }
        });
        this.toolColumns = this.toolColumns.map((item, index) => {
            if (item.scopedSlots) {
                item.scopedSlots['customRender'] = `defaultTemp${index}`;
            } else {
                item.scopedSlots = {
                    customRender: `defaultTemp${index}`,
                }
            }

            return item;
        });
    }

    @Watch('dataSet', { deep: true })
    onchangeValue(newVal: Array<any>) {
        if (newVal.length === 0) {
            this.scrollX = 0;
            this.columns.map(item => {
                if (item.dataIndex === 'operationTemplate') {
                    delete item.fixed
                }
            })
        } else {
            this.scrollX = this.selectWidth + this.columns.reduce((a, b) => {
                return b.width + a
            }, 0);
            if (this.$refs[this.tableIds]['offsetWidth'] < this.scrollX) {
                this.columns.map(item => {
                    if (item.dataIndex === 'operationTemplate') {
                        item.fixed = 'right'
                    }
                })
            }
        }
    }
    /**
     * 时间选择框变化后，设置值，并失去焦点
     * @param fn 
     * @param e 
     * @param callback 
     */
    public selectChangeDate(fn: any, e: any, callback: any): void {
        fn(e)
        callback()
    }

    public selectChangeOption(fn: any, e: any, callback: any): void {
        fn(e || e === 0 ? [e] : undefined);
        callback()
    }

    /**
     * 监听页数，过滤，排序相关变化
     * @param pagination 
     * @param filters 
     * @param sorter 
     */
    public onChange(pagination, filters, sorter) {
        this.searchParams.pagination = pagination;
        this.searchParams.filters = filters;
        this.searchParams.sorter = sorter;
        this.dealQueryCondition()
    }

    /**
     * 监听勾选变化
     * @param selectedRowKeys 
     * @param selectedRows 
     */
    public onSelectChange(selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
        this.$emit('selectRowChange', { selectedRows: this.selectedRows, selectedRowKeys: this.selectedRowKeys });
    }

    onExpand(expanded, record) {
        console.log(record);
        console.log(expanded);
    }

    public reset() {
        this.searchConfig.map(item => {
            switch (item.type) {
                case 'input':
                    if (item.value) {
                        item.value = ''
                    }
                    break;
                case 'select':
                    if (item.value || item.value === 0) {
                        item.value = undefined;
                    }
                    break;
                default:
                    break;
            }
        });
        this.selectedRowKeys = [];
        this.selectedRows = [];
        this.headerSearch();
    }

    /**
     * 手动查询
     */
    public headerSearch() {
        const objArr: Array<{ key, value }> = [];
        this.searchConfig.map(item => {
            const obj = {
                key: '',
                value: ''
            };
            obj.key = item.key;
            if (item.value && typeof item.value === 'string') {
                obj.value = item.value.replace(/\s/g, '');
            } else {
                obj.value = item.value
            }
            objArr.push(obj);
        });
        this.dealQueryCondition(objArr);
    }

    /**
     * 处理过滤条件
     * @param e 
     */
    dealQueryCondition(e?: any) {
        const queryCondition: QueryCondition = {
            filterConditions: [],
            pageCondition: {
                pageNum: e ? 1 : this.searchParams.pagination.current,
                pageSize: this.searchParams.pagination.pageSize
            },
            sortCondition: { sortField: '', sortRule: '' },
            bizCondition: e ? e : {}
        };
        if (this.searchParams.filters) {
            Object.keys(this.searchParams.filters).forEach(item => {
                if (this.searchParams.filters[item] && this.searchParams.filters[item].length > 0) {
                    if (this.searchParams.filters[item] instanceof Array && this.searchParams.filters[item].every(_item => _item._d && _item._d instanceof Date)) {
                        // 针对时间过滤
                        queryCondition.filterConditions.push({
                            filterField: item,
                            filterValue: new Date(commonUtil.dateFmt('yyyy-MM-dd 00:00:00', this.searchParams.filters[item][0]._d)).getTime(),
                            operator: 'gte',
                            extra: 'LT_AND_GT'
                        }, {
                            filterField: item,
                            filterValue: new Date(commonUtil.dateFmt('yyyy-MM-dd 23:59:59', this.searchParams.filters[item][1]._d)).getTime(),
                            operator: 'lte',
                            extra: 'LT_AND_GT'
                        })
                    } else if (this.searchParams.filters[item] && this.searchParams.filters[item] instanceof Array) {
                        queryCondition.filterConditions.push({
                            filterField: item,
                            filterValue: this.searchParams.filters[item][0],
                            operator: 'eq'
                        })
                    } else {
                        queryCondition.filterConditions.push({
                            filterField: item,
                            filterValue: this.searchParams.filters[item],
                            operator: 'contains'
                        })
                    }
                }
            })
        }
        // 处理排序字段
        if (this.searchParams.sorter && this.searchParams.sorter.field) {
            if (this.searchParams.sorter.order === 'descend') {
                queryCondition.sortCondition = {
                    sortRule: 'desc',
                    sortField: this.searchParams.sorter.field
                }
            } else {
                queryCondition.sortCondition = {
                    sortRule: 'asc',
                    sortField: this.searchParams.sorter.field
                }
            }
        } else {
            queryCondition.sortCondition = {}
        }
        this.$emit('queryConditionChange', queryCondition)
    }

    /**
     * 导出按钮
     * @param e 
     */
    exportResource(e) {
        this.$emit('export', e);
    }

    public handleSearch(selectedKeys, callback) {
        callback();
        this.searchText = selectedKeys[0];
    }

    public handleReset(clearFilters, selectedKeys) {
        clearFilters();
        selectedKeys = undefined;
        this.searchText = '';
    }
}
