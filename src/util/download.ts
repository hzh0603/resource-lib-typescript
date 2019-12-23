import axios from 'axios';
import modalService from '@/components/hModal/modal-service';

export default class Download {
    /**
     * 通用文件下载
     * @param url 文件路径
     * @param fileName 文件名称
     */
    static downloadFile(url: string, fileName?: string) {
        const strArr = url.split(/\//g);
        fileName = fileName || strArr[strArr.length - 1];
        axios.get(`/rslstatic/${url}`, {
            responseType: 'blob'
        }).then((result: any) => {
            const blob = new Blob([result.data]);
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                const a = document.createElement('a');
                a.setAttribute('download', fileName as string);
                a.href = URL.createObjectURL(blob);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }, () => {
            modalService.warn({
                content: '文件下载失败'
            })
        })
    }
}