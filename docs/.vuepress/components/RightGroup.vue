<template>
  <div class="right-group">
    <div class="content-title">🚀小程序&公众号</div>
    <div class="content-wrapper">
      <div class="item">
        <img width="100%" src="https://herrylo.github.io/image/gh_blog.jpg" />
      </div>
      <div class="item">
        <img
          width="75%"
          src="https://herrylo.github.io/image/qrcode_for_gh.jpg"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightGroup",
};
</script>

<style  lang="stylus">
.right-group {
  width: 100%;
  border: 1px solid #8f8f8f40;
  border-radius: 0.4em;
  margin-bottom: 1em;
}

.right-group .content-title {
  height: 40px;
    line-height: 40px;
    background: #eeeeeebf;
    padding-left: 20px;
    font-size: 15px;
}

.right-group .content-wrapper {
  display: flex;
  padding: 20px 10px 0 10px;
}

.right-group .item {
  text-align: center;
  font-family: Roboto, Lato, sans-serif;

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
