import { DirectiveOptions } from 'vue'
import ViewImageService from '@/components/viewImage/view-image-service'

export default class ViewImage implements DirectiveOptions {
    bind(el: HTMLElement, binding, vnode) {
        el.onclick = () => {
            if (binding.value) {
                if (typeof binding.value === 'string') {
                    ViewImageService.viewImage([binding.value])
                } else if (binding.value instanceof Array) {
                    ViewImageService.viewImage(binding.value);
                } else {
                    console.warn('v-viewImage指令参数为String|Array');
                }
            }
        }
    }
}