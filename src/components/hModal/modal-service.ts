import Vue from 'vue';
import hModal from './hModal.vue'
import { MODALTYPE } from '../../enum/modalTypeEnum';
const modalConstructor = Vue.extend(hModal);
interface ModalOptions {
    content?: string;
    duration?: number;
    onOk?: any;
    onCancel?: any;
}
const modal = (options: ModalOptions, type: MODALTYPE) => {
    const { onOk, onCancel, content, duration } = options;
    const instance: any = new modalConstructor({
        propsData: { content },
        data: {
            modalType: type
        },
        methods: {
            ok() {
                if (onOk) {
                    onOk();
                }
                this.$emit('close');
            },
            cancel() {
                if (onCancel) {
                    onCancel();
                }
                this.$emit('close');
            }
        }
    });
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    // 点击确定，取消 清除弹框
    instance.vm.$on('close', () => {
        document.body.removeChild(instance.vm.$el);
        instance.vm.$destroy();
    })
    if (duration) {
        setTimeout(() => {
            document.body.removeChild(instance.vm.$el);
            instance.vm.$destroy();
        }, duration);
    }
}

const confirm = (options: ModalOptions) => {
    modal(options, MODALTYPE.confirm)
};

const success = (options: ModalOptions) => {
    modal(options, MODALTYPE.success)
};

const error = (options: ModalOptions) => {
    modal(options, MODALTYPE.error)
};

const warn = (options: ModalOptions) => {
    modal(options, MODALTYPE.warn)
};

export default class modalService {
    static confirm(option: ModalOptions) {
        confirm(option)
    }

    static success(option: ModalOptions) {
        success(option)
    }

    static error(option: ModalOptions) {
        error(option)
    }

    static warn(option: ModalOptions) {
        warn(option)
    }
};
