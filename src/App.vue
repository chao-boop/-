<template>
  <div id="app">
    <el-container>
      <el-header id="head">
        <div class="siteName">{{ siteName }}</div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer id="foot">
        <el-row type="flex"  justify="center">
          <el-col :span="7"><div>技术支持：{{company}}</div></el-col>
          <el-col :span="8" class="gtc"><div>终端编号：{{number}}</div></el-col>
          <el-col :span="8" class="gtb"><div>{{ time }}</div></el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      siteName: "",
      company:"",
      number:"",
      time: "",
      date: "",
    };
  },

  mounted() {
    this.siteName=webConfig.appName;
    this.company=webConfig.company;
    this.number=webConfig.number;
    this.time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
    this.date = this.$moment().format("dddd");
    setInterval(() => {
      this.time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      this.date = this.$moment().format("dddd");
    }, 1000);
  },
};
</script>