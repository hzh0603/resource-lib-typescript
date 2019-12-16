<template>
	    <h-collapse :data="collapsedata" :defaultActiveKey="defaultActiveKey" :activeKey="activeKey" ref="AddFile">
        <div slot="slot1">
            <a-button v-if="!viewType" @click="visible = true">添加附件</a-button>
            <span style="margin-left: 10px;color: #999;max-width: 200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                  :title="'请上传'+uploadType+'文件'" v-if="uploadType">(请上传{{uploadType}}格式的文件)</span>
            <a-button v-if="showSelect" :disabled="!selectedRows.length>0" @click="addBrevity"><i class=" iconfont icon-sheft"></i>添加到暂存架</a-button>
            <a-modal :width="width" @cancel="modalCancel" title="添加附件" :maskClosable="mask" v-model="visible"
                     @ok="handleOk">
                <div style="display: flex;margin-bottom: 20px">
                    <p style="width: 20%;margin:0 10px 0 0">是否开放下载</p>
                    <a-radio-group style="width: 80%" name="radioGroup" v-model="isDown">
                        <a-radio value="0">是</a-radio>
                        <a-radio value="1">否</a-radio>
                    </a-radio-group>
                </div>
                <div style="display: flex;margin-bottom: 20px">
                    <p style="width: 20%;margin:0 10px 0 0">备注</p>
                    <div style="width: 80%">
                        <a-textarea
                                    placeholder="请输入" v-model="fileRemark" style="resize:none;width: 100%" :class="{'border-red': fileRemark.length>150}" :rows="4"/>
                        <div v-if="fileRemark.length>150" style="color: #f5222d;">备注格式不正确</div>
                    </div>

                </div>
                <div style="display: flex;margin-bottom: 20px">
                    <p style="width: 20%;;margin:0 10px 0 0">选择文件</p>
                    <div style="width: 80%">
                        <!--v-if="!fileList.length>0"-->
                        <a-button @click="addFile" v-if="!fileList.length>0">添加附件</a-button>
                        <ul class="ul-class" v-if="fileList.length>0">
                            <li v-for="item in fileList" :key="item.fileName">
                                <a-icon v-if="!item.filePath&&!item.errMsg" type="loading"/>
                                <span class="file-list"
                                      :style="{color: item.filePath?'#50b0e2':'#666'}">{{item.name}}</span><i
                                    v-if="item.filePath||item.errMsg" class="iconfont icon-cha delete-icon"
                                    @click="deleteUploadFile(item)"></i>
                                <div v-if="item.errMsg" :style="{color:item.errMsg?'#fe1a02':'',fontSize:'12px'}">
                                    {{item.errMsg}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <template slot="footer">
                    <a-button key="back" @click="modalCancel" :disabled="uploadDisable">取消</a-button>
                    <a-button key="submit" type="primary" @click="handleOk" :disabled="uploadDisable">
                        确定
                    </a-button>
                </template>
            </a-modal>
            <div :class="viewType?'':'file-box'">
                <h-table
                        :show-select="showSelect"
                        :columns="columns"
                        :loading="loading"
                        :data-set="fileTableData"
                        :pagination="pagination"
                        :export-info="exportInfo"
                        @queryConditionChange="queryConditionChange"
                        @selectRowChange="selectRowChange"
                >
                    <div slot="operationTemplate" slot-scope="{data}">
                        <i v-if="data.downloadLimit===0" class='icon iconfont icon-download'
                           @click="downloadFile(data)"></i>
                        <i class='icon iconfont icon-delete red-icon' v-if="!viewType" @click="deleteFile(data)"></i>
                    </div>
                    <div slot="fileTimeTemp" slot-scope="{data}">
                        {{data.insertTime| datePipe}}
                    </div>
                    <div slot="isDownTemp" slot-scope="{data}">
                        {{data.downloadLimit| booleanPipe}}
                    </div>
                </h-table>
            </div>
        </div>
    </h-collapse>
</template>

<script lang="ts" src="./hAddFile.ts" />
<style lang="scss" src="./hAddFile.scss" />
