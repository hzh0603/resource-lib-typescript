import commonUtil from "@/util/common-util";
import { ColumnConfig } from '@/model/table';
//授权单位表格配置
const checkData = JSON.parse(localStorage.getItem('copyrightTypeList') as string);
const originalClassList = JSON.parse(localStorage.getItem('originalClassList') as string);
const publishingClassList = JSON.parse(localStorage.getItem('publishingClassList') as string);
const originalFirstClassList = commonUtil.deepClone(originalClassList).map(item => {
    delete item.children;
    return item
});
const publishingFirstClassList = commonUtil.deepClone(publishingClassList).map(item => {
    delete item.children;
    return item
});

const getAuthorizedUnitTableConfig = () => {
    return {
        columnConfig: [{
            title: '单位名称',
            dataIndex: 'orgName',
            sorter: true,
            width: 200,
            scopedSlots: {
                customRender: 'unitTemp',
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '联系人',
            dataIndex: 'contactName',
            sorter: true,
            width: 200,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '联系电话',
            dataIndex: 'contactPhone',
            sorter: true,
            width: 200,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '单位地址',
            dataIndex: 'orgSite',
            sorter: true,
            width: 350,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '备注',
            dataIndex: 'remark',
            sorter: true,
            width: 400,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '操作',
            dataIndex: 'operationTemplate',
            width: 100,
            fixed: 'right',
            scopedSlots: { customRender: 'operationTemplate' },
        }],
        // searchCon
    }
};

const getAppearStoreTableConfig = () => {
    return {
        columnConfig: [{
            title: '单号',
            dataIndex: 'orderNumber',
            sorter: true,
            width: 200,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'orderNumTemplate'
            }
        }, {
            title: '标题',
            dataIndex: 'title',
            width: 100,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
            }
        }, {
            title: '授权单位',
            dataIndex: 'orgName',
            sorter: true,
            width: 200,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '授权开始日期',
            sorter: true,
            dataIndex: 'conferStartDate',
            scopedSlots: {
                filterDropdown: 'filterDate',
                filterIcon: 'filterIcon'
            },
            width: 200
        }, {
            title: '授权结束日期',
            sorter: true,
            dataIndex: 'conferEndDate',
            scopedSlots: {
                filterDropdown: 'filterDate',
                filterIcon: 'filterIcon'
            },
            width: 200
        }, {
            title: '授权类型',
            dataIndex: 'copyrightType',
            width: 100,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon', customRender: 'copyrightTypeTemplate'
            },
            filterSelectOption: checkData,
        }, {
            title: '审核状态',
            dataIndex: 'approvalState',
            sorter: true,
            width: 100,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon', customRender: 'approvalStateTemplate'
            },
            filterSelectOption: [
                { value: 0, label: '待审核', },
                { value: 1, label: '审核通过', },
                { value: 2, label: '审核未通过', }],
        }, {
            title: '创建人',
            dataIndex: 'insertUser',
            width: 150,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '创建时间',
            dataIndex: 'insertTime',
            width: 200,
            scopedSlots: {
                filterDropdown: 'filterDate',
                filterIcon: 'filterIcon', customRender: 'insertTimeTemplate'
            },
        }, {
            title: '操作',
            dataIndex: 'operationTemplate',
            width: 100,
            fixed: 'right',
            scopedSlots: { customRender: 'operationTemplate' },
        }]
    }
};
const getOriginalCopyrightTableConfig = () => {
    let secondClassList = [];
    const originalFirstClassList = commonUtil.deepClone(originalClassList).map(item => {
        secondClassList = secondClassList.concat(item.children);
        delete item.children;
        return item
    });
    return {
        columnConfig: [{
            title: '书名',
            dataIndex: 'resourceName',
            sorter: true,
            width: 200,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '书号',
            dataIndex: 'bookNum',
            sorter: true,
            scopedSlots: {
                customRender: 'bookNum', filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            width: 100,
        },
        {
            title: '备用名',
            dataIndex: 'spareName',
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            width: 100,
        },
        {
            title: '开放状态',
            dataIndex: 'productionState',
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                customRender: 'productionState',
                filterIcon: 'filterIcon'
            },
            filterSelectOption: [
                { value: '1', label: '是' },
                { value: '0', label: '否' }
            ],
            width: 100,
        },
        {
            title: '作者笔名', width: 200,
            sorter: true,
            dataIndex: 'authorPenName',
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '一级分类', width: 120,
            dataIndex: 'firstClassName',
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon'
            },
            filterSelectOption: originalFirstClassList
        }, {
            title: '二级分类', width: 120,
            dataIndex: 'secondClassName',
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon'
            },
            filterSelectOption: secondClassList
        }, {
            title: '签约类型', width: 120, sorter: true,
            dataIndex: 'contractType',
            scopedSlots: {
                customRender: 'contractTypeTemp', filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon',
            },
            filterSelectOption: [
                { value: 0, label: '买断', },
                { value: 1, label: '保底分成', },
                { value: 2, label: '纯分成', }],
        }, {
            title: '审核状态', width: 120, sorter: true,
            scopedSlots: { customRender: 'approvalStateTemp' },
            dataIndex: 'approvalState',
        }, {
            title: '引入时间', width: 170, sorter: true,
            dataIndex: 'introduceDate',
            scopedSlots: {
                filterDropdown: 'filterDate',
                filterIcon: 'filterIcon'
            }
        }, {
            title: '操作',
            dataIndex: 'operationTemplate',
            width: 120,
            fixed: 'right',
            scopedSlots: { customRender: 'operationTemplate' },
        }],
        searchConfig: [
            {
                label: '书名查询',
                key: 'resourceNames',
                placeholder: '请输入书名',
                type: 'input'
            },
            {
                label: '书号查询',
                key: 'bookNums',
                placeholder: '请输入书号',
                type: 'input'
            }, {
                label: '作者笔名',
                key: 'authorPenNames',
                placeholder: '请输入作者笔名',
                type: 'input'
            },
            {
                label: '版权类型',
                key: 'copyrightType',
                placeholder: '请选择版权类型',
                selectType: 'multiple',
                type: 'select',
                selectInfo: checkData
            }, {
                label: '是否授权',
                key: 'isConfer',
                placeholder: '请选择授权',
                type: 'select',
                // selectInfo: globalMsg.options
            }, {
                label: '授权性质',
                key: 'isExclusive',
                placeholder: '请选择授权性质',
                type: 'select',
                // selectInfo: globalMsg.exclusive
            }
        ]
    }
};
const getPublishingCopyrightTableConfig = () => {
    let publishSecondClassList = [];
    const publishFirstClassList = commonUtil.deepClone(publishingClassList).map(item => {
        publishSecondClassList = publishSecondClassList.concat(item.children);
        delete item.children;
        return item
    });
    return {
        columnConfig: [{
            title: '书名',
            dataIndex: 'resourceName',
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            width: 200,
        }, {
            title: 'ISBN',
            dataIndex: 'isbnNum',
            sorter: true,
            scopedSlots: {
                customRender: 'isbnTemp', filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            width: 100,
        },
        {
            title: '作者实名', width: 100,
            dataIndex: 'authorRealName', sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        },
        {
            title: '作者笔名', width: 100, sorter: true,
            dataIndex: 'authorPenName',
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '签约类型', width: 120, sorter: true,
            scopedSlots: {
                customRender: 'contractTypeTemp', filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon',
            },
            filterSelectOption: [
                { value: 0, label: '买断', },
                { value: 1, label: '保底分成', },
                { value: 2, label: '纯分成', }],
            dataIndex: 'contractType',
        }, {
            title: '审核状态', width: 120, sorter: true,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon', customRender: 'approvalStateTemp'
            },
            filterSelectOption: [
                { value: 0, label: '待审核', },
                { value: 1, label: '审核通过', },
                { value: 2, label: '审核未通过', }],
            dataIndex: 'approvalState',
        }, {
            title: '一级分类', width: 120,
            dataIndex: 'firstClassName',
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon'
            },
            filterSelectOption: publishFirstClassList
        }, {
            title: '二级分类', width: 120,
            dataIndex: 'secondClassName',
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon'
            },
            filterSelectOption: publishSecondClassList
        }, {
            title: '出版社', width: 170, sorter: true,
            dataIndex: 'pressName',
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '操作',
            dataIndex: 'operationTemplate',
            width: 120,
            fixed: 'right',
            scopedSlots: { customRender: 'operationTemplate' },
        }],
        searchConfig: [
            {
                label: '书名查询',
                key: 'resourceNames',
                placeholder: '请输入书名',
                type: 'input'
            },
            {
                label: 'ISBN查询',
                key: 'isbnNums',
                placeholder: '请输入ISBN',
                type: 'input'
            }, {
                label: '作者笔名',
                key: 'authorPenNames',
                placeholder: '请输入作者笔名',
                type: 'input'
            }, {
                label: '出版社',
                key: 'pressNames',
                placeholder: '请输入出版社',
                type: 'input'
            },
            {
                label: '版权类型',
                key: 'copyrightType',
                placeholder: '请选择版权类型',
                selectType: 'multiple',
                type: 'select',
                selectInfo: checkData
            }, {
                label: '是否授权',
                key: 'isConfer',
                placeholder: '请选择授权',
                type: 'select',
                // selectInfo: globalMsg.options
            }, {
                label: '授权性质',
                key: 'isExclusive',
                placeholder: '请选择授权性质',
                type: 'select',
                // selectInfo: globalMsg.exclusive
            }
        ]
    }
};
const getResChannelTableConfig = () => {
    return {
        columnConfig: [{
            title: '单位名称',
            dataIndex: 'orgName',
            width: 180,
        }, {
            title: '联系人',
            dataIndex: 'contactName',
            width: 150,
        }, {
            title: '联系电话', width: 170,
            dataIndex: 'contactPhone',
        },
        {
            title: '操作',
            dataIndex: 'operationTemplate',
            width: 90,
            scopedSlots: { customRender: 'operationTemplate' },
        }],
        columnConfigOnly: [{
            title: '单位名称',
            dataIndex: 'orgName',
            width: 100,
        }, {
            title: '联系人',
            dataIndex: 'contactName',
            width: 100,
        }, {
            title: '联系电话', width: 120,
            dataIndex: 'contactPhone',
        }]
    }
};
const getAuthorizedChannelTableConfig = () => {
    return {
        columnConfig: [{
            title: '单位名称',
            sorter: true,
            dataIndex: 'orgName',
            width: 100,
        }, {
            title: '联系人',
            sorter: true,
            dataIndex: 'contactName',
            width: 100,
        }, {
            title: '联系电话',
            sorter: true,
            dataIndex: 'contactPhone',
            width: 100,
        }, {
            title: '单位地址',
            sorter: true,
            dataIndex: 'orgSite',
            width: 100,
        },
        ]
    }
};
const getSearchResourceTableConfig = () => {
    return {
        columnConfig: [
            { scopedSlots: { customRender: 'selectTemp' }, width: 59 }, {
                title: '书名',
                sorter: true,
                dataIndex: 'resourceName',
                width: 100,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
            }, {
                title: '类型',
                dataIndex: 'resourceType',
                sorter: true,
                scopedSlots: { customRender: 'typeTemp' },
                width: 100,
            }, {
                title: '书号',
                sorter: true,
                dataIndex: 'bookNum',
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
                width: 100,
            }, {
                title: '作者笔名',
                sorter: true,
                dataIndex: 'authorPenName',
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
                width: 100,
            }, {
                title: '一级分类',
                sorter: true,
                dataIndex: 'firstClass',
                scopedSlots: {
                    filterDropdown: 'filterSelect',
                    filterIcon: 'filterIcon'
                },
                filterSelectOption: originalFirstClassList.concat(publishingFirstClassList),
                width: 100,
            },
            {
                title: '创建日期',
                dataIndex: 'insertTime',
                scopedSlots: {
                    filterDropdown: 'filterDate',
                    filterIcon: 'filterIcon',
                    customRender: 'insertTimeTemp'
                },
                width: 100,
                sorter: true
            },
        ],
        publishingColumnConfig: [
            { scopedSlots: { customRender: 'selectTemp' }, width: 59 }, {
                title: '书名',
                sorter: true,
                dataIndex: 'resourceName',
                width: 100,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
            }, {
                title: '类型',
                dataIndex: 'resourceType',
                sorter: true,
                scopedSlots: { customRender: 'typeTemp' },
                width: 100,
            }, {
                title: 'ISBN',
                sorter: true,
                dataIndex: 'isbnNum',
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
                width: 100,
            }, {
                title: '作者笔名',
                sorter: true,
                dataIndex: 'authorPenName',
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
                width: 100,
            }, {
                title: '一级分类',
                sorter: true,
                dataIndex: 'firstClass',
                scopedSlots: {
                    filterDropdown: 'filterSelect',
                    filterIcon: 'filterIcon'
                },
                filterSelectOption: originalFirstClassList.concat(publishingFirstClassList),
                width: 100,
            },
            {
                title: '创建日期',
                dataIndex: 'insertTime',
                scopedSlots: {
                    filterDropdown: 'filterDate',
                    filterIcon: 'filterIcon',
                    customRender: 'insertTimeTemp'
                },
                width: 100,
                sorter: true
            },
        ],
    }
};
const getUnitCaseTable = () => {
    return {
        columnConfig: [{
            title: '单号',
            dataIndex: 'orderNumber',
            width: 80,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '授权单位',
            dataIndex: 'orgName',
            width: 120,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '授权开始日期',
            dataIndex: 'conferStartDate',
            width: 150,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDate',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '授权结束日期',
            dataIndex: 'conferEndDate',
            width: 150,
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDate',
                filterIcon: 'filterIcon'
            },
        }, {
            title: '授权类型',
            dataIndex: 'copyrightType',
            sorter: true,
            width: 120,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon', customRender: 'copyrightTypeTemplate'
            },
            filterSelectOption: checkData,
        },
        {
            title: '审核状态', width: 120, sorter: true,
            scopedSlots: {
                filterDropdown: 'filterSelect',
                filterIcon: 'filterIcon', customRender: 'approvalStateTemplate'
            },
            filterSelectOption: [
                { value: 0, label: '待审核', },
                { value: 1, label: '审核通过', },
                { value: 2, label: '审核未通过', }],
            dataIndex: 'approvalState',
        }
        ]
    }
};

