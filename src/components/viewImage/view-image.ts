import { Component, Vue } from "vue-property-decorator";
import Viewer from 'viewerjs';
@Component
export default class viewImage extends Vue {
    public imageList: Array<any> = [];
    public viewer: any;

    mounted() {
      this.$nextTick(() => {
        if (this.imageList.length > 0) {
          const node: any = document.getElementById('images');
          this.viewer = new Viewer(node, {
            title: () => '',
            hide() {
              node.parentNode.removeChild(node);
            }
          });
          const imgList: any = document.getElementsByClassName('img-list');
          imgList[0].click();
        } 
      });
    }
}
