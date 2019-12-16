<template>
	  <z-index>
        <div class="common-modal">
            <div class="modal-image">
                <img src="../../assets/img/modal/error.png" alt="" v-if="modalType === 'error'">
                <img src="../../assets/img/modal/confirm.png" alt="" v-if="modalType === 'confirm'">
                <img src="../../assets/img/modal/success.png" alt="" v-if="modalType === 'success'">
                <img src="../../assets/img/modal/warn.png" alt="" v-if="modalType === 'warn'">
            </div>
            <div class="modal-content">
                {{content}}
            </div>
            <div class="modal-button">
                <a-button type="primary" @click="ok()">{{okText}}</a-button>
                <a-button v-if="modalType === 'confirm'" @click="cancel()">{{cancelText}}</a-button>
            </div>
        </div>
    </z-index>
</template>

<script lang="ts" src="./hModal.ts" />
<style lang="scss" src="./hModal.scss" />
