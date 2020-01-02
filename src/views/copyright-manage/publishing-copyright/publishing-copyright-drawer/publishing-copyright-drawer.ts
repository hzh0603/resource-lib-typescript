import { Component, Vue, Prop } from "vue-property-decorator";
import { getPublishingCopyrightDrawFormConfig } from '../../copyright-manage-form-config';
import hForm from '@/components/hForm/hForm';

@Component
export default class publishingCopyrightDrawer extends Vue {
    $refs: {
        form: hForm
    }
    @Prop() visible: boolean;
    @Prop() resourceData: object;

    // 页面类型
    public pageTitle = '查看出版版权';
    // 表单配置
    public formConfig = getPublishingCopyrightDrawFormConfig();

    /**
     * 关闭事件
     */
    public onClose() {
        this.$emit('close') 
    }

    public updated() {
              // 页面显示时赋值
              if (this.visible) {
                // 表单进行赋值
                this.$refs.form.setFieldsValue(this.resourceData);
                // 版权选择组件赋值
                const checkData = JSON.parse(localStorage.getItem('copyrightTypeList') as string);
            }
    }
}