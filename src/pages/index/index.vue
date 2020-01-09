<template>
  <view class="content">
    <view class="duanzi">{{duanzi}}</view>
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
      this.$xhr.post('getInterestingWords').then(res => {
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
  min-height: 400rpx;
  padding: 80rpx 0; 
}
</style>
