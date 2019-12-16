<template>
	    <ul class="breadcrumb">
        <li>当前位置：</li>
        <li class="breadcrumbs-item" v-for=" (breadcrumb, index) in breadcrumbList" :key="breadcrumb.label">
            <span v-if="breadcrumb.url" :class="{'active': index===breadcrumbList.length-1}" >{{ breadcrumb.label }}</span>
            <span v-else :class="{'active': index===breadcrumbList.length-1}" style="cursor: default">{{ breadcrumb.label }}</span>
            <span class="separator" v-if="index!==breadcrumbList.length-1">/</span>
        </li>
    </ul>
</template>

<script lang="ts" src="./hBreadcrumb.ts" />
<style lang="scss" src="./hBreadcrumb.scss" />
