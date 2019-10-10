import axios from 'axios';
import { Loading, message } from 'element-ui';
import router from '@/router/router';
import conf from "@/config/index";

const axiosInstance = () => {
  const options = {loading: false};
  const instance = axios.create({
    baseURL: conf.server.api,
    timeout: 50000,
    headers: {'X-Custom-Header': 'application/json; charset=UTF-8'}
  });

  let loadingInstancce = null;

  instance.interceptors.request.use((require) => {
    const req = require;
    // 全屏遮罩
    if ((!req.params || (req.params && req.params.silence !== 1)) && options.loading) {
      loadingInstancce = Loading.service({
        fullscreen: true,
        spinner: 'el-icon-loading',
        text: '加载中',
      });
    }
    return req;
  });
  instance.interceptors.response.use((response) => {
    loadingInstancce && loadingInstancce.close();
    const { data, config } = response;

    const status = [200, 201, 204];
    const method = ['post', 'put', 'delete'];
    const result = data;

    if (status.includes(response.status) && method.includes(config.method)) { // 正常响应预设 status 状态
      if (data.success) {
        message.success({ title: '操作成功' });
        // 请求成功，如果无data数据，则添加一个空对象来避免undefined，从而来和500 error(data)的undefined区分
        if (!data.data) { result.data = {}; }
      } else {
        message.error(data.message);
        return Promise.reject(data.message || '服务器返回错误');
      }
    } else if (!status.includes(response.status)) { // 非预设 status 状态，需要看具体返回类型决定如果处理
      message.error(response.statusText);
      return Promise.reject(response.statusText || '未知的错误');
    }
    return result;
  }, (error) => { // 5xx, 4xx
    loadingInstancce && loadingInstancce.close();
    if (401 === error.response.status ) {
      router.push("/401");
      return false;
    }else if (403 === error.response.status){
      router.push("/403");
      return false;
    } else if (404 === error.response.status){
      router.push("/404");
      return false;
    } else if (500 === error.response.status){
      message.error('服务器内部错误,请稍后再试！');
      return false;
    }
    message.error({ title: error });
    return Promise.reject(error);
  });

  return instance;
};

const Instance = axiosInstance();

export default Instance;