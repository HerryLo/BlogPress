<template>
  <div class="right-time">
    <div class="content-title">🚀运行</div>
    <div class="content-wrapper">
      <div class="currenttime">{{ timeData }}</div>
      <run-time desc="博客已运行："></run-time>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import 'moment/locale/zh-cn';

export default {
  name: "RightTime",
  computed: {
    // 计算属性的 getter
    timeData() {
      const time = `${moment().format('LLLL')}`;
      return time;
    },
  },
};
</script>

<style  lang="stylus">
.right-time {
  width: 100%;
  border: 1px solid #8f8f8f40;
  border-radius: 0.4em;
  margin-bottom: 1em;
}

.right-time .content-title {
  height: 40px;
  line-height: 40px;
  background: #eeeeeebf;
  padding-left: 20px;
  font-size: 15px;
}

.right-time .currenttime {
  margin-bottom: 1rem;
}

.right-time .content-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 10px 10px;
}

.right-time .item {
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
