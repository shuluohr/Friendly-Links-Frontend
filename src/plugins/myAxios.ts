import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
});

myAxios.defaults.withCredentials = true //向后台请求的时候携带凭证

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("我发送请求了",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios
