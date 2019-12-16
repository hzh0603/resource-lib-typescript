import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';
import _ from 'lodash'
@Component
export default class hForm extends Vue {
    @Prop() public formConfig: Array<any>;
    @Prop() public labelCol: number;
    @Prop({default: 10}) public wrapperCol: number;
    @Prop() public submitName: string;
    @Prop() public submitStyle: string;
    @Prop() public hasSubmit: boolean;
    @Prop() public noLabel: boolean;
    @Prop() public noCancel: boolean;
    @Prop() public formLoading: boolean;


    public form: any;
    public formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 4},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 10},
        },
    }
    public formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: {span: 24, offset: 0},
            sm: {span: 20, offset: 4},
        },
    }
    public moment = moment

    public beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    public mounted() {
        this.$nextTick(() => {
            this.form.validateFields();
        });
    }

    public keyError(key, msg) {
        const {getFieldError, isFieldTouched, getFieldValue} = this.form;
        if (getFieldValue(key)) {
            return isFieldTouched(key) && getFieldError(key);
        } else {
            return isFieldTouched(key) && getFieldError(key) && msg;
        }
    }

    public hasErrors(fieldsError) {
        this.$parent['hasError'] = Object.keys(fieldsError).some(field => fieldsError[field]);
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    public emailValidator(rule, value, callback) {
        if (value && value.length > 50 ) {
            callback('最大长度为50！');
        } else {
            callback();
        }
    }

    public handleSubmit(e) {
        e ? e.preventDefault() : '';
        this.form.validateFields((err, values) => {
            if (!err) {
                for (const i in values) {
                    if (values[i] && values[i]._isAMomentObject) {
                        const key = this.findKey(values, values[i]);
                        values[key + ''] = values[i]._d.getTime();
                    }
                }
                this.$emit('handle-submit', values);
            }
        });
    }

    public getData() {
        let data = {};
        this.form.validateFields((err, values) => {
            for (const i in values) {
                if (values[i] && values[i]._isAMomentObject) {
                    const key = this.findKey(values, values[i]);
                    values[key + ''] = values[i]._d.getTime();
                }
            }
            data = values;
        });
        return data
    }

    public handleCancel() {
        this.$emit('handle-cancel');
    }

    public findKey(obj, value, compare = (a, b) => a === b) {
        return Object.keys(obj).find(k => compare(obj[k], value))
    }

    public setFieldsValue(e) {
        const formConfig = this.formConfig.map(item => item.key);
        const filterData = _.pick(e, formConfig);
        this.formConfig.map((items) => {
                items.value = ''
        });
        // this.form.resetFields();
        for (const i in e) {
            this.formConfig.map((items) => {
                if (items.key === i) {
                    items.value = e[i]
                }
            })
        }
        this.form.setFieldsValue(filterData)
    }

    public resetFields() {
        this.form.resetFields();
    }
}
