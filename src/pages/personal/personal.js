import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem, AtButton } from 'taro-ui';

import './personal.css';
import testAvatar from '../../assets/images/test-avatar.jpg';

export default class Personal extends Component {
  config = {
    navigationBarTitleText: '个人信息'
  };

  state = {
    userInfo: {
      avatar: testAvatar,
      username: 'testName',
      introduction:
        '个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍个人介绍',
      sex: '男',
      hometown: '',
      joinTime: '2019-03-03'
    }
  };

  logout = () => {
    Taro.reLaunch({
      url: '../login/login',
      success: () => {
        Taro.setStorageSync('userId', '');
      }
    });
  };

  render() {
    const {
      userInfo: { avatar, username, introduction, sex, hometown, joinTime }
    } = this.state;
    return (
      <View>
        <AtList>
          <AtListItem title='头像' extraThumb={avatar} />
          <AtListItem title='用户名' extraText={username} />
          <AtListItem title='个人介绍' extraText={introduction} />
          <AtListItem title='性别' extraText={sex} />
          <AtListItem title='家乡' extraText={hometown} />
          <AtListItem title='加入时间' extraText={joinTime} />
        </AtList>
        <AtButton
          className='personal-logout'
          type='primary'
          onClick={this.logout}
        >
          退出登录
        </AtButton>
      </View>
    );
  }
}
