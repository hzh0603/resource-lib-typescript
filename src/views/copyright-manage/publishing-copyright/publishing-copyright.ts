import { Component, Watch } from "vue-property-decorator";
import TableBasic from '../../../components/hTable/tableBasic';
import { ColumnConfig } from '@/model/table';
import { getPublishingCopyrightTableConfig } from '../copyright-manage-table-config';
import httpClient from '@/http'
import { publishingUrl } from '../copyright-manage-api';
import { Result, ListResult } from '../../../model/result';
import modalService from '@/components/hModal/modal-service';
import hTable from '@/components/hTable/hTable';
import downloadService from "@/util/download";
import uploadService from '@/util/upload';
import CommonUtil from '@/util/common-util';
import { PublishingCopyright } from '@/model/copyright';
import publishingCopyrightDrawer from './publishing-copyright-drawer/publishing-copyright-drawer.vue';
@Component({
    components: {
        publishingCopyrightDrawer
    }
})
export default class publishingCopyright extends TableBasic {
    public $refs: {
        table: hTable
    };
    // 列配置
    public columns: Array<ColumnConfig> = getPublishingCopyrightTableConfig().columnConfig;
    // 收索配置
    public searchConfig = getPublishingCopyrightTableConfig().searchConfig;
    // 是否显示抽屉
    public showDrawer: boolean = false;
    // 传入抽屉的类型（查看和审批）
    public drawerType: boolean = false;
    // 是否显示资源抽屉
    public showResourceDrawer: boolean = false;
    // 是否可以删除
    public deleteAllow: boolean = false;
    // 传入抽屉查看出版版权总数据
    public watchData = {};
    // 传入抽屉查看资源总数据
    public resourceData = {};

    public mounted() {
        this.searchList();
    }

    @Watch('selectedRows')
    onchangeValue(value) {
        if (value.length > 0) {
            this.deleteAllow = value.every(item => item.approvalState !== 1);
        } else {
            return this.deleteAllow = false
        }
    }

    /**
     * 出版版权列表数据查询
     */
    public searchList() {
        this.loading = true;
        httpClient.post(publishingUrl.queryPublishingCopyrightList, this.queryCondition).then((result: Result<ListResult<Array<PublishingCopyright>>>) => {
            this.loading = false;
            const {code, msg, data} = result;
            if (code === '0') {
                this.dataSet = data!.data;
                this.deleteAllow = false;
                this.pagination.total = data!.totalCount;
            } else {
                modalService.error({ content: msg })
            }
        }).catch(() => {
            this.loading = false
        })
    }

    /**
     * 新增
     */
    public add() {
        this.$router.push({
            path: 'publish-detail/add'
        });
    }

    /**
     * 关闭抽屉
     */
    public closeDrawer() {
        this.showDrawer = false;
    }
    /**
     * 打开查看出版版权信息抽屉
     * @param e 
     */
    public openDrawer(e) {
        this.queryPublishingCopyrightById(e, true)
    }

    /**
     * 查询出版信息，打开抽屉
     * @param e 
     * @param type 
     */
    public queryPublishingCopyrightById(e,type) {
        httpClient.get(`${publishingUrl.queryPublishingCopyrightById}/${e}`).then((result: Result<any>) => {
            if (result.code === '0') {
                const a = CommonUtil.findLabelByKey(1,result.data.firstClass, 1);
                const b = CommonUtil.findLabelByKey(1,result.data.secondClass, 2);
                result.data.class = result.data.firstClass ? a + ',' + b : '';
                // 传入抽屉的总数据
                this.watchData = result.data;
                // 打开抽屉
                this.showDrawer = true;
                // 抽屉类型（true为查看，false为审核页面）
                this.drawerType = type;
            } else {
                modalService.error({content: result.msg})
            }
        })
    }
    /**
     * 批量删除
     */
    public deleteBatch() {
        const deleteList = this.selectedRows.map(item => item.id);
        modalService.confirm({
            onOk: () => {
                this.deleteByList(deleteList)
            }, content: '是否确定删除'
        })
    }

    /**
     * 删除
     * @param list [ids]
     */
    deleteByList(list) {
        httpClient.post(publishingUrl.batchDeletePublishingCopyright, list).then((result: Result<any>) => {
            if (result.code === '0') {
                this.$refs.table.selectedRows = [];
                this.$refs.table.selectedRowKeys = [];
                this.selectedRows = [];
                this.searchList()
            } else {
                modalService.error({ content: result.msg });
            }
        })
    }

    /**
     * 单个删除
     * @param e 
     */
    deleteById(e) {
        modalService.confirm({
            onOk: () => {
                httpClient.delete(publishingUrl.deletePublishingCopyright + `/${e}`).then((result: Result<any>) => {
                    if (result.code === '0') {
                        this.$refs.table.selectedRows = [];
                        this.$refs.table.selectedRowKeys = [];
                        this.selectedRows = [];
                        this.searchList()
                    } else {
                        modalService.error({ content: result.msg });
                    }
                })
            }, content: '是否确定删除'
        })
    }

    /**
     * 添加到暂存架
     */
    addToShelf() {
        const selectedList = this.selectedRows.map(item => item.id);
        httpClient.post(publishingUrl.addCopyrightTsf, selectedList).then((result: Result<any>) => {
            if (result.code === '0') {
                this.$refs.table.selectedRows = [];
                this.$refs.table.selectedRowKeys = [];
                this.selectedRows= [];
                modalService.success({content: '添加成功'});
            } else {
                modalService.error({content: result.msg});
            }
        })
    }

    /**
     * 下载模板
     */
    downLoadTemp() {
        downloadService.downloadFile('templates/PublishingCopyrightImportTemplate.xlsx');
    }

    /**
     * 导入模板信息
     */
    importUnit() {
        uploadService.selectFile({
            type: ['.xlsx']
        }).then(console.log)
    }
}
