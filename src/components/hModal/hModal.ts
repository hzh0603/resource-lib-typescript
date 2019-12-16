import { Component, Vue, Prop } from "vue-property-decorator";
import { MODALTYPE } from '../../enum/modalTypeEnum';

@Component
export default class hModal extends Vue {
    @Prop() public content: string;
    @Prop({default: '确认'}) public okText: string;
    @Prop({default: '取消'}) public cancelText: string;

    public modalType: MODALTYPE
}
