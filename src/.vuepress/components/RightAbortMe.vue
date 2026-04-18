<template>
  <div class="right-time">
    <div class="content-title">🥰Me</div>
    <div class="content-wrapper">
        <p>武汉工作，会点Web，擅长Javascript.</p>
        <p>技术或工作问题交流，可联系微信：<i>1169170165</i>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightAbortMe",
};
</script>

<style scoped>
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
  padding: 10px;
}

.right-time .content-wrapper p {
  margin: 5px 0;
  color: #2c3e50;
}

.right-time .content-wrapper i {
  color: #3eaf7c;
  font-style: normal;
}
</style>
