<template>
	<div class="form-box-header">
        <!-- 页面标题 -->
        <svg class="icon-color" aria-hidden="true" :style="{display: noIcon ? 'none': 'inline'}">
            <use xlink:href="#icon-library"></use>
        </svg>
        {{pageTitle}}
    </div>
</template>

<script lang="ts" src="./hTitle.ts" />
<style lang="scss" src="./hTitle.scss" />
