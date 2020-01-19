<template>
  <view class="right-price">
    <view class="panel">
      <view class="panel-header">资产合理价格区间</view>
      <view class="panel-container">
        <form @submit="priceFormSubmit"
              @reset="priceFormReset">
          <view class="uni-form-item">
            <view class="form-title">预估PE下限：</view>
            <input class="form-input"
                   placeholder-style="color: #bcbcbc;"
                   v-model="priceForm.lowPe"
                   type="digit"
                   @blur="validateFormItem(priceForm.lowPe)" />
          </view>
          <view class="uni-form-item">
            <view class="form-title">预估PE上限：</view>
            <input class="form-input"
                   placeholder-style="color: #bcbcbc;"
                   v-model="priceForm.heightPe"
                   type="digit"
                   @blur="validateFormItem(priceForm.heightPe)" />
          </view>
          <view class="uni-form-item">
            <view class="form-title">可持续的期限（年）：</view>
            <input class="form-input"
                   placeholder-style="color: #bcbcbc;"
                   v-model="priceForm.timeLimit"
                   type="digit"
                   @blur="validateFormItem(priceForm.timeLimit)" />
          </view>
          <view class="uni-form-item">
            <view class="form-title">成长率：</view>
            <input class="form-input"
                   placeholder-style="color: #bcbcbc;"
                   v-model="priceForm.growRate"
                   type="digit"
                   @blur="validateFormItem(priceForm.growRate)" />
          </view>
          <view class="uni-form-item">
            <view class="form-title">当前每股收益：</view>
            <input class="form-input"
                   placeholder-style="color: #bcbcbc;"
                   v-model="priceForm.unitBenefit"
                   type="digit"
                   @blur="validateFormItem(priceForm.unitBenefit)" />
          </view>
          <view class="uni-form-item form-btns">
            <button form-type="submit">开始计算</button>
            <button form-type="reset"
                    type="default">清空数据</button>
          </view>
        </form>
        <view class="count-result"
              v-if="finish">
          <view>合理价格区间：{{downPrice}} — {{upPrice}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.right-price {
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
      .form-input {
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
      priceForm: {
        lowPe: 20,
        heightPe: 30,
        timeLimit: 1,
        growRate: 0.3,
        unitBenefit: '',
        validated: true
      },
      downPrice: 0,
      upPrice: 0,
      finish: false
    }
  },
  methods: {
    isEmpty(value) {
      return value === ''
    },
    isNumber(value) {
      const reg = /^(\-|\+)?\d+(\.\d+)?$/
      return reg.test(value)
    },
    checkEmpty(value, tips) {
      if (this.isEmpty(value)) {
        uni.showToast({
          title: tips,
          icon: 'none'
        })
        return false
      }
      return true
    },
    checkNumber(value, tips) {
      if (!this.isNumber(value)) {
        uni.showToast({
          title: tips,
          icon: 'none'
        })
        return false
      } else {
        value = Number(value)
      }
      return true
    },
    validateFormItem(value) {
      return this.checkEmpty(value, '内容不能为空')
      return this.checkNumber(value, '内容必须是数字')
    },
    priceFormSubmit() {
      if (!this.validateFormItem(this.priceForm.lowPe)) return
      if (!this.validateFormItem(this.priceForm.heightPe)) return
      if (!this.validateFormItem(this.priceForm.timeLimit)) return
      if (!this.validateFormItem(this.priceForm.growRate)) return
      if (!this.validateFormItem(this.priceForm.unitBenefit)) return

      this.finish = false
      this.downPrice = 0
      this.upPrice = 0
      const futureUnitBenefit = (this.priceForm.unitBenefit * Math.pow((1 + Number(this.priceForm.growRate)), this.priceForm.timeLimit)).toFixed(2)
      this.downPrice = (this.priceForm.lowPe * futureUnitBenefit).toFixed(2)
      this.upPrice = (this.priceForm.heightPe * futureUnitBenefit).toFixed(2)
      this.finish = true
    },
    priceFormReset() {
      this.finish = false
    }
  }
}
</script>