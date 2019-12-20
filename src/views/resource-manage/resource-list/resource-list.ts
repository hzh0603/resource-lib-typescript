import { Component } from "vue-property-decorator";
import TableBasic from '@/components/hTable/tableBasic';
import resourceDrawer from './resource-drawer/resource-drawer.vue';
import { ColumnConfig } from '@/model/table';
import ResoureListTableConfig from '../resourceListTableConfig';
import { ExportInfo } from '../../../model/table';
import { resourceApiUrl } from '../api-config';
import { Result } from '../../../model/result';
import httpClient from "../../../http";
import modalService from '../../../components/hModal/modal-service';
import hTable from '@/components/hTable/hTable';
import { EXPORTTYPEENUM } from "../../../enum/exportTypeEnum";
import downloadService from "@/util/download"
import uploadService from '@/util/upload';
@Component({
    components: {
        resourceDrawer
    }
})
export default class resourceList extends TableBasic {

    $refs: {
        table: hTable
    }
    public columns: Array<ColumnConfig> = ResoureListTableConfig.getResourceListColumnConfig();
    public searchConfig = ResoureListTableConfig.getResourceListSearchConfig();
    public data = [];
    public visible = false;
    public resourceType = 1;
    public resourceData = {};
    public drawerFormConfig = [];
    public exportInfo: ExportInfo = {
        exportType: EXPORTTYPEENUM.resource,
        columnName: ["resourceName",
            "resourceType",
            "isbnNum",
            "bookNum",
            "authorPenName",
            "authorRealName",
            "channel",
            "firstClass",
            "secondClass",
            "chargeEditor",
            "pressName",
            "publishDate",
            "edition",
            "impression",
            "wordCount",
            "bookState",
            "price",
            "bookSeries",
            "intro",
            "remark"],
        exportAllUrl: resourceApiUrl.exportExcelAll,
        exportSelectUrl: resourceApiUrl.exportExcelById,
        exportName: '资源信息',
    }

    mounted() {
        this.searchList();
    }
    /**
     * 列表查询
     */
    public searchList() {
        this.loading = true;
        httpClient.post(resourceApiUrl.queryResourceList, this.queryCondition).then((result: Result<any>) => {
            if (result.code === '0') {
                this.data = result.data.data;
                this.pagination.total = result.data.totalCount;
            } else {
                modalService.error({ content: result.msg })
            }
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        })
    }

    /**
     * 前往新增页面
     * @param e 
     */
    add(e) {
        this.$router.push({
            path: 'resource-list/add',
            query: { type: e }
        })
    }

    /**
     * 批量删除资源
     */
    deleteResource() {
        const deleteList = this.selectedRows.map(item => item.id);
        modalService.confirm({
            onOk: () => {
                this.deleteResourceList(deleteList)
            }, content: '是否确定删除'
        })
    }

    deleteResourceL(e) {
        modalService.confirm({
            onOk: () => {
                this.deleteResourceList([e])
            }, content: '是否确定删除'
        })
    }

    deleteResourceList(ResourceList) {
        httpClient.post(resourceApiUrl.deleteResource, ResourceList).then((result: Result<any>) => {
            if (result.code === '0') {
                this.$refs.table.selectedRows = [];
                this.$refs.table.selectedRowKeys = [];
                this.selectedRows = [];
                this.searchList();
            } else {
                modalService.error({ content: result.msg });
            }
        })
    }

    /**
     * 下载导入模板
     * @param type 下载文件类型
     */
    public downLoadTemp(type: number) {
        let downloadUrl = '';
        if(type === 0) {
            downloadUrl = 'templates/OriginalResourceImportTemplate.xlsx'
        } else {
            downloadUrl = 'templates/PublishingResourceImportTemplate.xlsx'
        }
        downloadService.downloadFile(downloadUrl, `${new Date().getTime()}.xlsx`)
    }

    /**
     * 导入数据
     * @param type 导入模板类型
     */
    public importResource(type: number) {
        if(type === 0) {
            uploadService.selectFile({
                type: ['.jpg', '.png']
            }).then(console.log)
        } else {
            uploadService.selectFile({
                mode: 'multiple'
            }).then(console.log)
        }
    }
}
