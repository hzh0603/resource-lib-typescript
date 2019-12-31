import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class expireRemindModal extends Vue {
    @Prop() showModal: boolean;
    @Prop() expireData: Array<any>;
    
    public width = 570;

    public handleChange(e, queryType, type) {
        if(type || type === 0) {
            switch (type) {
                case 0:
                    // 原创到期
                    this.$router.push({
                        path: '/home/expire-remind/original',
                        query: {
                            queryType: this.turnType(queryType)
                        }
                    }).then();
                    break;
                case 1:
                    // 出版到期
                    this.$router.push({
                        path: '/home/expire-remind/publishing',
                        query: {
                            queryType: this.turnType(queryType)
                        }
                    });
                    break;
                case 2:
                    // 出库到期
                    this.$router.push({
                        path: '/home/expire-remind/outbound',
                        query: {
                            queryType: this.turnType(queryType)
                        }
                    });
                    break;
            }
        }
        this.$emit('close');
    }
    
      /**
             * 后台数据转数字（传入列表页面biz，可进行查询）
             */
            turnType(type) {
                switch (type) {
                    case 'outDateCount':
                        return '0';
                    case 'oneDateCount':
                        return '1';
                    case 'twoDateCount':
                        return '2';
                    case 'threeDateCount':
                        return '3';
                    case 'fourDateCount':
                        return '4';
                }
            }

            /**
             * 关闭modal框
             */
            handleClose() {
                this.$emit('close');
            }
}
