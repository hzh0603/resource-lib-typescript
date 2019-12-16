import { Component, Vue, Prop } from "vue-property-decorator";
import crypto from "../../../util/crypto";
@Component
export default class modifyPasswordModal extends Vue {
    @Prop() public showModal: boolean;

    // 表单校验属性（确认密码dirty）
    public confirmDirty = false;
    // modal框宽度
    public width = 500;
    // modal框title
    public modalName = '修改密码';
    public form: any;
    // 布局
    public formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    }

    // 创建表单
    public beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    /**
    * 是否显示报红状态
    */
    public keyError(key, msg) {
        const { getFieldError, isFieldTouched, getFieldValue } = this.form;
        if (getFieldValue(key)) {
            return isFieldTouched(key) && getFieldError(key);
        } else {
            return isFieldTouched(key) && getFieldError(key) && msg;
        }
    }
    /**
     * 返回是否可通过验证
     */
    public hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    /**
     * 确认密码的自定义校验
     */
    public compareToFirstPassword(rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('两次密码不一致！');
        } else {
            callback();
        }
    }
    /**
     * 新密码的自定义校验
     */
    public validateToNextPassword(rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    /**
     * blur触发，确认密码校验
     */
    public handleConfirmBlur(e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
    }
    /**
     * 勾选确定后返回给父级数据
     */
    public handelOk() {
        const sendData = this.form.getFieldsValue();
        // 加密处理，删除确认密码
        sendData.newPassword = crypto.encrypt(sendData.newPassword);
        sendData.oldPassword = crypto.encrypt(sendData.oldPassword);
        this.$delete(sendData, 'confirm');
        this.$emit('ok', sendData);
    }
    /**
     * 取消按钮
     */
    public handelCancel() {
        this.$emit('cancel');
    }
}
