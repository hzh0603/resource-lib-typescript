import { Component, Vue } from 'vue-property-decorator';
import { Result } from '../../model/result';
import crypto from '../../util/crypto';
import commonUtil from '../../util/common-util';
import httpClient from "../../http";
import modalService from '@/components/hModal/modal-service';
import {Mutation} from 'vuex-class'

@Component
export default class Login extends Vue {
    public formConfig: Array<any>;
    public firstUrl: string = '/home/resource/resource-list';
    public loading: boolean;
    @Mutation('changeLogin') changeLogin;
    created() {
        this.loading = false;
        this.formConfig = [{
            key: 'account',
            type: 'input',
            required: true,
            value: commonUtil.getCookie('rememberInfo') ? JSON.parse(commonUtil.getCookie('rememberInfo')).account : '',
            placeholder: '请输入账号',
            icon: true,
            requiredMsg: '请填写账号'
        }, {
            key: 'password',
            type: 'password',
            value: commonUtil.getCookie('rememberInfo') ? crypto.decrypt(JSON.parse(commonUtil.getCookie('rememberInfo')).password) : '',
            required: true,
            placeholder: '请输入密码',
            requiredMsg: '请输入密码'
        }, {
            key: 'remember',
            type: 'slot',
        }]
    }

    /**
     * 存入相应数据
     * @param e 
     */
    public dataSet(e) {
        localStorage.setItem('loginInfo', JSON.stringify(e));
        // 版权类型
        const copyrightData: Array<any> = [];
        e.copyrightTypeList.map((item) => {
            const params = { label: '', value: '' };
            params.label = item.propertyName;
            params.value = item.propertyCode;
            copyrightData.push(params);
        }
        );
        localStorage.setItem('copyrightTypeList', JSON.stringify(copyrightData));
        // 分类信息
        const originalClassList: Array<any> = [];
        const originalClassInfo: Array<any> = e.originalClassList;
        originalClassInfo.forEach(item => {
            const obj: {
                value: string | number,
                label: string | number,
                children: Array<any>
            } = {
                value: item.propertyCode,
                label: item.propertyName,
                children: []
            };
            item.childList.forEach(_item => {
                obj.children.push({
                    value: _item.propertyCode,
                    label: _item.propertyName
                })
            });
            originalClassList.push(obj)
        });
        localStorage.setItem('originalClassList', JSON.stringify(originalClassList));
        const publishingClassList: Array<any> = [];
        const publishingClassInfo: Array<{
            propertyCode: string | number,
            propertyName: string | number,
            children?: Array<any>,
            [propName: string]: any;
        }> = e.publishingClassList;
        publishingClassInfo.forEach(item => {
            const obj: {
                value: string | number,
                label: string | number,
                children?: Array<any>,
            } = {
                value: item.propertyCode,
                label: item.propertyName,
                children: []
            };
            item.childList.forEach(_item => {
                if (obj.children) {
                    obj.children.push({
                        value: _item.propertyCode,
                        label: _item.propertyName
                    })
                }
            });
            publishingClassList.push(obj)
        });
        localStorage.setItem('publishingClassList', JSON.stringify(publishingClassList));
    }

    /**
     * 登入接口
     * @param e 
     */
    submit(e) {
        const loginData = {
            account: e.account,
            // 加密
            password: crypto.encrypt(e.password)
        };
        this.loading = true;
        httpClient.post('resourcelib/sso/login', loginData).then((result: Result) => {
            if (result.code === '0') {
                this.loading = false;
                // 记住密码
                if (e.remember) {
                    commonUtil.setCookie('rememberInfo', JSON.stringify(loginData), 1)
                } else {
                    commonUtil.setCookie('rememberInfo', '', -1)
                }
                this.changeLogin(result.data)
                // this.$store.commit('changeLogin', result.data);
                this.dataSet(result.data);
                // 有菜单时选择跳转到第一个URL
                if (result.data.menus) {
                    this.firstUrl = result.data.menus[0].menuUrl || result.data.menus[0].operationBeans[0].menuUrl;
                }
                this.$router.push({ path: this.firstUrl });
            } else {
                this.loading = false;
                modalService.error({ content: result.msg })
            }
        })
    }
}
