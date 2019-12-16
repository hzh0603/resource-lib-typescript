import CryptoJS from 'crypto-js';
const key = 'resourcelib12345';

export default class SessionUtil {
    /**
     * 通用加密
     * @param value
     * @returns {string}
     */
    static encrypt(value) {
        const keys = CryptoJS.enc.Utf8.parse(key);
        const values = CryptoJS.enc.Utf8.parse(value);
        return CryptoJS.AES.encrypt(values, keys, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    }
    /**
     * 通用解密
     * @param value
     * @returns {string}
     */
    static decrypt(value) {
        if (value) {
            const keys = CryptoJS.enc.Utf8.parse(key);
            const  bytes = CryptoJS.AES.decrypt(value, keys, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return bytes.toString(CryptoJS.enc.Utf8);
        } else {
            return '';
        }
    }
}
