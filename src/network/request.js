import axios from 'axios';

export function request(config) { // function可以到处多个 用default就是默认导出一个
    // 1 创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 2000
    });

    // 2 axios的拦截器
    // 2.1 添加请求拦截器
    // instance.interceptors.request.use(config => {
    //   console.log(config);
    //   return config
    // },err => {
    //   console.log(err);
    // })

    // 2.2 添加响应拦截器
    instance.interceptors.response.use(res => {
      // console.log(res);
      return res.data;
    }, err => {
      console.log(err);
    })

    // 3 发送真正的网络请求
    return instance(config) // instance的返回值设个Promise
  }