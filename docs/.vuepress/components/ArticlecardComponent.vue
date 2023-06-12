<template>
  <div class="ArtCard">
    <div class="cardLists" v-for="(item, index) in list" v-bind:key="item.path">
      <div class="createtime">{{ item.frontmatter.createDate }}</div>
      <a class="itemCard" v-bind:href="item.path">
        <div class="title" v-bind:href="item.path">
          <div>{{ item.frontmatter.title }}</div>
        </div>
        <div class="desc">
          <!-- <span v-for="slug in item.headers" v-bind:key="slug">{{slug.slug}}</span> -->
        </div>
        <div class="line-height" v-if="index !== list.length - 1"></div>
        <!-- <div class="detail tags">
          <div
            class="tag"
            v-bind:key="tage"
            v-for="tage in item.frontmatter.tagList"
          >
            {{ tage }}
          </div>
        </div> -->
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlecardComponent",
  data() {
    return {
      list: [],
      path: this.type,
      typeDesc: this.desc,
      sidebarIndex: this.index,
    };
  },
  props: ["type", "desc", "index"],
  mounted() {
    const $site = this.$site;
    const pages = $site.pages;
    const themeConfig = $site.themeConfig;
    const sidebar = themeConfig.sidebar;
    const currentSidebar = sidebar[`/${this.path}/`];

    // console.log(this);

    let sidebarList = [];
    // console.log(currentSidebar)
    if (currentSidebar[0] instanceof Object && this.path == "front") {
      // 二维数组 font页面
      sidebarList = sidebarList.concat(
        currentSidebar[this.sidebarIndex].children
      );
    } else {
      sidebarList = sidebarList.concat(currentSidebar);
    }

    try{
    const list = [];
    console.log(sidebarList);
    // console.log(pages);
    sidebarList.forEach((item) => {
      let page = null;
       if (item instanceof Array){
        page = pages.filter((page) => page.regularPath.includes(item[0]));
      } else if (item instanceof Object) {
        const path = item.path;
        console.log(path)
        const date = path instanceof Array ? path[0].split("/") : path.split("/").pop();
        page = pages.filter((page) => page.regularPath.includes(date));
      } else if (item && typeof item === "string") {
        page = pages.filter((page) => page.regularPath.includes(item));
      }
      if (page && page.length) {
        const frontmatter = page[0].frontmatter;
        frontmatter.createDate = frontmatter.date;
        list.push(page[0]);
      }
    });
    this.list = list;
    }catch(e){}
  },
  methods: {},
};
</script>

<style lang="stylus">
.ArtCard {
  margin-left: 50px;
}

.cardLists {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

.createtime {
  color: #3eaf7c;
  font-size: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 10px;
}
.createtime:first-child {
  // color: #e33131
}
.createtime::before {
  content: '🍅';
  display: inline-block;
  border-radius: 50%;
  margin-right: 4px;
  cursor: pointer;
}

.createtime::after {
  content: '👉';
  display: inline-block;
  cursor: pointer;
  position: relative;
  top: -3px;
  left: 5px;
}

.line-height {
  border-radius: 2px;
  height: 51px;
  width: 0.5rem;
  position: absolute;
  top: 37px;
  left: 5px;
  background-color: #eee;
}

.itemCard {
  padding: 10px 10px;
  padding-left: 20px;
  border-radius: 10px;
  margin: 8px 5px;
  box-shadow: 0px 0px 5px 1px #eee;
  display: block;

  .title {
    font-weight: 700;
    color: #000;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .desc {
    color: #eee;
  }

  .detail {
    color: #aaa;
    margin-top: 10px;
    font-size: 14px;
  }

  .tags {
    color: #ec4646;
    display: flex;
    align-items: center;

    .tag {
      border-radius: 10px;
      border: 1px solid;
      padding: 2px 5px;
      font-weight: 900;
      font-size: 12px;
      margin-right: 5px;
    }
  }
}

.itemCard:hover {
  background: rgba(215, 232, 224, 1) !important;
}

.itemCard:nth-child(n) {
  background: rgba(215, 232, 224, 1);
}

@media (max-width: 1300px) {
  .ArtCard {
    margin-left: 0px;
  }
}
@media (max-width: 1111px) {
  .createtime,
  .line-height {
    display: none;
  }
}

</style>
