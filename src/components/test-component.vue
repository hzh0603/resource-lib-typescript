<template>
    <div>
        引用组件测试
        <p><span>消息：</span><span>{{msg}}</span></p>
        <p><span>组件自带文字：</span><span>{{text}}</span></p>
        <input type="text" v-model="watchVal">
        <Card></Card>
        <a-button type="primary">Primary</a-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import Card from './Card/Card.vue';
    @Component({
        components: {
            Card
        }
    })
    export default class TestComponent extends Vue {
        @Prop({default: ''}) private msg: string;


        /**
         * 生命周期
         *
         **/
        mounted() {
            console.log('mounted生命周期');
        }

        /**
         * computed
         */
        private get text(): string {
            return this.msg + ' computed 测试'
        }

        private watchVal: string = '';

        /**
         * Watch
         * @param newVal
         * @param oldVal
         */
        @Watch('watchVal')
        onchangeValue(newVal: string, oldVal: string) {
            console.log(newVal, oldVal)
        }


    }
</script>

<style scoped>

</style>