// 选择授权单位
const getSelectUnitTable = () => {
    return {
        columnConfig: [{ scopedSlots: { customRender: 'selectTemp' }, width: 50 }, {
            title: '单位名称',
            dataIndex: 'orgName',
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            width: 200,
        }, {
            title: '联系人',
            dataIndex: 'contactName',
            sorter: true,
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            width: 200,
        }, {
            title: '联系电话',
            dataIndex: 'contactPhone',
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            sorter: true,
            width: 200
        }, {
            title: '单位地址',
            dataIndex: 'orgSite',
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon'
            },
            sorter: true,
            width: 350
        }],
        // searchCon
    }
};
// 出库明细
const getStoreParticularsTable = () => {
    return {
        columnConfig: [
            {
                title: '书号',
                dataIndex: 'bookNum',
                width: 200,
            }, {
                title: '书名',
                dataIndex: 'resourceName',
                width: 200,
            }, {
                title: 'ISBN',
                dataIndex: 'isbnNum',
                width: 200
            }, {
                title: '类型',
                dataIndex: 'resourceType',
                width: 200,
                scopedSlots: { customRender: 'resourceTypeTemplate' }
            }, {
                title: '作家笔名',
                dataIndex: 'authorPenName',
                width: 200
            }, {
                title: '授权开始日期',
                dataIndex: 'conferStartDate',
                width: 200,
                scopedSlots: { customRender: 'conferStartDateTemplate' }
            }, {
                title: '授权结束日期',
                dataIndex: 'conferEndDate',
                width: 200,
                scopedSlots: { customRender: 'conferEndDateTemplate' }
            }, {
                title: '独家开始日期',
                dataIndex: 'excStartDate',
                width: 200,
                scopedSlots: { customRender: 'excStartDateTemplate' }
            }, {
                title: '独家结束日期',
                dataIndex: 'excEndDate',
                width: 200,
                scopedSlots: { customRender: 'excEndDateTemplate' }
            }, {
                title: '操作',
                dataIndex: 'operationTemplate',
                width: 90,
                scopedSlots: { customRender: 'operationTemplate' },
            }],
        // searchCon
    }
};

