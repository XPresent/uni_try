<template>
  <view class="net-value">
    <view class="panel">
      <view class="panel-header">资产增长率</view>
      <view class="panel-container">
        <form @submit="growFormSubmit">
          <view class="uni-form-item">
            <view class="form-title">各资产占比：</view>
            <textarea class="fund-textarea"
                      auto-height
                      placeholder="每行输入一个百分比"
                      placeholder-style="color: #bcbcbc;"
                      v-model="proportion" />
            </view>
          <view class="uni-form-item">
            <view class="form-title">各资产涨跌幅：</view>
            <textarea class="fund-textarea" auto-height placeholder="每行输入一个涨跌幅度" placeholder-style="color: #bcbcbc;" v-model="changePercent"/>
          </view>
          <view class="uni-form-item form-btns">
            <button form-type="submit">开始计算</button>
            <button form-type="reset" type="default">清空数据</button>
          </view>
        </form>
        <view class="count-result" v-if="finish">
          <view  v-if="proportionList.length">资产份数：{{proportionList.length}}</view>
          <view  v-if="changeList.length">涨跌幅个数：{{changeList.length}}</view>
          <view>计算结果：{{countResult}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.net-value {
  .panel-header {
    color: #dd890c;
    text-align: center;
  }
  .panel-container {
    .uni-form-item {
      margin-top: 20rpx;
      &:first-child {
        margin-top: 0;
      }
      .fund-textarea {
        margin-top: 16rpx;
      }
    }
    .form-btns {
      button {
        margin-top: 10rpx;
        &:first-child {
          margin-top: 0;
        }
      }
    }
    .count-result {
      margin-top: 30rpx;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      proportion: '',
      changePercent: '',
      proportionList: [],
      changeList: [],
      countResult: null,
      finish: false
    }
  },
  methods: {
    isNumberStr(list) {
      const reg = /^[0-9.]+$/
      return list.some(item => reg.test(item))
    },
    growFormSubmit() {
      this.finish = false
      this.countResult = 0
      this.proportionList = []
      this.changeList = []
      if (!this.proportion.length || !this.changePercent.length) {
        uni.showToast({
          title: "内容不能为空",
          icon: 'none'
        })
        return
      }
      this.proportionList = this.proportion.replace(/\n+/g, ',').replace(/^,/g, '').replace(/,$/g, '').split(',')
      this.changeList = this.changePercent.replace(/\n+/g, ',').replace(/^,/g, '').replace(/,$/g, '').split(',')

      if (!this.isNumberStr(this.proportionList) || !this.isNumberStr(this.changeList)) {
        uni.showToast({
          title: "必须输入数字",
          icon: "none"
        })
        return
      }

      this.proportionList = this.proportionList.map(item => parseFloat(item))
      this.changeList = this.changeList.map(item => parseFloat(item))
      if (this.proportionList.length === this.changeList.length) {
        for (let i = 0; i < this.proportionList.length; i++) {
          this.countResult += this.proportionList[i] * this.changeList[i]
        }
        this.countResult = this.countResult.toFixed(2)
      } else {
        uni.showToast({
          title: "资产份数必须与涨跌幅个数相等"
        })
        return
      }
      this.finish = true
    },
  }

}
</script>