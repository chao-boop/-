<template>
  <div class="fixed" v-if="overCheck">{{step}}</div>
</template>
<script>
let c;
export default {
  name: 'overtime',
  data() {
    return {
      step: 0,
      startTime: 0,
      overCheck:false
    };
  },
  mounted() {
    console.log('倒计时组件挂载成功')
  
    if (webConfig.overCheck) {
      this.overCheck=webConfig.overCheck
      this.startTime = JSON.parse(JSON.stringify(webConfig.overTime))
      this.step = JSON.parse(JSON.stringify(webConfig.overTime))
      c = setInterval(() => {
        if (this.step > 1) {
          webConfig.overTime -= 1
          this.step = JSON.parse(JSON.stringify(webConfig.overTime))
        } else {
          clearInterval(c)
          webConfig.overTime = JSON.parse(JSON.stringify(this.startTime))
          this.$router.replace('/')
        
        }
      }, 1000);
    }

  },
  methods: {},
  components: {},
  watch: {},
  props: {
    // verify:Boolean,
  },
  computed: {},
  //缓存组件
  activated() { },
  //组件销毁
  destroyed() {
    clearInterval(c)
    webConfig.overTime = JSON.parse(JSON.stringify(this.startTime))
    console.log('倒计时组件销毁成功')
  }
};
</script>
