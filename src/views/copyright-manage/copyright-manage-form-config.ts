const originalClassList = JSON.parse(localStorage.getItem('originalClassList') as string);
const publishingClassList = JSON.parse(localStorage.getItem('publishingClassList') as string);
const copyrightTypeList = JSON.parse(localStorage.getItem('copyrightTypeList') as string).map(item => {
    item.key = item.value;
    delete item.value
    return item
});
const getAuthorizedUnitFormConfig = () => {
    return [{
        key: 'orgName', label: '单位名称', type: 'input', required: true, placeholder: '请输入单位名称',
        requiredMsg: '请输入单位名称', maxLength: 50, errorMsg: '单位名称格式不正确'
    },
    {
        key: 'contactName', label: '联系人', type: 'input', required: true, requiredMsg: '请填写联系人',
        placeholder: '请输入', maxLength: 32, errorMsg: '联系人格式不正确'
    }, {
        key: 'contactPhone', label: '联系电话', type: 'input', required: true, requiredMsg: '请填写电话',
        placeholder: '请输入联系电话', pattern: /^400[0-9]{7}$|^800[0-9]{7}$|^1[345789]\d{9}$|^0[0-9]{2,3}-[0-9]{6,8}$/,
        errorMsg: '联系电话格式不正确'
    }, {
        key: 'orgSite', label: '单位地址', type: 'input', required: true, requiredMsg: '请填写地址',
        placeholder: '请输入地址', maxLength: 100, errorMsg: '单位地址格式不正确'
    },
    {
        key: 'remark', label: '备注', type: 'textarea', required: false, requiredMsg: '请填写',
        placeholder: '请输入备注', maxLength: 150, errorMsg: '备注格式不正确'
    }
    ]
};
const getOriginalCopyrightFormConfig = () => {
    return [
        {
            key: 'bookNum',
            label: '书号',
            type: 'slot',
            requiredMsg: '请输入书号'
        },
        {
            key: 'class',
            label: '分类',
            required: false,
            type: 'cascader',
            placeholder: '请选择分类',
            options: originalClassList
        },
        {
            key: 'resourceName',
            label: '书名',
            required: true,
            maxLength: 50,
            requiredMsg: '请输入书名',
            errorMsg: '书名格式不正确',
            type: 'input',
            placeholder: '请输入书名',
        },
        {
            key: 'contractType',
            label: '签约类型',
            type: 'select',
            placeholder: '请选择签约类型',
            validateType: 'number',
            selectInfo: [
                { key: 0, label: '买断' },
                { key: 1, label: '保底分成' },
                { key: 2, label: '纯分成' },
            ]
        },
        {
            key: 'spareName',
            label: '备用名',
            maxLength: 32,
            type: 'input',
            placeholder: '请输入备用名',
            errorMsg: '备用名格式不正确',
        },
        {
            key: 'authorRealName',
            label: '作者实名',
            maxLength: 32,
            type: 'input',
            placeholder: '请输入作者实名',
            errorMsg: '作者实名格式不正确',
        },
        {
            key: 'authorPenName',
            label: '作者笔名',
            type: 'input',
            maxLength: 32,
            required: true,
            requiredMsg: '请输入作者笔名',
            errorMsg: '作者笔名格式不正确',
            placeholder: '请输入作者笔名',
        },
        {
            key: 'productionLink',
            label: '作品链接',
            required: false,
            maxLength: 100,
            requiredMsg: '请输入作品链接',
            errorMsg: '作品链接格式不正确',
            type: 'input',
            placeholder: '请输入作品链接',
        },
        {
            key: 'remuneration',
            label: '稿费',
            required: true,
            pattern: /^[1-9]\d{0,5}(\.\d{1,2})?$/,
            requiredMsg: '请输入稿费',
            errorMsg: '稿费格式不正确',
            type: 'input',
            placeholder: '请输入稿费',
        },
        {
            key: 'wordCount',
            label: '字数',
            type: 'slot',
            placeholder: '请输入字数',
        },
        {
            key: 'unitPrice',
            label: '千字单价',
            type: 'slot',
            placeholder: '请输入千字单价',
        },
        {
            key: 'productionState',
            label: '开放状态',
            type: 'select',
            required: true,
            placeholder: '请选择开放状态',
            requiredMsg: '请选择开放状态',
            validateType: 'number',
            selectInfo: [
                { key: 1, label: '已开放' },
                { key: 0, label: '未开放' },]
        },
        {
            key: 'contractDateStamp',
            label: '签约日期',
            required: true,
            type: 'dataPicker',
            requiredMsg: '请选择签约日期',
            placeholder: '请选择签约日期',
        },
        {
            key: 'introduceDateStamp',
            label: '引入时间',
            requiredMsg: '请选择时间',
            type: 'dataPicker',
            placeholder: '请选择时间',
        },
        {
            key: 'channel',
            label: '频道',
            type: 'select',
            required: true,
            requiredMsg: '请选择频道',
            placeholder: '请选择频道',
            validateType: 'number',
            selectInfo: [
                { key: 1, label: '男频' },
                { key: 0, label: '女频' },]
        }
    ]
};
const getOriginalCopyrightDrawFormConfig = () => {
    return [
        {
            key: 'bookNum',
            label: '书号',
            type: 'span',
        },
        {
            key: 'class',
            label: '分类',
            type: 'span',
        },
        {
            key: 'resourceName',
            label: '书名',
            type: 'span',
        },
        {
            key: 'contractType',
            label: '签约类型',
            type: 'span',
            pipe: 'contractPipe'
        },
        {
            key: 'authorRealName',
            label: '作者实名',
            type: 'span',
        },
        {
            key: 'authorPenName',
            label: '作者笔名',
            type: 'span',
        },
        {
            key: 'productionLink',
            label: '作品链接',
            type: 'span',
        },
        {
            key: 'remuneration',
            label: '稿费',
            type: 'span',
        },
        {
            key: 'productionState',
            label: '开放状态',
            type: 'span',
            pipe: 'openStatusPipe'
        },
        {
            key: 'contractDateStamp',
            label: '签约日期',
            type: 'span',
            pipe: 'datePipe'
        },
        {
            key: 'introduceDateStamp',
            label: '引入时间',
            type: 'span',
            pipe: 'datePipe'
        },
        {
            key: 'channel',
            label: '频道',
            type: 'span',
            pipe: 'channelPipe'
        },
    ]
};
const getOriginalCollapseConfig = () => {
    return [
        {
            key: '1',
            label: '限制渠道',
            value: 'restrictedChannel'
        },
        {
            key: '2',
            label: '版权选择',
            value: 'copyrightSelection'
        },
    ]
};
const getPublishingCopyrightFormConfig = () => {
    return [
        // {
        //     key: 'isbnNum',
        //     label: 'ISBN',
        //     required: true,
        //     requiredMsg: '请输入ISBN',
        //     maxLength: 32,
        //     errorMsg: 'ISBN格式不正确',
        //     type: 'input',
        //     placeholder: '请输入ISBN',
        // },
        {
            key: 'isbnNum',
            label: 'ISBN',
            type: 'slot',
            requiredMsg: '请输入ISBN'
        },
        {
            key: 'publishDateStamp',
            label: '出版年月',
            required: true,
            requiredMsg: '请选择出版年月',
            type: 'dataPicker',
            placeholder: '请选择出版年月',
        },
        {
            key: 'resourceName',
            label: '书名',
            required: true,
            maxLength: 50,
            requiredMsg: '请输入书名',
            errorMsg: '书名格式不正确',
            type: 'input',
            placeholder: '请输入书名',
        },
        {
            key: 'edition',
            label: '版次',
            maxLength: 10,
            requiredMsg: '请输入版次',
            errorMsg: '版次格式不正确',
            type: 'input',
            placeholder: '请输入版次',
        },
        {
            key: 'bookNum',
            label: '书号',
            maxLength: 32,
            requiredMsg: '请输入书号',
            errorMsg: '书号格式不正确',
            type: 'input',
            placeholder: '请输入书号',
        },
        {
            key: 'impression',
            label: '印次',
            maxLength: 10,
            requiredMsg: '请输入印次',
            errorMsg: '印次格式不正确',
            type: 'input',
            placeholder: '请输入印次',
        },
        {
            key: 'authorRealName',
            label: '作者实名',
            maxLength: 32,
            type: 'input',
            errorMsg: '作者实名格式不正确',
            placeholder: '请输入作者实名',
        },
        {
            key: 'bookSize',
            label: '开本',
            maxLength: 10,
            requiredMsg: '请输入开本信息',
            errorMsg: '开本格式不正确',
            type: 'input',
            placeholder: '请输入开本',
        },
        {
            key: 'authorPenName',
            label: '作者笔名',
            required: true,
            maxLength: 32,
            type: 'input',
            errorMsg: '作者笔名格式不正确',
            placeholder: '请输入作者笔名',
        },
        {
            key: 'graphicDesign',
            label: '装帧',
            maxLength: 32,
            requiredMsg: '请输入装帧',
            errorMsg: '装帧格式不正确',
            type: 'input',
            placeholder: '请输入装帧',
        },
        {
            key: 'class',
            label: '分类',
            required: false,
            type: 'cascader',
            placeholder: '请选择分类',
            options: publishingClassList
        },
        {
            key: 'pageNum',
            label: '页数',
            required: true,
            maxLength: 10,
            requiredMsg: '请输入页数',
            errorMsg: '页数格式不正确',
            pattern: '^[1-9]\\d*$',
            type: 'input',
            placeholder: '请输入页数',
        },
        {
            key: 'contractType',
            label: '签约类型',
            type: 'select',
            required: true,
            errorMsg: '签约类型格式不正确',
            placeholder: '请选择签约类型',
            validateType: 'number',
            selectInfo: [
                { key: 0, label: '买断' },
                { key: 1, label: '保底分成' },
                { key: 2, label: '纯分成' },
            ]
        },
        {
            key: 'chargeEditor',
            label: '责编',
            required: true,
            maxLength: 32,
            requiredMsg: '请输入责编',
            errorMsg: '责编格式不正确',
            type: 'input',
            placeholder: '请输入责编',
        },
        {
            key: 'shareRatio',
            label: '分成比例',
            requiredMsg: '请输入小数',
            type: 'slot',
            placeholder: '请输入分成比例',
        },
        {
            key: 'language',
            label: '语种',
            maxLength: 10,
            requiredMsg: '请输入语种',
            errorMsg: '语种格式不正确',
            type: 'input',
            placeholder: '请输入语种',
        },
        {
            key: 'price',
            label: '定价',
            required: true,
            pattern: /^[1-9]\d{0,5}(\.\d{1,2})?$/,
            requiredMsg: '请输入定价',
            errorMsg: '定价格式不正确',
            placeholder: '请输入定价',
            type: 'input',
        },
        {
            key: 'bookSeries',
            label: '丛书名',
            maxLength: 32,
            requiredMsg: '请输入丛书名',
            errorMsg: '丛书名格式不正确',
            type: 'input',
            placeholder: '请输入丛书名',
        },
        {
            key: 'pressName',
            label: '出版社',
            maxLength: 50,
            required: true,
            requiredMsg: '请输入出版社',
            errorMsg: '出版社格式不正确',
            type: 'input',
            placeholder: '请输入出版社',
        },
        {
            key: 'contentChannels',
            label: '内容渠道',
            maxLength: 50,
            requiredMsg: '请输入内容渠道',
            errorMsg: '内容渠道格式不正确',
            type: 'input',
            placeholder: '请输入内容渠道',
        },
        {
            key: 'intro',
            label: '内容简介',
            type: 'textarea',
            required: false,
            requiredMsg: '请填写内容简介',
            placeholder: '请输入内容简介',
            maxLength: 500,
            errorMsg: '内容简介格式不正确'
        },
        {
            key: 'remark',
            label: '备注',
            type: 'textarea',
            required: false,
            requiredMsg: '请填写',
            placeholder: '请输入备注',
            maxLength: 150,
            errorMsg: '备注格式不正确'
        }
    ]
};
const getPublishingCopyrightDrawFormConfig = () => {
    return [
        {
            key: 'isbnNum',
            label: 'ISBN',
            type: 'span',
        },
        {
            key: 'publishDateStamp',
            label: '出版年月',
            type: 'span',
            pipe: 'datePipe'
        },
        {
            key: 'resourceName',
            label: '书名',
            type: 'span',
        },
        {
            key: 'edition',
            label: '版次',
            type: 'span',
        },
        {
            key: 'bookNum',
            label: '书号',
            type: 'span',
        },
        {
            key: 'impression',
            label: '印次',
            type: 'span',
        },
        {
            key: 'authorRealName',
            label: '作者实名',
            type: 'span',
        },
        {
            key: 'bookSize',
            label: '开本',
            type: 'span',
        },
        {
            key: 'authorPenName',
            label: '作者笔名',
            type: 'span',
        },
        {
            key: 'graphicDesign',
            label: '装帧',
            type: 'span',
        },
        {
            key: 'class',
            label: '分类',
            type: 'span',
        },
        {
            key: 'pageNum',
            label: '页数',
            type: 'span',
        },
        {
            key: 'contractType',
            label: '签约类型',
            type: 'span',
            pipe: 'contractPipe'
        },
        {
            key: 'chargeEditor',
            label: '责编',
            type: 'span',
        },
        {
            key: 'shareRatio',
            label: '分成比例',
            type: 'span',
            pipe: 'toPercent'
        },
        {
            key: 'language',
            label: '语种',
            type: 'span',
        },
        {
            key: 'price',
            label: '定价',
            type: 'span',
        },
        {
            key: 'bookSeries',
            label: '丛书名',
            type: 'span',
        },
        {
            key: 'pressName',
            label: '出版社',
            type: 'span',
        },
        {
            key: 'contentChannels',
            label: '内容渠道',
            type: 'span',
        },
        {
            key: 'intro',
            label: '内容简介',
            type: 'span',
        },
        {
            key: 'remark',
            label: '备注',
            type: 'span',
        }
    ]
};
const viewAuthorizedUnitFormConfig = () => {
    return [{
        key: 'orgName', label: '单位名称', type: 'span', value: ''
    },
    {
        key: 'contactName', label: '联系人', type: 'span', value: ''
    }, {
        key: 'contactPhone', label: '联系电话', type: 'span', value: ''
    }, {
        key: 'orgSite', label: '单位地址', type: 'span', value: ''
    },
    {
        key: 'remark', label: '备注', type: 'span', value: ''
    }
    ]
};

