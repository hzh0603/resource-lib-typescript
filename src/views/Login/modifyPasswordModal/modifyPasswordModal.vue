<template>
	 <a-modal :title="modalName"
             :visible="showModal"
             :width="width"
             @cancel="handelCancel"
             :destroyOnClose="true"
             :footer="null">
        <div class="role-form">
        <!--表单-->
        <a-form :form="form" @submit="handelOk">
            <a-form-item v-bind="formItemLayout" label="旧密码"
                         :validate-status="keyError('oldPassword','请输入旧密码！' ) ? 'error' : ''"
                         :help="keyError('oldPassword','请输入旧密码！' ) || ''">
                <a-input v-decorator="['oldPassword',
                    {validateTrigger: ['change','blur'],rules: [{required: true,message: '请输入旧密码',},
                    ,],},]" type="password"/>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="新密码"
                         :validate-status="keyError('newPassword','请输入新密码！' ) ? 'error' : ''"
                         :help="keyError('newPassword','请输入新密码！' ) || ''">
                <a-input v-decorator="['newPassword',
                    {validateTrigger: ['change','blur'],rules: [{required: true,message: '请输入新密码！',},
                    {validator: validateToNextPassword,},],},]" type="password"/>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="确认密码"
                         :validate-status="keyError('confirm','请输入确认密码！' ) ? 'error' : ''"
                         :help="keyError('confirm','请输入确认密码！' ) || ''">
                <a-input v-decorator="['confirm',{rules: [{required: true,message: '请输入确认密码！',},
                    {validateTrigger: ['change','blur'],validator: compareToFirstPassword,},],},]" type="password"
                         @blur="handleConfirmBlur"/>
            </a-form-item>
        </a-form>
            <!--确定按钮-->
        <hSubmit :hasError="this.hasErrors(form.getFieldsError())"
                 :submitName="'确认'"
                 :cancel-name="'取消'"
                 @submit="handelOk"
                 @cancel="handelCancel"></hSubmit>
    </div>
    </a-modal>
</template>

<script lang="ts" src="./modifyPasswordModal.ts" />
<style lang="scss" src="./modifyPasswordModal.scss" />