const getAddStoreDetailTable = () => {
    return {
        columnConfig: [
            {
                title: '书名',
                dataIndex: 'resourceName',
                sorter: true,
                width: 200,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
            }, {
                title: '书号',
                dataIndex: 'bookNum',
                sorter: true,
                width: 200,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
            }, {
                title: 'ISBN',
                dataIndex: 'isbnNum',
                sorter: true,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
                width: 200
            }, {
                title: '类型',
                dataIndex: 'resourceType',
                sorter: true,
                width: 200,
                scopedSlots: {
                    filterDropdown: 'filterSelect',
                    customRender: 'typeTemp',
                    filterIcon: 'filterIcon'
                },
                filterSelectOption: [
                    { value: 1, label: '出版' },
                    { value: 0, label: '原创' }
                ],
            }, {
                title: '作家笔名',
                dataIndex: 'authorPenName',
                sorter: true,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon'
                },
                width: 200
            }],
        searchConfig: [
            {
                label: '书号查询',
                key: 'bookNum',
                placeholder: '请输入书号',
                type: 'input'
            }, {
                label: 'ISBN查询',
                key: 'isbnNum',
                placeholder: '请输入ISBN',
                type: 'input'
            }
        ]
    }
};

const getOutboundListTable = () => {
    return {
        columnConfig: [
            {
                title: '书名',
                dataIndex: 'resourceName',
                width: 200,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                    customRender: 'resourceNameTemplate'
                }
            },
            {
                title: '类型',
                dataIndex: 'resourceType',
                width: 200,
                scopedSlots: {
                    customRender: 'resourceTypeTemplate', filterDropdown: 'filterSelect',
                    filterIcon: 'filterIcon',
                },
                filterSelectOption: [
                    { value: 0, label: '原创' },
                    { value: 1, label: '出版' },
                ]
            },
            {
                title: 'ISBN',
                dataIndex: 'isbnNum',
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                },
                width: 200
            },
            {
                title: '书号',
                dataIndex: 'bookNum',
                width: 200,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                }
            },
            {
                title: '作家笔名',
                dataIndex: 'authorPenName',
                width: 200,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                }
            },
            {
                title: '作家笔名',
                dataIndex: 'authorPenName',
                width: 200,
                scopedSlots: {
                    filterDropdown: 'filterDropdown',
                    filterIcon: 'filterIcon',
                }
            },
            {
                title: '操作',
                dataIndex: 'operationTemplate',
                width: 90,
                scopedSlots: { customRender: 'operationTemplate' },
            }
        ],
        searchConfig: [
            {
                label: '书名查询',
                key: 'resourceName',
                placeholder: '请输入书名',
                type: 'input'
            }, {
                label: '书号',
                key: 'isbnNum',
                placeholder: '请输入书号',
                type: 'input'
            },
            {
                label: 'ISBN',
                key: 'isbnNum',
                placeholder: '请输入ISBN',
                type: 'input'
            }
        ]
    }
}

export {
    getAuthorizedUnitTableConfig,
    getAppearStoreTableConfig,
    getResChannelTableConfig,
    getAuthorizedChannelTableConfig,
    getOriginalCopyrightTableConfig,
    getUnitCaseTable,
    getSearchResourceTableConfig,
    getPublishingCopyrightTableConfig,
    getSelectUnitTable,
    getStoreParticularsTable,
    getAddStoreDetailTable,
    getOutboundListTable
};