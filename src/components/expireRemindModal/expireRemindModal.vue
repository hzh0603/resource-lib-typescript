<template>
	  <a-modal :title="'到期提醒'"
             :visible="showModal"
             :width="width"
             :destroyOnClose="true"
             @cancel="handleClose()"
             :footer="null">
        <template v-for="item in expireData">
            <div :key="item.reminderType" style="margin: 10px;">
                <!--小title-->
                <strong>{{item.reminderType | expirePipe}}:</strong>
                <template v-for=" (tag , index) in item.dataCount">
                    <!--选择数据-->
                    <a-checkable-tag :key="index" @change="handleChange(tag, index, item.reminderType)">
                        {{index|expireTitlePipe}}:
                        <!--数量大于0时给个红色样式-->
                        <span :style="{'color': tag > 0 ? 'red' : ''}">
                            {{`(${tag})`}}
                        </span>
                    </a-checkable-tag>
                </template>
            </div>
        </template>
    </a-modal>
</template>

<script lang="ts" src="./expireRemindModal.ts" />
<style lang="scss" src="./expireRemindModal.scss" />
