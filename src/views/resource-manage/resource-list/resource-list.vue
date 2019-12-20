<template>
	<div class="resource-box">
		 <h-table :show-select="true"
                 :columns="columns"
                 :data-set="data"
                 :pagination="pagination"
                 :loading="loading"
                 :search-config="searchConfig"
                 :export-info="100011"
                 ref="table"
                 @export="exportResource"
                 @queryConditionChange="queryConditionChange"
                 @selectRowChange="selectRowChange">
            <!--头部新增，删除按钮模板-->
            <div slot="headerLeft">
                <a-dropdown>
                    <a-button type="primary">
                        <i class="iconfont icon-add"></i>
                        新增
                    </a-button>
                    <a-menu slot="overlay">
                        <a-menu-item  v-permission="100001">
                            <span @click="add(0)">原创资源</span>
                        </a-menu-item>
                        <a-menu-item v-permission="100002">
                            <span @click="add(1)">出版资源</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
                <a-button :disabled="selectedRows.length===0"  @click="deleteResource()" v-permission="100003">
                    <i class="iconfont icon-delete"></i>
                    删除
                </a-button>
                <a-dropdown>
                    <a-button>
                        <i class="iconfont icon-download"></i>
                        下载导入模板
                    </a-button>
                    <a-menu slot="overlay">
                        <a-menu-item @click="downLoadTemp(0)" v-permission="100004">
                            <span>下载原创模板</span>
                        </a-menu-item>
                        <a-menu-item  @click="downLoadTemp(1)" v-permission="100005">
                            <span>下载出版模板</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
                <a-dropdown>
                    <a-button>
                        <i class="icon-export-template iconfont"></i>
                        导入资源信息
                    </a-button>
                    <a-menu slot="overlay">
                        <a-menu-item @click="importResource(0)" v-permission="100006">
                            <span>导入原创资源</span>
                        </a-menu-item>
                        <a-menu-item @click="importResource(1)" v-permission="100007">
                            <span>导入出版资源</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>
                <a-button :disabled="selectedRows.length === 0" @click="addBrevity()" v-permission="100008">
                    <i class="iconfont icon-zancunjia"></i>
                    添加到暂存架
                </a-button>
            </div>
            <!--头部过滤，导出按钮模板-->
            <!--显示模板-->
            <div slot="operationTemplate" slot-scope="{data}">
                <i class="icon iconfont icon-edit" @click="edit(data)" v-permission="100009" v-tip="'编辑'"></i>
                <i class="icon iconfont icon-delete red-icon" @click="deleteResourceL(data.id)"  v-permission="100003" v-tip="'删除'"></i>
                <!--<operate-bar :icon-type="['edit','delete']" @handleEdit="edit(data)" @handleDelete="deleteResourceL(data.id)"></operate-bar>-->
            </div>

            <div slot="chubanTemplate" slot-scope="{data}">
                {{data.publishDate| datePipe}}
            </div>
            <div slot="insertTimeTemplate" slot-scope="{data}">
                {{data.insertTime| datePipe}}
            </div>
            <div slot="bookNameTemplate" slot-scope="{data}">
                <div class="open-bookDetail" @click="openDrawer(data)" v-permission="100010">
                    {{data.resourceName}}
                </div>
            </div>
            <div slot="resourceTemp" slot-scope="{data}">
                <div>
                    {{data.resourceType| resourceTypePipe}}
                </div>
            </div>
        </h-table>
        <resource-drawer @close="visible = false"
                         :visible="visible"
                         :resource-type="resourceType"
                         :resource-detail-data="resourceData"
                         :form-config="drawerFormConfig"
                         ref="drawer"></resource-drawer>
	</div>
</template>

<script lang="ts" src="./resource-list.ts" />
<style lang="scss" src="./resource-list.scss" />
