import Taro, { Component } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';

import './auction.css';
import productImage from '../../assets/images/product.jpg';

export default class Auction extends Component {
  config = {
    navigationBarTitleText: '拍卖品'
  };

  state = {
    productList: [
      {
        productId: '0',
        productCover: productImage,
        productName: '明基BenQ ScreenBar Plus 灯',
        startingPrice: 200.01,
        currentPrice: 20000.1,
        deadline: '2018-01-05'
      },
      {
        productId: '1',
        productCover: productImage,
        productName: '明基BenQ ScreenBar Plus 灯',
        startingPrice: 200.01,
        currentPrice: 2000.1,
        deadline: '2018-01-05'
      }
    ]
  };

  showDetails = productId => {
    Taro.navigateTo({
      url: `../details/details?productId=${productId}`
    });
  };

  render() {
    const { productList } = this.state;
    return (
      <View className='padding-content'>
        {productList.map((value, index) => (
          <View
            className='auction-item at-row'
            key={index}
            onClick={this.showDetails.bind(this, value.productId)}
          >
            <Image
              className='auction-item-image'
              src={value.productCover}
              mode='aspectFill'
            />
            <View className='autcion-item-content at-column at-row__justify--between'>
              <View className='auction-item-name'>{value.productName}</View>
              <View>
                <Text>起拍价格：￥{value.startingPrice}元</Text>
              </View>
              <View>
                <Text>截止日期：{value.deadline}</Text>
              </View>
              <View>当前价格：</View>
              <View>
                <Text className='current-price'>￥{value.currentPrice}</Text>元
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
