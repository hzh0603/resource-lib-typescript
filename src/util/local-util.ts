export default class LocalUtil {
    /**
     * 返回oss配置
     */
    static getOssConfig() {
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo') + '');
        if (loginInfo && loginInfo.ossConfig) {
            return loginInfo.ossConfig;
        } else {
            return {};
        }
    }

    /**
     * 返回用户信息
     */
    static getUserConfig() {
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo') + '');
        if (loginInfo && loginInfo.user) {
            return loginInfo.user;
        } else {
            return {};
        }
    }
    /**
     * 返回用户操作id
     */
    static getOperationsConfig() {
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo') + '');
        if (loginInfo && loginInfo.operations) {
            return loginInfo.operations;
        } else {
            return [];
        }
    }
    /**
     * 返回导航栏menu配置
     */
    static getMenuConfig() {
        const loginInfo = JSON.parse(localStorage.getItem('loginInfo') + '');
        if (loginInfo && loginInfo.menus) {
            return loginInfo.menus;
        } else {
            return {};
        }
    }
}
