import { DirectiveOptions } from 'vue'
import localUtil from '../util/local-util'
export default class Permission implements DirectiveOptions {
    bind(el, binding, vnode) {
        const roleList = localUtil.getOperationsConfig();
        const roleVal = binding.value;
        if (!roleList.includes(roleVal)) {
            if (el.nodeName === 'BUTTON') {
                el.className = `${el.className} permission-disabled`;
            } else if (el.nodeName === 'I') {
                el.className = `${el.className} icon-disabled`;
                el.title = `无权限`;
            } else if (el.nodeName === 'DIV' || el.nodeName === 'SPAN') {
                el.className = `${el.className} div-disabled`;
            } else {
                el.className = `${el.className} permission-disabled`;
            }
        }
    }
}