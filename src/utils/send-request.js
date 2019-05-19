import Taro from '@tarojs/taro';

class SendRequest {
  constructor() {
    this.requestInterceptors = () => {};
    this.responseInterceptors = () => {};
  }

  setRequestInterceptors(requestInterceptors) {
    this.requestInterceptors = requestInterceptors;
  }

  setResponseInterceptors(responseInterceptors) {
    this.responseInterceptors = responseInterceptors;
  }

  request(config) {
    return new Promise((resolve, reject) => {
      Taro.showLoading({
        mask: true
      });
      Taro.request({
        ...this.beforeRequest(config),
        success: res => {
          if (res.statusCode !== 200) {
            return reject(res);
          }
          return resolve(this.afterRequest(res));
        },
        fail: err => {
          reject(err);
        },
        complete: () => {
          Taro.hideLoading();
        }
      }).catch(err => {
        console.log('Error:', err);
        return reject(err);
      });
    });
  }
}

export default new SendRequest();
