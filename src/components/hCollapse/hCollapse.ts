import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class hCollapse extends Vue {
    @Prop() private data: Array<any>;
    @Prop() private activeKey: Array<any>;
    @Prop() private defaultActiveKey: string;
}
