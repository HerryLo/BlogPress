<template>
  <div class="timedesc">博客已努力运行了{{ handleTimeData }}天</div>
</template>

<script>
import moment from "moment";

export default {
  name: "RunTime",
  data() {
    return {
      starttime: "2019/08/13",
      time: "",
    };
  },
  beforeDestroy() {},
  computed: {
    // 计算属性的 getter
    handleTimeData() {
      // `this` 指向 vm 实例
      return moment().diff(moment(this.starttime), "days");
    },
  },
  methods: {
    timeInterval() {
      this.timer = setInterval(() => {
        const day = moment().diff(moment(this.starttime), "seconds");
        this.day = day;
      }, 1000);
    },
  },
};
</script>

<style lang="stylus">
.timedesc
    color: #4abf8a;
    font-weight: 800;
</style>
