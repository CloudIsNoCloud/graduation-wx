import Taro, { Component } from '@tarojs/taro';
import { View, SwiperItem, Swiper, Image, Text } from '@tarojs/components';
import { BigNumber } from 'bignumber.js';

import './details.css';

export default class Details extends Component {
  config = {
    navigationBarTitleText: ''
  };

  state = {
    productDetails: {
      productCover:
        'https://i0.hdslb.com/bfs/article/ff3219b8a7a215c74c3cc11c36d6739b14b34ee8.jpg@1075w_602h.webp',
      productImages: [
        'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=92afee66fd36afc3110c39658318eb85/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg'
      ],
      productName: '明基BenQ ScreenBar Plus 灯',
      productIntroduction:
        '商家详情页（含主图）以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。',
      productQuantity: 1,
      startingPrice: 200.01,
      priceIncrease: 200.1,
      currentPrice: 800.01,
      bidderNumber: 1,
      auctionTimes: 3,
      deadline: '2019-05-21',
      // auctioned auctioning
      status: 'auctioning'
    },
    currentSwiper: 0,
    myBid: 0,
    minBid: 0,
    bottomHeight: 0
  };

  componentWillMount() {
    const {
      productDetails: { currentPrice, priceIncrease }
    } = this.state;
    const { productId } = this.$router.params;
    Taro.setNavigationBarTitle({ title: productId || '商品详情' });
    this.setState({
      myBid: new BigNumber(currentPrice)
        .plus(new BigNumber(priceIncrease))
        .toNumber(),
      minBid: new BigNumber(currentPrice)
        .plus(new BigNumber(priceIncrease))
        .toNumber()
    });
  }

  componentDidMount() {
    const that = this;
    Taro.createSelectorQuery()
      .select('.details-autcion')
      .boundingClientRect(rect => {
        that.setState({
          bottomHeight: rect.height
        });
      })
      .exec();
  }

  changeSwiper = e => {
    const {
      target: { current }
    } = e;
    this.setState({ currentSwiper: current });
  };

  previewImage = (swiperImages, current) => {
    Taro.previewImage({
      urls: swiperImages,
      current: swiperImages[current]
    });
  };

  subtractBid = () => {
    const {
      productDetails: { priceIncrease },
      myBid,
      minBid
    } = this.state;
    if (myBid === minBid) {
      Taro.showToast({
        title: `至少需要出价${minBid}元`,
        icon: 'none',
        mask: true
      });
      return;
    }
    this.setState({
      myBid: new BigNumber(myBid).minus(new BigNumber(priceIncrease)).toNumber()
    });
  };

  addBid = () => {
    const {
      productDetails: { priceIncrease },
      myBid
    } = this.state;
    this.setState({
      myBid: new BigNumber(myBid).plus(new BigNumber(priceIncrease)).toNumber()
    });
  };

  bidAuction = () => {
    const {
      productDetails,
      productDetails: { priceIncrease },
      myBid
    } = this.state;
    const that = this;
    Taro.showToast({
      title: `出了${myBid}元`,
      icon: 'none',
      success: () => {
        that.setState({
          productDetails: { ...productDetails, currentPrice: myBid },
          myBid: new BigNumber(myBid)
            .plus(new BigNumber(priceIncrease))
            .toNumber(),
          minBid: new BigNumber(myBid)
            .plus(new BigNumber(priceIncrease))
            .toNumber()
        });
      }
    });
  };

  render() {
    const {
      productDetails: {
        productCover,
        productImages,
        startingPrice,
        currentPrice,
        productName,
        productIntroduction,
        priceIncrease,
        productQuantity,
        bidderNumber,
        auctionTimes,
        deadline
        // status
      },
      currentSwiper,
      myBid,
      minBid,
      bottomHeight
    } = this.state;
    const swiperImages = [productCover, ...productImages];
    return (
      <View
        className='details-content'
        style={{ paddingBottom: `${bottomHeight}px` }}
      >
        <Swiper
          className='details-swiper'
          current={currentSwiper}
          onChange={this.changeSwiper}
        >
          {swiperImages.map((value, index) => (
            <SwiperItem
              key={index}
              onClick={this.previewImage.bind(this, swiperImages, index)}
            >
              <Image className='details-image' src={value} mode='aspectFill' />
            </SwiperItem>
          ))}
        </Swiper>
        <View className='details-section at-row at-row__justify--between at-row__align--end'>
          <Text>
            <Text className='current-price'>￥{currentPrice}</Text>元
          </Text>
          <Text>起拍价格：￥{startingPrice}元</Text>
        </View>
        <View className='details-section'>
          <View className='details-row details-name'>{productName}</View>
          <View className='details-row'>产品说明</View>
          <View className='details-row'>{productIntroduction}</View>
        </View>
        <View className='details-section'>
          <View className='details-row at-row'>
            <View className='at-col-6'>加价幅度：{priceIncrease}元</View>
            <View className='at-col-6'>拍卖品数量：{productQuantity}</View>
          </View>
          <View className='details-row at-row'>
            <View className='at-col-6'>出价人数：{bidderNumber}人</View>
            <View className='at-col-6'>出价次数：{auctionTimes}次</View>
          </View>
          <View className='details-row at-row'>截止日期：{deadline}</View>
        </View>
        <View className='details-autcion'>
          <View className='details-bid at-row'>
            <Text
              className={`at-col-2 ${
                myBid === minBid
                  ? 'details-subtract-disable'
                  : 'details-bid-subtract'
              }`}
              onClick={this.subtractBid}
            >
              -
            </Text>
            <Text className='at-col-8'>{myBid}元</Text>
            <Text className='details-bid-add at-col-2' onClick={this.addBid}>
              +
            </Text>
          </View>
          <View className='details-bid-button' onClick={this.bidAuction}>
            出价竞拍
          </View>
        </View>
      </View>
    );
  }
}
