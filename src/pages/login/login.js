import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui';

import './login.css';

export default class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  };

  state = {
    account: '',
    password: ''
  };

  login = () => {
    const { account, password } = this.state;
    if (!(account && password)) {
      Taro.showToast({
        title: '请输入账号密码',
        icon: 'none'
      });
      return;
    }
    Taro.setStorageSync('userId', 'admin');
    Taro.reLaunch({
      url: '../auction/auction'
    });
  };

  render() {
    const { account, password } = this.state;
    return (
      <View>
        <AtForm>
          <AtInput
            name='account'
            title='账号'
            value={account}
            onChange={value => {
              this.setState({ account: value });
            }}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            maxLength={18}
            value={password}
            onChange={value => {
              this.setState({ password: value });
            }}
          />
        </AtForm>
        <AtButton className='login-button' type='primary' onClick={this.login}>
          登录
        </AtButton>
      </View>
    );
  }
}
