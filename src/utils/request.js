import Axios from "axios";

import { Toast } from "antd-mobile";

const request = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    Toast.show({
      icon: "loading",
      content: "加载中…",
    });
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    Toast.clear();
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    Toast.clear();
    return Promise.reject(error);
  }
);

export default request;
