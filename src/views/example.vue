<template>
    <div>
             <h-table :show-select="true"
                 :columns="columns"
                 :data-set="data"
                 :pagination="pagination"
                 :export-info="false"
                 :loading="loading"
                 :showSelect="true"
                 ref="table"
                 @queryConditionChange="queryConditionChange"
                 @selectRowChange="selectRowChange">
                    <!--头部新增，删除按钮模板-->
                    <div slot="headerLeft">
                        <a-button type="primary" >
                            <i class="iconfont icon-add"></i>
                            新建
                        </a-button>
                        <a-button :disabled="selectedRows.length===0">
                            <i class="iconfont icon-delete"></i>
                            删除
                        </a-button>
                    </div>
                      <!--表格右侧模板-->
                    <div slot="operationTemplate" slot-scope="{data}">
                        <i class="icon iconfont icon-privilege"   :class="{'disabled-icon': data.id === '1'}" @click="editPrivilege(data)"></i>
                        <i class="icon iconfont icon-edit"  :class="{'disabled-icon': data.id === '1'}" @click="editRole(data)"></i>
                        <i class="icon iconfont icon-delete red-icon" :class="{'disabled-icon': data.id === '1'}" @click="deleteRoleById(data.id)"></i>
                    </div>
        </h-table>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Example extends Vue {
        private name: string = '你好呀';
        private data: Array<any> = [{
            id: 1,
            roleName: '管理员',
            description: '这是一个管理员账号'
        }];
        private selectedRows: Array<any> = [];
        private loading = false;
        private pagination = {
                current: 1,
                total: 0,
                pageSize: 10, //每页中显示10条数据
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'], //每页中显示的数据
                showTotal: total => `共 ${total} 条`,  //分页中显示总的数据
            };
        private columns = [     {
                title: '角色名称',
                dataIndex: 'roleName',
                sorter: true,
                width: 300,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                },
            },
            {
                title: '描述',
                dataIndex: 'description',
                sorter: true,
                width: 500,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: 100,
                scopedSlots: {customRender: 'operationTemplate'},
            }];
        private changeName() {
            this.name = '名称改变了';
        };
        private queryConditionChange() {

        };
        private selectRowChange() {

        }
    }
</script>

<style scoped lang="scss">
    .button {
        margin-top: 20px;
    }
</style>
