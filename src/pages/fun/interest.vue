<template>
  <view class="content">
    <view class="duanzi"><span v-text="duanzi"></span></view>
    <a class="title"
          @click="getInterestingWords">{{title}}</a>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "换一个",
      duanzi: ''
    };
  },
  mounted() {
    this.getInterestingWords()
  },
  methods: {
    getInterestingWords() {
      this.$xhr.post('fun:getInterestingWords').then(res => {
        const data = res.var
        this.duanzi = data.duanzi[0].content
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
}
.title {
  font-size: 16px;
  color: #8f8f94;
}
.duanzi{
  min-height: 600rpx;
  padding: 80rpx 20rpx; 
  font-size: 16px;
}
</style>
