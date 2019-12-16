import commonUtil from "../../util/common-util";
import { ColumnConfig } from '@/model/table';
export const originalClassList = JSON.parse(localStorage.getItem('originalClassList') + '');
export const publishingClassList = JSON.parse(localStorage.getItem('publishingClassList') + '');
let secondClassList = [];
const originalFirstClassList = commonUtil.deepClone(originalClassList).map(item => {
    secondClassList = secondClassList.concat(item.children);
    delete item.children;
    return item
});
const publishingFirstClassList = commonUtil.deepClone(publishingClassList).map(item => {
    secondClassList = secondClassList.concat(item.children);
    delete item.children;
    return item
});
export default class ResoureListTableConfig {
    static getResourceListColumnConfig(): Array<ColumnConfig> {
        return [{
            title: '书名',
            dataIndex: 'resourceName',
            sorter: true,
            width: 200,
            filterMultiple: false,
            scopedSlots: {
                customRender: 'bookNameTemplate', filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
            },

            // sorter: (a, b) => a.address.length - b.address.length,
        }, {
            title: '类型',
            dataIndex: 'resourceType',
            sorter: true,
            width: 100,
            scopedSlots: {
                customRender: 'resourceTemp', filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon',
            },
            filterSelectOption: [
                {value: 0, label: '原创'},
                {value: 1, label: '出版'},
            ]
        }, {
            title: 'ISBN',
            dataIndex: 'isbnNum',
            width: 150,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '书号',
            dataIndex: 'bookNum',
            width: 200,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '作者笔名',
            dataIndex: 'authorPenName',
            width: 100,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '一级分类',
            dataIndex: 'firstClass',
            width: 150,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon'
            },
            filterSelectOption: originalFirstClassList.concat(publishingFirstClassList)
        }, {
            title: '二级分类',
            dataIndex: 'secondClass',
            width: 150,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon'
            },
            filterSelectOption: secondClassList
        }, {
            title: '出版社',
            dataIndex: 'pressName',
            width: 100,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '出版年月',
            dataIndex: 'publishDate',
            width: 150,
            sorter: true,
            scopedSlots: {
                customRender: 'chubanTemplate', filterDropdown: 'filterDate',
                filterIcon: 'filterIcon'
            },

        }, {
            title: '创建日期',
            dataIndex: 'insertTime',
            scopedSlots: {
                customRender: 'insertTimeTemplate',
                filterDropdown: 'filterDate',
                filterIcon: 'filterIcon'
            },
            width: 150,
            sorter: true
        }, {
            title: '操作',
            dataIndex: 'operationTemplate',
            width: 100,
            fixed: 'right',
            scopedSlots: {customRender: 'operationTemplate'},
        }]
    }

    static getResourceListSearchConfig() {
        return [
            {
                label: '书名查询',
                key: 'resourceName',
                placeholder: '请输入书名',
                type: 'input'
            }, {
                label: 'ISBN查询',
                key: 'isbnNum',
                placeholder: '请输入ISBN',
                type: 'input'
            }, {
                label: '书号查询',
                key: 'bookNum',
                placeholder: '请输入书号',
                type: 'input'
            }
        ]
    }
}