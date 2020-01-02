import commonUtil from '@/util/common-util'
const copyrightTypeList = JSON.parse(localStorage.getItem('copyrightTypeList') as string);
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

/**
 * 审核枚举管道
 * @param value 
 */
export const reviewPipe = (value) => {
    if (value || value === 0) {
        switch (value) {
            case 0 :
                return '待审核';
            case 1:
                return '审核通过';
            case 2:
                return '审核未通过';
        }
    } else {
        return value;
    }
}

/**
 * 签约类型管道
 * @param value 
 */
export const contractPipe = (value) => {
    if (value || value === 0) {
        switch (value) {
            case 0 :
                return '买断';
            case 1:
                return '保底分成';
            case 2:
                return '纯分成';
        }
    } else {
        return value;
    }
}

export const formPipe = (value, string) => {
    if (string && (value || value === 0)) {
        switch (string) {
            case 'datePipe':
                return commonUtil.dateFmt('yyyy-MM-dd', new Date(value));
            case 'booleanPipe':
                if (Number(value) === 1) {
                    return '是'
                } else {
                    return '否'
                }
            case 'userStatusPipe':
                if (Number(value) === 1) {
                    return '有效'
                } else {
                    return '停用'
                }
            case 'openStatusPipe':
                if (Number(value) === 1) {
                    return '已开放'
                } else {
                    return '未开放'
                }
            case 'channelPipe' :
                if (Number(value) === 1) {
                    return '男频'
                } else {
                    return '女频'
                }
            case 'contractPipe':
                if (Number(value) === 0) {
                    return '买断'
                } else if (Number(value) === 1) {
                    return '保底分成'
                } else {
                    return '纯分成'
                }
            case 'toPercent':
                if (value === 0) {
                    return 0
                } else {
                    return Number(value) + "%";
                }
            case 'shelfTypePipe':
                if (value === 1) {
                    return '版权'
                } else {
                    return '资源'
                }
            case 'reviewPipe':
                switch (value) {
                    case 0 :
                        return '待审核';
                    case 1:
                        return '审核通过';
                    case 2:
                        return '审核未通过';
                }
            case 'copyrightType':
                let label = '';
                copyrightTypeList.forEach(item => {
                    if (item.value === value) {
                        label = item.label
                    }
                });
                return label;
            case 'resourceType':
                if(value === 1){
                    return '出版'
                } else{
                    return '原创'
                }
        }
    } else {
        return value;
    }
}