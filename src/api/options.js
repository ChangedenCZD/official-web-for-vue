// 请求参数
import axios from 'axios';
import Method from './method';

class Options {
  constructor () {
    // 请求Url
    this.url = '';
    // 请求方法，默认GET
    this.method = Method.GET;
    // 请求体
    this.data = undefined;
    // 请求Url中的参数
    this.params = undefined;
    // 请求超时，默认60秒
    this.timeout = 60000;
    // 请求最大长度，上传大文件需调整该参数
    this.maxContentLength = 3145728;
    //
    this.isSilence = false;
  }
}

const appAction = funcName => {
  const func = window.globalApp[funcName];
  typeof func === 'function' && func();
};
const showLoading = () => appAction('showLoading');

const hideLoading = () => appAction('hideLoading');
export default class Api {

  constructor () {
    this.options = new Options();
  }

  // 设置请求Url
  setUrl (url) {
    this.options.url = url;
    return this;
  }

  // 设置请求方法，默认GET
  setMethod (method = Method.GET) {
    this.options.method = method;
    return this;
  }

  // 设置请求体
  setData (data) {
    this.options.data = data;
    return this;
  }

  // 设置请求Url中的参数
  setParams (params) {
    this.options.params = params;
    return this;
  }

  // 设置请求超时
  setTimeout (timeout) {
    this.options.timeout = timeout;
    return this;
  }

  // 设置请求最大长度
  setMaxContentLength (maxContentLength) {
    this.options.maxContentLength = maxContentLength;
    return this;
  }

  // 设置请求头部
  setHeaders (headers) {
    this.options.headers = headers;
    return this;
  }

  setSilence (isSilence) {
    this.isSilence = typeof isSilence === 'boolean' ? isSilence : false;
    return this;
  }

  // 执行接口请求
  request () {
    const self = this;
    const options = self.options;
    const isSilence = self.isSilence;
    return new Promise((resolve, reject) => {
      if (!isSilence) {
        showLoading();
      }
      axios.request(options).then(response => {
        hideLoading();
        resolve(response.data);
      }).catch(err => {
        hideLoading();
        reject(err);
      });
    });
  }
}
