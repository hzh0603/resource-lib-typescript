import Vue from 'vue'
const directives = require.context('../directives', true, /\.ts$/);
directives.keys().map(item => {
    // 过滤 index.ts
    if (item !== './index.ts') {
        const component = directives(item);
        Vue.directive(component.default.name, new component.default());
    }
});