<template>
  <div class="right-obort">
    <div class="content-title">🚀关于</div>
    <div class="content-wrapper">
      <a
        :href="item.path"
        target="_blank"
        v-for="(item, index) in iconList"
        v-bind:key="index"
      >
        <div
          class="shield-item"
          data-id="zhihu"
          :style="{ 'border-color': item.color }"
        >
          <img :src="item.iconurl" :alt="item.name" />

          <div class="col-7" :style="{ 'color': item.color }">{{item.name}}</div>
          <div
            class="col align-self-end shield-number"
            id="shield-number-zhihu"
            :style="{ 'background-color': item.color }"
          >{{item.emoji}}</div>
        </div>
      </a>

      <!-- <a href="https://github.com/HerryLo" target="_blank">
        <div
          class="shield-item"
          data-id="github"
          style="border-color: rgb(24, 23, 23)"
        >
          <img src="/image/github.svg" alt="github" />
          <div class="col-7" style="color: rgb(24, 23, 23)">GitHub</div>
          <div
            class="col align-self-end shield-number"
            id="shield-number-github"
            style="background-color: rgb(24, 23, 23)"
          ></div>
        </div>
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "RightObort",
  data() {
    return {
      iconList: [
        {
          iconurl: "/image/github.svg",
          name: "GitHub",
          path: "https://github.com/HerryLo",
          color: "rgb(24, 23, 23)",
          emoji: '🚀🚀🚀🚀'
        },
        {
          iconurl: "/image/juejin.svg",
          name: "掘金",
          path: "https://juejin.cn/user/430664289365608",
          color: " #1e80ff",
          emoji: '🚀🚀🚀😄'
        },
        {
          iconurl: "/image/yuque.svg",
          name: " 语雀",
          path: "https://www.yuque.com/yopai",
          color: "#2ac15b",
          emoji: '🚀🚀😄😄'
        },
        {
          iconurl: "/image/sf.svg",
          name: "segmentfault",
          path: "https://segmentfault.com/u/herrylo",
          color: "#00965e",
          emoji: '🚀😄😄😄'
        },
        {
          iconurl: "/image/zhihu.svg",
          name: "知乎",
          path: "https://www.zhihu.com/people/liu-heng-88-71",
          color: "rgb(0, 117, 210)",
          emoji: '😄😄😄😄 '
        }
      ],
    };
  },
};
</script>

<style lang="stylus">
.right-obort {
  width: 100%;
  border: 1px solid #8f8f8f40;
  border-radius: 0.4em;
  margin-bottom: 1em;
}

.right-obort .content-title {
  height: 40px;
    line-height: 40px;
    background: #eeeeeebf;
    padding-left: 20px;
    font-size: 15px;
}

.right-obort .content-wrapper {
  display: block;
  padding: 8px 10px 0 10px;
}

.shield-item {
  border-style: solid;
  border-radius: 0.25rem;
  border-width: 2px;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  margin: 0.5rem 0;
  // padding: 0.3rem;
  height: 2rem;
}
svg {
  overflow: hidden;
  vertical-align: middle;
  flex: 0 0 auto;
}
.col-7 {
  width: 59%;
    text-align: center;
}
.shield-number {
  text-align: right;
  padding: 0.25rem 0.5rem;
  text-overflow: hidden;
  color: #FFF;
  height: 90%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
