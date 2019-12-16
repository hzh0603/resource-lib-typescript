import Vue from 'vue';
import { QueryCondition, ExportInfo } from '@/model/table';

export default class TableBasic extends Vue {
    public pagination = {
        current: 1,
        total: 0,
        pageSize: 10, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"], //每页中显示的数据
        showTotal: total => `共 ${total} 条`,  //分页中显示总的数据
    };

    public innerPagination = {
        current: 1,
        total: 0,
        pageSize: 5, //每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20"], //每页中显示的数据
        showTotal: total => `共 ${total} 条`,  //分页中显示总的数据
    };
    // 表格加载状态
    public loading: boolean = false;
    // 表格查询数据
    public dataSet: Array<any> = [];
    // 表格列配置
    public columns: Array<any> = [];
    // 表格查询条件
    public queryCondition: QueryCondition = {
        filterConditions: [],
        pageCondition: {
            pageNum: 1,
            pageSize: 10
        },
        sortCondition: {},
        bizCondition: {}
    };
    public selectedRows: Array<any> = [];
    public selectedRowKeys: Array<any> = [];
    public exportInfo: ExportInfo;

    /**
     * 查询表格数据
     */
    public searchList() {

    };
    public queryConditionChange(e) {
        if (Object.getOwnPropertyNames(e.bizCondition).length !== 0) {
            const bizCondition = {};
            e.bizCondition.map((item) => {
                if (item.value) {
                    if (item.value.length === 0) {
                        return
                    }
                    bizCondition[item.key] = item.value;
                }
            });
            this.queryCondition.bizCondition = bizCondition;
        }
        this.queryCondition.filterConditions = e.filterConditions;
        this.pagination.current = e.pageCondition.pageNum;
        this.pagination.pageSize = e.pageCondition.pageSize;
        this.queryCondition.sortCondition = e.sortCondition;
        this.queryCondition.pageCondition = e.pageCondition;
        this.searchList()
    }

    public selectRowChange(obj) {
        this.selectedRowKeys = obj.selectedRowKeys;
        this.selectedRows = obj.selectedRows
    }

    public innerChange(e) {
        this.innerPagination = e;
    }

    public setSelectedBlank() {
        this.selectedRows = [];
        this.selectedRowKeys = [];
    }

    /**
     * 导出
     * @param e 
     */
    public exportResource(e) {
        if (e === '0') {
            const req = {
                exportType: this.exportInfo.exportType,
                columnName: this.exportInfo.columnName,
                queryCondition: this.queryCondition
            };
            // this.$exportFile(this.exportInfo.exportAllUrl, req, `${this.exportInfo.exportName}${new Date().getTime()}.xlsx`)
        } else {
            const req = {
                exportType: this.exportInfo.exportType,
                columnName: this.exportInfo.columnName
            };
            req['ids'] = this.selectedRows.map(item => item.id);
            // this.$exportFile(this.exportInfo.exportSelectUrl, req, `${this.exportInfo.exportName}${new Date().getTime()}.xlsx`)
        }
    }
}