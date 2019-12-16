import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from 'ant-design-vue';
import crypto from "./util/crypto";
// 创建 axios 实例
let service: AxiosInstance;
service = axios.create({
    baseURL: "", // api 的 base_url
    timeout: 50000 // 请求超时时间
});

// request 拦截器 axios 的一些配置
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        if (config.url === 'resourcelib/sso/login') {
            return config;
        } else {
            if (localStorage.getItem('token')) {
                config.headers.common['token'] = localStorage.getItem('token');
                config.headers.common['agreement'] = crypto.encrypt(new Date().getTime());
            }
            return config;
        }
    },
    (error: any) => {
        console.error("error:", error);
        Promise.reject(error);
    }
);

// respone 拦截器 axios 的一些配置
service.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status === 200) {
            const data = res.data
            //   if (data.code === '0') {
            //     return data.data;
            //   } else {
            //     message.error(data.msg);
            //   }
            return data;
        } else {
            message.error('网络错误!');
            return Promise.reject(new Error(res.data.msg || "Error"));
        }
    },
    (error: any) => Promise.reject(error)
);

export default service;