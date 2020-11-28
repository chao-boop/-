<template>
  <div class="flex1 flex-column">
    <div class="gps">
      <em @click="$router.replace('/')">退出</em>
      <span @click="back()">上一步</span>
      <span>{{$route.meta.title}}</span>
      <div class="user">就诊人：{{$store.state.user}}</div>
    </div>
    <div class="flex1">
      <div class="paySelect">
        <div class="payItem" :class="{'dis':!item.checked}" :style="{'border-color':item.color}" v-for="(item,k) in payList" :key="k" @click="go(item)">
          <div class="iconfont" :class="item.icon"></div>
          <div class="titleBox">
            <div class="title">{{item.title}}</div>
            <div class="subtitle">{{item.subTitle}}</div>
            </div>
        </div>
      </div>
    </div>
    <overtime/>
  </div>
</template>
<script>
export default {
  name: 'paySelect',
  data() {
    return {
      type:'',//挂号or缴费
      cardmoney:0,//医保金额
      codemoney: 0,//现金金额
      payid: '',//订单号
      paytype: '',//支付类型 0，现金 1，电子医保 2，实体医保
      doctor: '',//锁号id
      payList:[
        {
          title:'扫脸',
          subTitle:'支付宝扫脸便捷付款',
          icon:'icon-renlianshibie',
          color:'#0066eb',
          path:'/payAliFace',
          checked:webConfig.isAliFace
        },
        {
          title:'微信',
          subTitle:'微信二维码付款',
          icon:'icon-weixin',
          color:'#67C23A',
          path:'/payWechat',
          checked:webConfig.isWeCode
        },
        {
          title:'支付宝',
          subTitle:'支付宝二维码付款',
          icon:'icon-zhifubao',
          color:'#02a9f1',
          path:'/payAliCode',
          checked:webConfig.isAliCode
        }
      ]
    };
  },
  mounted() {
    this.payid = this.$route.query.payid
    this.paytype = this.$route.query.paytype
    this.doctor = this.$route.query.doctor
    this.cardmoney = Number(this.$route.query.cardmoney)
    this.codemoney = Number(this.$route.query.codemoney)
    this.type = this.$route.query.type
  },
  methods: {
    back(){
      this.$http.clearLock(this.doctor)//点击返回后触发解除锁号
      this.$router.back()
    },
    go(item){
      if(item.checked){
        this.$router.push(item.path+'?type='+this.type+'&payid=' + this.payid + '&paytype=' + this.paytype + '&doctor=' + this.doctor + '&cardmoney='+this.cardmoney+'&codemoney='+this.codemoney)
      } 
    }
  },
  components: {
    'overtime': () => import('@/common/overtime')
  },
  watch: {},
  props: {},
  computed: {},
  //组件销毁事件
  destroyed() {}
};
</script> 