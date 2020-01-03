import { Component, Vue } from "vue-property-decorator";

@Component
export default class hBreadcrumb extends Vue {
    get breadcrumbList() {
        const breadcrumbList: Array<any> = [];
        const matched: Array<any> = this.$route.matched;
        matched.forEach(item => {
            if (item.meta.breadcrumb) {
                breadcrumbList.push(item.meta.breadcrumb);
            }
        });
        return breadcrumbList;
    }
}