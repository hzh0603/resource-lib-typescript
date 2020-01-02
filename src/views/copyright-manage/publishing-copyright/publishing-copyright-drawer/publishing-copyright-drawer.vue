<template>
    <a-drawer width="55%"
              placement="right"
              :closable="true"
              @close="onClose"
              :visible="visible">
        <hTitle :pageTitle="pageTitle"></hTitle>
        <div class="form-unit">
            <!--表单-->
            <h-form class="form-drawer" :form-config="formConfig"
                    ref="form">
            </h-form>
            <!--noActive根据 显示审核意见按钮-->
        </div>
    </a-drawer>
</template>

<script lang="ts" src="./publishing-copyright-drawer.ts" />
<style lang="scss" src="./publishing-copyright-drawer.scss" scoped/>
