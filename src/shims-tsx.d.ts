import Vue, { VNode } from 'vue';
import CommonUtil from './util/common-util';
import VueRouter, {Route} from 'vue-router';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter, // 这表示this下有这个东西
    $route: Route,
  }
}