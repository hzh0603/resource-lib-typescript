<template>
	  <div class="user-login">
        <div class="login-center">
            <h2  v-viewImage="['https://kidsreading-test.oss-cn-hangzhou.aliyuncs.com/upload/resource/img/9fec6f021a7140e58e49bddaa4d7980f.jpg', 'https://kidsreading-test.oss-cn-hangzhou.aliyuncs.com/upload/resource/img/21129f2312e64fd1ad18ff7fac5bb56f.jpg']">欢迎登陆内容资源库后台管理系统</h2>
            <h-form :form-config="formConfig"
                    class="components-form-login"
                    :submit-name="'登录'"
                    @handle-submit="submit"
                    :has-submit="true"
                    :form-loading="loading"
                    ref="form">
                <div slot="remember" class="slot-class">
                    <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,},]">
                        记住密码
                    </a-checkbox>
                    <a class="login-form-forgot">
                        忘记密码？
                    </a>
                </div>
            </h-form>
        </div>

    </div>
</template>

<script lang="ts" src="./Login.ts" />
<style lang="scss" src="./Login.scss" />
