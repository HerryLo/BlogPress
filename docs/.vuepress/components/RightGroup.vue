<template>
  <div class="right-group">
    <div class="item">
      <span class="title">关注微信公号</span>
      <span class="desc"
        >更多干货 <span class="inner">分享</span></span
      >
      <img
        width="100%"
        src="https://didiheng.com/qrcode_for_gh.jpg"
      />
    </div>
    <div class="item">
      <span class="title">有问题可交流</span>
      <span class="desc"
        >扫码备注 <span class="inner">技术交流</span> 欢迎</span
      >
      <img
        width="100%"
        src="https://didiheng.com/IMG_0574.JPG"
      />
    </div>
  </div>
</template>

<script>
export default {
    name: 'RightGroup',
};
</script>

<style  lang="stylus">
.right-group {
  position: fixed;
  right: 100px;
  top: 100px;
  width: 150px;
}

.right-group .item {
  text-align: center;
  font-family: Roboto, Lato, sans-serif;
  margin-bottom: 30px;

  .title {
    display: inline-block;
    color: #2878ff;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .desc {
    display: inline-block;
    color: #333;
    font-size: 11px;
    margin-bottom: 10px;
  }
}
</style>
