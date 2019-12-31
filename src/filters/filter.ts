/**
 * 到期提醒枚举管道
 * @param value 
 */
export const expirePipe = (value) => {
    if (value || value === 0) {
        switch (value) {
            case 0:
                return '原创到期';
            case 1:
                return '出版到期';
            case 2:
                return '出库到期';
        }
    } else {
        return value;
    }
}

/**
 * 到期提醒枚举管道
 * @param value 
 */
export const expireTitlePipe = (value) => {
    if (value) {
        switch (value) {
            case 'outDateCount':
                return '已到期';
            case 'oneDateCount':
                return '一个月内';
            case 'twoDateCount':
                return '1-2个月';
            case 'threeDateCount':
                return '2-3个月';
            case 'fourDateCount':
                return '3-6个月';
        }
    } else {
        return value;
    }
}