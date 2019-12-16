const baseUrl = '/resourcelib';
export const resourceApiUrl = {
    queryResourceList: `${baseUrl}/resource/queryResourceList`,
    addResourceInfo: `${baseUrl}/resource/addResourceInfo`,
    // 获取分类信息
    queryClassificationInfo: `${baseUrl}/dictionary/queryClassificationInfo`,
    exportExcelAll: `${baseUrl}/resource/exportExcelAll`,
    deleteResource: `${baseUrl}/resource/deleteResource`,
    exportExcelById: `${baseUrl}/resource/exportExcelById`,
    queryResourceInfo: `${baseUrl}/resource/queryResourceInfo`,
    queryResourceByBookNum: `${baseUrl}/resource/queryResourceByBookNum`,
    queryResourceByIsbnNum: `${baseUrl}/resource/queryResourceByIsbnNum`,
    // 查询附件信息
    modifyResourceInfo: `${baseUrl}/resource/modifyResourceInfo`,
    queryEnclosureInfo: `${baseUrl}/resource/queryEnclosureInfo`,
    addEnclosureInfo: `${baseUrl}/resource/addEnclosureInfo`,
    deleteEnclosureInfo: `${baseUrl}/resource/deleteEnclosureInfo`,
    importPublishResource: `${baseUrl}/resource/importPublishResource`,
    importOriginalResource: `${baseUrl}/resource/importOriginalResource`,
    addTemporaryShelf: `${baseUrl}/resourceTemporaryShelf/addTemporaryShelf`,
    addTemporaryShelfById: `${baseUrl}/resourceTemporaryShelf/addTemporaryShelfById`,
}