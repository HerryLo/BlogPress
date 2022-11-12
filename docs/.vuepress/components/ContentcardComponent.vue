<template>
  <div class="fontcard">
    <div
      class="cardwrapper"
      v-for="(item, index) in cardList"
      v-bind:key="item.title"
      @click="clickCard(index)"
    >
      <div class="left">
        <div
          class="icon"
          :style="{ backgroundImage: `url(${item.icon})` }"
        ></div>
      </div>
      <div class="right">
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentcardComponent",
  data() {
    return {
      cardList: [
        {
          title: "技术博文",
          desc: "前端基础技术博文",
          icon: "/image/webfront.png",
        },
        {
          title: "React框架",
          desc: "React框架相关技术",
          icon: "/image/favicon.png",
        },
        {
          title: "数据结构",
          desc: "C语言数据结构实现",
          icon: "/image/favicon1.png",
        },
        {
          title: "网络协议",
          desc: "TCP/UDP网络分享",
          icon: "/image/network.png",
        },
        {
          title: "原理解析",
          desc: "前端代码原理解析",
          icon: "/image/yuanma.png",
        },
        {
          title: "个人分享",
          desc: "个人想法随笔分享",
          icon: "/image/fenxiang.png",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    clickCard: function(index) {
      const child = document.querySelector('.sidebar-links').children[index];
      child && child.querySelector("a").click();
      setTimeout(() => {
        child.querySelector("ul>li>a").click();
      }, 80);
    },
  },
};
</script>

<style lang="stylus">
.fontcard {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap
    .cardwrapper {
      background: #fff;
      border: 1px solid rgba(0,0,0,.05);
      border-radius: 12px;
      padding: 25px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor pointer
      flex: 1 1;
      margin: 15px 20px 10px 0;
      .icon {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        margin-right: 20px;
        background-size: cover;
        background-position: 50%;
        // background-image: url(https://pixso-public.oss-accelerate.aliyuncs.com/cmt-plugin-icon/vT-xug_9YUeY9PXuh75TfQ?1663882320);
      }
      .right {
        width: calc(100% - 76px);
      }
      .title {
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #000;
        margin-bottom: 4px;
      }
      .desc {
        font-size: 14px;
        line-height: 22px;
        color: rgba(0,0,0,.8);
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .cardwrapper:hover {
      box-shadow: 0 1px 3px rgba(0,0,0, 0.01), 0 0 6px rgba(0,0,0, 0.06), 0 8px 16px rgba(0,0,0, 0.06);
    }
}
</style>