const getStoreFormConfig = () => {
    return [
        {
            key: 'orderNumber',
            label: '单号',
            type: 'span',
            required: true,
            requiredMsg: '请输入单号',
            placeholder: '请输入',
        },
        {
            key: 'contractType',
            label: '签约类型',
            type: 'select',
            required: true,
            requiredMsg: '请选择签约类型',
            placeholder: '请选择',
            validateType: 'number',
            selectInfo: [
                { key: 0, label: '买断' },
                { key: 1, label: '保底分成' },
                { key: 2, label: '纯分成' },
            ]
        },
        {
            key: 'title',
            label: '标题',
            required: true,
            maxLength: 50,
            requiredMsg: '请输入标题',
            errorMsg: '标题格式不正确',
            type: 'input',
            placeholder: '请输入',
        },
        {
            key: 'shareRatio',
            label: '分成比例',
            type: 'slot',
            placeholder: '请输入'
        }, {
            key: 'contractCost',
            label: '授权费用',
            type: 'input',
            placeholder: '请输入',
            pattern: /^[0-9]\d*(\.\d{1,2})?$/,
            errorMsg: '授权费用格式不对'
        },
        {
            key: 'unitSelect',
            label: '授权单位',
            type: 'slot',
            required: true,
            requiredMsg: '请选择授权单位',
            placeholder: '请选择',
        },
        {
            key: 'conferDateTime',
            label: '授权日期',
            type: 'rangePicker',
            showTime: false,
            startPlaceholder: '授权起始时间', endPlaceholder: '授权结束时间',
            required: true,
            requiredMsg: '请选择授权日期',
            errorMsg: '请选择授权日期',
        },
        {
            key: 'copyrightType',
            label: '授权类型',
            required: true,
            requiredMsg: '请选择授权类型',
            type: 'select',
            validateType: 'string',
            selectInfo: copyrightTypeList,
            placeholder: '请选择',
        },
        {
            key: 'remark',
            label: '备注',
            type: 'textarea',
            placeholder: '请输入',
            maxLength: 150,
            errorMsg: '备注格式错误'
        }
    ]
};
const getStoreDisFormConfig = () => {
    return [
        {
            key: 'orderNumber',
            label: '单号',
            type: 'span',
            required: true,
            requiredMsg: '请输入单号',
            placeholder: '请输入',
        },
        {
            key: 'contractType',
            label: '签约类型',
            type: 'select',
            required: true,
            requiredMsg: '请选择签约类型',
            placeholder: '请选择',
            disabled: true,
            validateType: 'number',
            selectInfo: [
                { key: 0, label: '买断' },
                { key: 1, label: '保底分成' },
                { key: 2, label: '纯分成' },
            ]
        },
        {
            key: 'title',
            label: '标题',
            required: true,
            maxLength: 50,
            requiredMsg: '请输入标题',
            errorMsg: '标题格式不正确',
            type: 'input',
            placeholder: '请输入',
        },
        {
            key: 'shareRatio',
            label: '分成比例',
            type: 'slot',
            placeholder: '请输入'
        }, {
            key: 'contractCost',
            label: '授权费用',
            type: 'input',
            pattern: /^[0-9]\d*(\.\d{1,2})?$/,
            errorMsg: '授权费用格式不对',
            placeholder: '请输入',
        },
        {
            key: 'unitSelect',
            label: '授权单位',
            type: 'slot',
            required: true,
            disabled: true,
            requiredMsg: '请选择授权单位',
            placeholder: '请选择',
        },
        {
            key: 'conferDateTime',
            label: '授权日期',
            type: 'rangePicker',
            showTime: false,
            startPlaceholder: '授权起始时间', endPlaceholder: '授权结束时间',
            required: true,
            disabled: true,
            requiredMsg: '请选择授权日期',
            errorMsg: '请选择授权日期',
        },
        {
            key: 'copyrightType',
            label: '授权类型',
            required: true,
            requiredMsg: '请选择授权类型',
            type: 'select',
            disabled: true,
            validateType: 'string',
            selectInfo: copyrightTypeList,
            placeholder: '请选择',
        },
        {
            key: 'remark',
            label: '备注',
            type: 'textarea',
            placeholder: '请输入',
            maxLength: 150,
            errorMsg: '备注格式错误'
        }
    ]
};


