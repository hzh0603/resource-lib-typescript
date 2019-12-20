import modalService from '../components/hModal/modal-service';
interface UploadOption {
    mode?: 'single' | 'multiple',
    type?: Array<string>;
}
export default class UploadService {
    /**
     * 通用文件选择
     * @param option {文件类型} 
     */
    static selectFile(option: UploadOption) {
        const { type, mode } = option;
        return new Promise((resolve) => {
            const inputNode = document.createElement('input');
            inputNode.setAttribute('type', 'file');
            if (mode && mode === 'multiple') {
                inputNode.setAttribute('multiple', 'multiple');
            }
            document.body.appendChild(inputNode);
            inputNode.click();
            inputNode.onchange = () => {
                // 如果是选择单个文件则进行类型效验
                if(mode === 'multiple') {
                    resolve(inputNode['files'])
                } else {
                    if (inputNode['files']) {
                        const file = inputNode['files'][0];
                        const fileName = file.name;
                        let reg = /(.*)$/i;
                        if (type) {
                            reg = new RegExp(`(${type.join('|')})$`, 'i');
                        }
                        if (reg.test(fileName)) {
                            resolve(file);
                        } else {
                            if (type) {
                                modalService.warn({
                                    content: `文件格式不正确，仅支持${type.join()}`
                                });
                            }
                        }
                        // 将节点在body上移除
                        document.body.removeChild(inputNode);
                    }
                }
            };
        });
    }
}