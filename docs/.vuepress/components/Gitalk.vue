<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script>
import Gitalk from 'gitalk'

export default {
  name: "Gitalk",
  data() {
    return {};
  },
  mounted: function () {
    let body = document.querySelector(".gitalk-container");
    let script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js";
    body.appendChild(script);
    script.onload = () => {
      const commentConfig  = new Gitalk({
        clientID: "22e32fc1121658ba0b1d",
        clientSecret: "64731a84c1c4d875de285608adc0eb400908897a",
        repo: "BlogPress", // The repository of store comments,
        owner: "HerryLo",
        admin: [
          "HerryLo",
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
