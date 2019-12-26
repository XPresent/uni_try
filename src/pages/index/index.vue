<template>
  <view class="content">
    <view>
      <text class="title">{{title}}</text>
      <view class="duanzi">{{duanzi}}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      duanzi: ''
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: 400rpx;
}
.title {
  font-size: 16px;
  color: #8f8f94;
}
.change {
}
</style>
