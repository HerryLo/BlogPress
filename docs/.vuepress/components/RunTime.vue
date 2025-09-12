<template>
  <div class="timedesc">{{desc}}{{ intervalTime }}</div>
</template>

<script>
// 运行时间组件
import moment from "moment";

export default {
  name: "RunTime",
  data() {
    return {
      starttime: "2018/12/27 00:00:00",
      time: null,
      intervalTime: '--天--时--分--秒'
    };
  },
  props: ['desc'],
  mounted() {
    this.timeInterval();
  },
  beforeDestroy() {
    // console.log('销毁运行时间组件')
    clearInterval(this.timer);
  },
  methods: {
    timeInterval() {
      this.timer = setInterval(() => {
        // console.log(this.intervalTime);
        const start = moment(this.starttime).valueOf();
        const current = moment().valueOf();
        const time = parseInt((current - start)/1000/60/60/24) // 天
        const time1 = parseInt((current - start)/1000/3600) // 时
        const time2 = parseInt((current - start)/1000/60) // 分
        const time3 = parseInt((current - start)/1000) // 秒
        const result = `${time}天${time1 - time*24}时${time2 - time1*60}分${time3 - time2*60}秒`;
        this.intervalTime = result;
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
