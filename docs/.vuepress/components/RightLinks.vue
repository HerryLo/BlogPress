<template>
  <div class="right-links">
    <div class="content-title">😁友链</div>
    <div class="content-wrapper">
      <div>
        <a class="link-name" target="_blank"  href="http://web-abin.gitee.io/blog/"
          >Abin tools</a
        >
      </div>
      <a class="link" target="_blank" href="https://web-abin.gitee.io/abin-web/tools"
        >https://web-abin.gitee.io/abin-web/tools</a
      >
    </div>
  </div>
</template>

<script>
// import moment from "moment";
// import 'moment/locale/zh-cn';

export default {
  name: "RightLinks",
  computed: {
    // 计算属性的 getter
  },
};
</script>

<style  lang="stylus">
.right-links {
  width: 100%;
  border: 1px solid #8f8f8f40;
  border-radius: 0.4em;
  margin-bottom: 1em;
}

.right-links .content-title {
  height: 40px;
  line-height: 40px;
  background: #eeeeeebf;
  padding-left: 20px;
  font-size: 15px;
}

.right-links .content-wrapper {
  // display: flex;
  // flex-wrap: wrap;
  padding: 10px 10px 10px 10px;
}


.right-links .link-name {
  color: #2c3e50
}
.right-links .link {
  width: 77%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
