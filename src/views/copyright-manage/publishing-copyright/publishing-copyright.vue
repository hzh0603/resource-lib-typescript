<template>
    <div class="table-demo">
        <h-table :show-select="true"
                 :columns="columns"
                 :data-set="dataSet"
                 :search-config="searchConfig"
                 :pagination="pagination"
                 :loading="loading"
                 :export-info="110208"
                 ref="table"
                 @queryConditionChange="queryConditionChange"
                 @export="exportResource"
                 @selectRowChange="selectRowChange">
            <!--头部新增，删除按钮模板-->
            <div slot="headerLeft">
                <a-button type="primary" @click="add()" v-permission="110201">
                    <i class="iconfont icon-add"></i>
                    新增
                </a-button>
                <a-button :disabled="!deleteAllow" @click="deleteBatch()" class="ant-delete" v-permission="110202">
                    <i class="iconfont icon-delete"></i>
                    删除
                </a-button>
                <a-button @click="downLoadTemp()"><i class="icon iconfont icon-download"></i> 下载模板</a-button>
                <a-button @click="importUnit()" v-permission="110203">
                    <i class="iconfont icon-export-template"></i>
                    导入版权信息
                </a-button>
                <a-button :disabled="selectedRows.length === 0" @click="addToShelf" v-permission="110204">
                    <i class="iconfont icon-sheft"></i>
                    添加到暂存架
                </a-button>
            </div>
            <!--表格右侧模板-->
            <div slot="operationTemplate" slot-scope="{data}">
                <i class="icon iconfont icon-look" @click="openDrawer(data.id)" v-permission="110201"></i>
                <i class="icon iconfont icon-edit" @click="edit(data)" :class="{'disabled-icon': data.approvalState === 1}" v-permission="110206" ></i>
                <i class="icon red-icon iconfont icon-delete" @click="deleteById(data.id)" :class="{'disabled-icon': data.approvalState === 1}" v-permission="110202"></i>
                <i class="icon iconfont icon-approval" @click="editOption(data.id)" :class="{'disabled-icon': data.approvalState === 1}" v-permission="110207"></i>
            </div>
            <span slot="isbnTemp" slot-scope="{data}" class="table-text-td navigate"
                  @click="openResourceDrawer(data)" style="width: 100px;display: block;">
                {{data.isbnNum}}
            </span>
            <span slot="contractTypeTemp" slot-scope="{data}">
                {{data.contractType | contractPipe}}
            </span>
            <span slot="approvalStateTemp" slot-scope="{data}">
                {{data.approvalState| reviewPipe}}
            </span>
        </h-table>
        <!-- 出版版权抽屉-->
        <publishing-copyright-drawer v-show="showDrawer" :visible="showDrawer"
                         :drawerType="drawerType"
                         :resourceData="watchData"
                         @close="closeDrawer"></publishing-copyright-drawer>
        <!--资源信息抽屉模板-->
        <!-- <resource-drawer @close="showResourceDrawer = false"
                         :visible="showResourceDrawer"
                         :resource-type="1"
                         :resource-detail-data="resourceData"
                         :form-config="drawerFormConfig"
                         ref="drawer"></resource-drawer> -->
    </div>
</template>

<script lang="ts" src="./publishing-copyright.ts" />
<style lang="scss" src="./publishing-copyright.scss" />
