<template>
	<div class="form-box-footer">
        <a-button type="primary"
                  :disabled="hasError"
                  :loading="formLoading"
                  @click="submit">
            {{submitName|| '确定'}}
        </a-button>
        <a-button class="ant-btn-danger cancel-margin"
                  @click="cancel">
            {{cancelName|| '取消'}}
        </a-button>
    </div>
</template>

<script lang="ts" src="./hSubmit.ts" />
<style lang="scss" src="./hSubmit.scss" />
