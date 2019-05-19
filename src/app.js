import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';

import sr from './utils/send-request';

import './app.css';
import Index from './pages/index';

sr.setRequestInterceptors(config => {
  const newConfig = { ...config };
  const userId = Taro.getStorageSync('userId');
  newConfig.data = {
    ...config.data,
    userId
  };
  console.log('config:', newConfig);
  return newConfig;
});

sr.setResponseInterceptors(res => {
  console.log('res:', res);
  return res;
});

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/login/login',
      'pages/auction/auction',
      'pages/record/record',
      'pages/personal/personal',
      'pages/details/details'
    ],
    tabBar: {
      color: '#333333',
      selectedColor: '#6190e8',
      backgroundColor: '#ffffff',
      list: [
        {
          iconPath: './assets/images/auction.png',
          selectedIconPath: './assets/images/auction-selected.png',
          pagePath: 'pages/auction/auction',
          text: '竞拍'
        },
        {
          iconPath: './assets/images/record.png',
          selectedIconPath: './assets/images/record-selected.png',
          pagePath: 'pages/record/record',
          text: '出价记录'
        },
        {
          iconPath: './assets/images/personal.png',
          selectedIconPath: './assets/images/personal-selected.png',
          pagePath: 'pages/personal/personal',
          text: '个人信息'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
