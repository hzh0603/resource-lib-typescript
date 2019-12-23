<template>
    <div id="app">
        <a-locale-provider :locale="zh_CN">
            <router-view/>
        </a-locale-provider>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import { eventBusService, EventBus } from './util/event-bus';
    @Component
    export default class App extends Vue {
        private zh_CN = zh_CN;

        mounted() {
            // 测试 eventBus
            eventBusService.$on(EventBus.TEST, console.log)
        }
    }
</script>

<style lang="scss">
    #app {
        height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
    }
</style>
