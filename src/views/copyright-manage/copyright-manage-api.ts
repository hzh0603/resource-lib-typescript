const baseUrl = '/resourcelib';

const copyrightUrl = {
    // 原创版权列表
    queryOriginalCopyrightList: `${baseUrl}/originalCopyright/queryOriginalCopyrightList`,
    // 新增原创版权
    addOriginalCopyright: `${baseUrl}/originalCopyright/addOriginalCopyright`,
    // 修改原创版权
    modifyOriginalCopyright: `${baseUrl}/originalCopyright/modifyOriginalCopyright`,
    // 查看原创版权
    queryOriginalCopyrightById: `${baseUrl}/originalCopyright/queryOriginalCopyrightById`,
    // 导出全部
    exportAll: `${baseUrl}/originalCopyright/exportAll`,
    // 导出选中
    exportSelect: `${baseUrl}/originalCopyright/exportSelect`,
    // 添加附件
    addRelatedFile: `${baseUrl}/originalCopyright/addRelatedFile`,
    // 查询附件列表
    queryRelatedFileList: `${baseUrl}/originalCopyright/queryRelatedFileList`,
    // 删除附件
    deleteRelatedFile: `${baseUrl}/originalCopyright/deleteRelatedFile`,
    // 查询限制渠道
    queryRestrictOrgList: `${baseUrl}/originalCopyright/queryRestrictOrgList`,
    // 新增限制渠道
    addRestrictOrg: `${baseUrl}/originalCopyright/addRestrictOrg`,
    // 删除限制渠道
    deleteRestrictOrg: `${baseUrl}/originalCopyright/deleteRestrictOrg`,
    // 批量删除原创版权资源
    batchDeleteOriginalCopyright: `${baseUrl}/originalCopyright/batchDeleteOriginalCopyright`,
    // 单个删除原创版权资源
    deleteOriginalCopyright: `${baseUrl}/originalCopyright/deleteOriginalCopyright`,
    // 修改开放状态
    productionStateSwitch: `${baseUrl}/originalCopyright/productionStateSwitch `,
    // 导入版权信息
    importExcel: `${baseUrl}/originalCopyright/importExcel`,
    // 审批接口
    originalCopyrightApproval: `${baseUrl}/originalCopyright/originalCopyrightApproval`,
    // 查询限制渠道
    queryOrgList: `${baseUrl}/org/queryOrgList`,
    // 添加到暂存架
    addCopyrightTsf: `${baseUrl}/copyrightTemporaryShelf/addCopyrightTsf`,
    addCopyrightTsfById: `${baseUrl}/copyrightTemporaryShelf/addCopyrightTsfById`,
};
const publishingUrl = {
    // 添加到暂存架
    addCopyrightTsf: `${baseUrl}/copyrightTemporaryShelf/addCopyrightTsf`,
    addCopyrightTsfById: `${baseUrl}/copyrightTemporaryShelf/addCopyrightTsfById`,
    // 查询出版列表
    queryPublishingCopyrightList: `${baseUrl}/publishingCopyright/queryPublishingCopyrightList`,
    // 录入出版版权信息
    addPublishingCopyright: `${baseUrl}/publishingCopyright/addPublishingCopyright`,
    // 修改出版版权信息
    modifyPublishingCopyright: `${baseUrl}/publishingCopyright/modifyPublishingCopyright`,
    // 查询出版版权详情
    queryPublishingCopyrightById: `${baseUrl}/publishingCopyright/queryPublishingCopyrightById`,
    //  查询附件列表
    queryRelatedFileList: `${baseUrl}/publishingCopyright/queryRelatedFileList`,
    // 添加附件
    addRelatedFile: `${baseUrl}/publishingCopyright/addRelatedFile`,
    // 删除附件
    deleteRelatedFile: `${baseUrl}/publishingCopyright/deleteRelatedFile`,
    // 查询限制渠道
    queryRestrictOrgList: `${baseUrl}/publishingCopyright/queryRestrictOrgList`,
    // 批量删除
    batchDeletePublishingCopyright: `${baseUrl}/publishingCopyright/batchDeletePublishingCopyright`,
    // 单个删除出版版权
    deletePublishingCopyright: `${baseUrl}/publishingCopyright/deletePublishingCopyright`,
    // 导出全部
    exportAll: `${baseUrl}/publishingCopyright/exportAll`,
    // 导出选择
    exportSelect: `${baseUrl}/publishingCopyright/exportSelect`,
    // 导入模板
    importExcel: `${baseUrl}/publishingCopyright/importExcel`,
    // 出版审核
    publishingCopyrightApproval: `${baseUrl}/publishingCopyright/publishingCopyrightApproval`,
};
const unitUrl = {
    queryOrgList: `${baseUrl}/org/queryOrgList`,
    insertUnit: `${baseUrl}/org/insert`,
    queryDetail: `${baseUrl}/org/detail`,
    queryEnclosureInfo: `${baseUrl}/org/queryEnclosureInfo`,
    deleteEnclosure: `${baseUrl}/org/deleteEnclosure`,
    insertEnclosure: `${baseUrl}/org/insertEnclosure`,
    deleteOrg: `${baseUrl}/org/deleteOrg`,
    updateUnit: `${baseUrl}/org/update`,
    exportOrgAll: `${baseUrl}/org/exportOrgAll`,
    exportOrgById: `${baseUrl}/org/exportOrgById`,
    importOrg: `${baseUrl}/org/importOrg`,
};

const appearUrl = {
    // 查询出库单列表
    queryOutboundList: `${baseUrl}/outbound/queryOutboundList`,
    // 查询出库明细
    queryCopyrightList: `${baseUrl}/outbound/queryCopyrightList`,
    // 新增出库明细
    addOutboundInfo: `${baseUrl}/outbound/addOutboundInfo`,
    // 查询出库单详情
    queryOutboundInfo: `${baseUrl}/outbound/queryOutboundInfo`,
    // 生成单号
    generateOrderNumber: `${baseUrl}/outbound/generateOrderNumber`,
    // 删除出库单
    deleteOutbound: `${baseUrl}/outbound/deleteOutbound`,
    // 删除出库明细
    deleteOutboundDetail: `${baseUrl}/outbound/deleteOutboundDetail`,
    // 查询出库明细
    queryOutboundDetailList: `${baseUrl}/outbound/queryOutboundDetailList`,
    // 新增出库明细
    addOutboundDetail: `${baseUrl}/outbound/addOutboundDetail`,
    // 修改出库单
    modifyOutbound: `${baseUrl}/outbound/modifyOutbound`,
    // 审核
    approvalOutbound: `${baseUrl}/outbound/approvalOutbound`,
    // 导出全部
    exportOutboundAll: `${baseUrl}/outbound/exportOutboundAll`,
    exportOutboundById: `${baseUrl}/outbound/exportOutboundById`,
    // 导入出库单
    importOutbound: `${baseUrl}/outbound/importOutbound`,
    // 导出pdf
    exportPdf: `${baseUrl}/outbound/exportPdf`,
};

const outboundListApi = {
    queryOutboundWorks: `${baseUrl}/outbound/queryOutboundWorks`,
    queryResourceDetail: `${baseUrl}/resource/queryResourceDetail`,
}

export {
    copyrightUrl,
    publishingUrl,
    unitUrl,
    appearUrl,
    outboundListApi
}
