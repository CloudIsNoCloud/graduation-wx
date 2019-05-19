import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './record.css';

export default class Record extends Component {
  config = {
    navigationBarTitleText: '出价记录'
  };

  state = {
    recordList: [
      {
        productId: '3',
        productName: '明基BenQ ScreenBar Plus 灯',
        bid: 200.01,
        time: '2018-01-05 01:01:01'
      },
      {
        productId: '4',
        productName: '明基BenQ ScreenBar Plus 灯',
        bid: 200.01,
        time: '2018-01-05 01:01:01'
      }
    ]
  };

  showDetails = productId => {
    Taro.navigateTo({
      url: `../details/details?productId=${productId}`
    });
  };

  render() {
    const { recordList } = this.state;
    return (
      <View className='padding-content'>
        {recordList.map((value, index) => (
          <View
            className='record-item'
            key={index}
            onClick={this.showDetails.bind(this, value.productId)}
          >
            <View className='record-item-name'>{value.productName}</View>
            <View className='at-row at-row__justify--between'>
              <Text>出价：￥{value.bid}元</Text>
              <Text style={{ color: '#999999' }}>{value.time}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
