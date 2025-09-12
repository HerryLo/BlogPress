<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

export default {
  name: 'Comment',
  data() {
    return {};
  },
  mounted() {
    const commentConfig = {
      clientID: '6e6f0a068cbd14cc8791',
      clientSecret: 'cb31261739c5f1897c5e183611878a1ae55e9213',
      repo: 'BlogPress',
      owner: 'HerryLo',
      // 这里接受一个数组，可以添加多个管理员
      admin: ['HerryLo'],
      // id 用于当前页面的唯一标识，一般来讲 pathname 足够了，
      
      // 但是如果你的 pathname 超过 50 个字符，GitHub 将不会成功创建 issue，此情况可以考虑给每个页面生成 hash 值的方法.
      id: location.pathname,
      distractionFreeMode: false,
    };
    const gitalk = new Gitalk(commentConfig);
    gitalk.render('gitalk-container');
  },
};
</script>
<style lang="stylus">
</style>