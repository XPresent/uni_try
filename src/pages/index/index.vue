<template>
  <view class="app-container">
    <view class="menu">
      <view v-for="(item,index) in menu"
            :key="index"
            class="menu-box">
        <view class="menu-box-title">{{item.title}}</view>
        <uni-grid :column="1"
                  :showBorder="false"
                  @change="open">
          <uni-grid-item v-for="(cell,key) in item.content"
                         :key="key"
                         :index="index*100+key"
                         class="menu-box-item">
            <text class="menu-box-item-label">{{cell.label}}</text>
          </uni-grid-item>
        </uni-grid>
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.app-container {
  .uni-grid {
    .uni-grid-item {
      height: 160rpx !important;
      box-sizing: border-box;
    }
  }
}
</style>
<style lang="scss" scoped>
.app-container {
  .menu-box {
    &:not(:first-child) {
      margin-top: 40rpx;
    }
    .menu-box-title {
      padding-bottom: 10rpx;
    }
    .menu-box-item-label {
      text-align: right;
      padding: 20rpx 60rpx 20rpx 30rpx;
    }
    .menu-box-item {
      margin-top: 30rpx;
      &:nth-child(1) {
        background: #ccddf2;
      }
      &:nth-child(2) {
        background: #f2ebcc;
      }
      &:nth-child(3) {
        background: #ccccf2;
      }
      &:nth-child(4) {
        background: #cef2cc;
      }
      &:nth-child(5) {
        background: #f2d8cc;
      }
    }
  }
}
</style>

<script>
import { uniGrid, uniGridItem } from '@dcloudio/uni-ui'
export default {
  data() {
    return {
      menu: [
        {
          title: '精选数据',
          content: [
            {
              label: '计算资产净值',
              link: '/pages/calculate/netValue'
            },
            {
              label: '计算资产合理价格',
              link: '/pages/calculate/rightPrice'
            },
            {
              label: '段子',
              link: '/pages/fun/interest'
            }
          ]
        },
      ]
    };
  },
  methods: {
    open(e) {
      const { index } = e.detail
      const firstIndex = Math.floor(index / 100)
      const secondIndex = index % 100
      const currentCell = this.menu[firstIndex].content
      uni.navigateTo({
        url: currentCell[secondIndex].link
      })
    },
    getInterestingWords() {
      this.$xhr.post('fun:getInterestingWords').then(res => {
        const data = res.var
        this.duanzi = data.duanzi[0].content
      })
    }
  },
  components: {
    uniGrid,
    uniGridItem
  }
};
</script>
