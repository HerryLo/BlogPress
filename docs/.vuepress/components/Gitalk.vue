<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script>
export default {
  name: "Gitalk",
  data() {
    return {};
  },
  mounted: function () {
    let body = document.querySelector(".gitalk-container");
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/gitalk@1.8.0/dist/gitalk.min.js";
    body.appendChild(script);
    script.onload = () => {
      const commentConfig  = new Gitalk({
        clientID: "6e6f0a068cbd14cc8791",
        clientSecret: "4792077586eb060927834c7cc483bc91a5d85308",
        repo: "BlogPress", // The repository of store comments,
        owner: "Herrylo",
        admin: [
          "Herrylo",
        ],
        id: location.pathname, // Ensure uniqueness and length less than 50
        distractionFreeMode: false, // Facebook-like distraction free mode
      });

      const gitalk = new Gitalk(commentConfig);
      gitalk.render("gitalk-container");
    };
  },
};
</script>

<style lang="stylus">
    .gitalk-container
        max-width: 800px
        margin-left: 2em
</style>
