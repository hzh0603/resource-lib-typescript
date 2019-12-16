export default class CommonUtil {
    static parseData(data) {
        if (data) {
            return JSON.parse(JSON.stringify(data));
        }
    }

    /**
     * 
     * @param fmt 日期转换
     * @param date 
     */
    static dateFmt(fmt, date) {
        const o = {
            'M+': date.getMonth() + 1,                 // 月份
            'd+': date.getDate(),                    // 日
            'h+': date.getHours(),                   // 小时
            'm+': date.getMinutes(),                 // 分
            's+': date.getSeconds(),                 // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds()             // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
    
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }

    static getCookie(name) {
        let c_start;
        let c_end;
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(name + '=');
            if (c_start !== -1) {
                c_start = c_start + name.length + 1;
                c_end = document.cookie.indexOf(';', c_start);
                if (c_end === -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return '';
    }

    static setCookie(name, value, day) {
        if (day !== 0) {
            // 当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
            const expires = day * 24 * 60 * 60 * 1000;
            const date = new Date(+new Date() + expires);
            document.cookie = name + '=' + escape(value) + ';expires=' + date.toUTCString();
        } else {
            document.cookie = name + '=' + escape(value);
        }
    }

    static deepClone(obj): any {
        const objClone = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === 'object') {
            for (const key in obj) {
                // 判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = this.deepClone(obj[key]);
                } else {
                    // 如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
        return objClone;
    }
}