const viewStoreForm = () => {
    return [
        {
            key: 'orderNumber',
            label: '单号',
            type: 'span',
        },
        {
            key: 'contractType',
            label: '签约类型',
            type: 'span',
            pipe: 'contractPipe'
        },
        {
            key: 'title',
            label: '标题',
            type: 'span',
        },
        {
            key: 'shareRatio',
            label: '分成比例',
            type: 'span',
            pipe: 'toPercent'
        }, {
            key: 'contractCost',
            label: '授权费用',
            type: 'span',
        },
        {
            key: 'orgName',
            label: '授权单位',
            type: 'span',
        },
        {
            key: 'conferDateTime',
            label: '授权日期',
            type: 'span',
        },
        {
            key: 'copyrightType',
            label: '授权类型',
            type: 'span',
            pipe: 'copyrightType'
        },
        {
            key: 'remark',
            label: '备注',
            type: 'span',
        }
    ]
};

export {
    getAuthorizedUnitFormConfig,
    getOriginalCopyrightFormConfig,
    getOriginalCollapseConfig,
    getOriginalCopyrightDrawFormConfig,
    viewAuthorizedUnitFormConfig,
    getPublishingCopyrightFormConfig,
    getStoreFormConfig,
    getPublishingCopyrightDrawFormConfig,
    getStoreDisFormConfig,
    viewStoreForm,
}
