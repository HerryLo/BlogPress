<template>
  <div class="right-links">
    <div class="content-title">😁友链</div>
    <div class="content-wrapper">
      <div class="link-item" v-for="(item) in dataList" v-bind:key="item.name">
        <div>
          <a
            class="link-name"
            target="_blank"
            :href="item.blog"
          >{{item.name}}</a>
        </div>
        <a
          class="link"
          target="_blank"
          :href="item.link"
        >{{item.link}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightLinks",
  data: () => {
    return {
      dataList: [
        {
          name: "Abin tools",
          link: "https://web-abin.gitee.io/abin-web/tools",
          blog: "http://web-abin.gitee.io/blog/",
        },
        {
          name: "Sky's blog",
          link: "https://www.iceice.top/",
          blog: "https://www.iceice.top/",
        },
        {
          name: "衔蝉 Blog",
          link: "https://www.xianchan.ah.cn",
          blog: "https://www.xianchan.ah.cn",
        },
        {
          name: "blogweb",
          link: "https://blogweb.cn/",
          blog: "https://blogweb.cn/",
        },
        {
          name: "krimeshu",
          link: "https://blog.krimeshu.com/",
          blog: "https://blog.krimeshu.com/",
        },
        {
          name: "Tsix's 编程日记",
          link: "https://www.tsix.top/",
          blog: "https://www.tsix.top/",
        }
      ],
    };
  },
};
</script>

<style scoped>
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

.right-links .link-item {
  margin-bottom: 0.41rem;
}

.right-links .content-wrapper {
  padding: 10px;
}

.right-links .link-name {
  color: #2c3e50;
}

.right-links .link {
  width: 77%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #3eaf7c;
}
</style>
