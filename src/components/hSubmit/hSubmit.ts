import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class hSubmit extends Vue {
    @Prop() public hasError: boolean;
    @Prop() public formLoading: boolean;
    @Prop() public submitName: string;
    @Prop() public cancelName: string;

    public submit() {
        this.$emit('submit');
    }

    public cancel() {
        this.$emit('cancel');
    }
}
