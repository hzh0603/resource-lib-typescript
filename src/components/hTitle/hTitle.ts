import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class hTitle extends Vue {
    @Prop() public pageTitle: string;
    @Prop() public noIcon: boolean;
}
