import Vue from 'vue';
import viewImage from './view-image.vue'
const viewImageConstructor = Vue.extend(viewImage);
export default class ViewImageService {
    static viewImage(imageList) {
        const instance: any = new viewImageConstructor({
            data: {
                imageList: imageList
            },
        });
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
    }
}