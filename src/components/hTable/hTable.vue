<template>
	<div class="h-table" :ref="tableIds">
        <div class="header-search" v-if="searchConfig && searchConfig.length>0">
            <template v-for="item in searchConfig">
                <div class="search-item" v-if="item.type === 'input'" :key="item.key">
                    <span class="search-span">{{item.label}}：</span>
                    <a-input :placeholder="item.placeholder" v-model="item.value" :allowClear="true"/>
                </div>
                <div class="search-item" v-if="item.type === 'select'" :key="item.key">
                    <span class="search-span">{{item.label}}：</span>
                    <a-select :placeholder="item.placeholder" style="width: 200px;white-space:nowrap;"
                              :allowClear="true"
                              :mode="item.selectType||'default'" :maxTagCount="1" :maxTagTextLength="3"
                              v-model="item.value" :options="item.selectInfo"
                    >
                        <a-select-option v-for="i in item.selectInfo" :key="i.value" :value="i.value">
                            {{i.label}}
                        </a-select-option>

                    </a-select>
                </div>
            </template>
            <div class="search-button">
                <a-button type="primary" @click="headerSearch()">查询</a-button>
                <a-button class="ant-btn-danger" @click="reset()">重置</a-button>
            </div>
        </div>
        <div class="header">
            <!--表格的头部信息，新增，批量删除等-->
            <div class="headerLeft">
                <slot name="headerLeft"></slot>
            </div>

            <div class="headerRight">
                <!--<slot name="headerRight"></slot>-->
                <div class="header-iconfont" v-if="exportInfo">
                    <a-dropdown :placement="'bottomCenter'">
                        <a-menu slot="overlay">
                            <a-menu-item @click="exportResource('0')" v-permission="exportInfo">导出全部</a-menu-item>
                            <a-menu-item :disabled="!selectedRows.length>0" @click="exportResource('1')" v-permission="exportInfo">导出选择
                            </a-menu-item>
                        </a-menu>
                        <i class="iconfont icon-export"></i>
                    </a-dropdown>
                </div>
            </div>
        </div>
        <a-table id="tableId"
                 :rowKey="(record)=>record.id||Math.random()*10000"
                 :pagination="pagination"
                 :scroll="showRowRender? {} :{x: scrollX,y: scrollY }"
                 :dataSource="dataSet"
                 :columns="columns"
                 :loading="loading"
                 :expandRowByClick=false
                 :rowSelection="rowSelection"
                 @expand="onExpand"
                 @change="onChange">
            <!-- 表格列渲染模板 -->
            <slot v-for="item in templateColumns" :slot="item.scopedSlots.customRender"
                  :name="item.scopedSlots.customRender" slot-scope="text,record" :data="record">
            </slot>
            <div slot-scope="text" v-for="(item, index) in toolColumns" :slot="'defaultTemp' + index"
                 :key="item.scopedSlots.customRender">
                <div :title="text"
                     :style="{overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap',width: item.width + 'px'}">
                    {{text}}
                </div>
            </div>
            <slot :slot="showRowRender ? 'expandedRowRender' : ''"
                  name="innerRowRender" slot-scope="text" :data="text">
            </slot>
            <div slot="expandIcon" style="width:100px">
                <a-icon type="right"/>
            </div>

            <!--处理表格过滤-->
            <div
                    slot="filterDropdown"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
            >
                <a-input
                        v-ant-ref="c => searchInput = c"
                        :placeholder="`请输入${column.title}`"
                        @pressEnter="() => handleSearch(selectedKeys, confirm)"
                        :value="selectedKeys"
                        @change="e => setSelectedKeys(e.target.value ? e.target.value : '')"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                >
                    <a-icon slot="suffix" v-if="selectedKeys.length>0" type="close-circle" style="color: rgba(0,0,0,.45)" @click="handleReset(clearFilters,selectedKeys)"/>
                </a-input>
            </div>

            <div
                    slot="filterDate"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
            >
                <a-range-picker class="filter-date" @change="e => selectChangeDate(setSelectedKeys,e,confirm)"/>
            </div>
            <div
                    slot="filterSelect"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
            >
                <a-select :allowClear="allowClear" style="width: 120px"

                          @change="e => selectChangeOption(setSelectedKeys,e,confirm)">
                    <a-select-option v-for="_item in column.filterSelectOption" :key="_item.value" :value="_item.value">
                        {{_item.label}}
                    </a-select-option>
                </a-select>
            </div>
            <a-icon
                    slot="filterIcon"
                    slot-scope="filtered"
                    type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"
            />
        </a-table>

    </div>
</template>

<script lang="ts" src="./hTable.ts" />
<style lang="scss" src="./hTable.scss" />
