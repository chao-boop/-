<template>
  <div class="flex1 flex-column">
    <div class="gps">
      <em @click="cancel()">退出</em>
      <!-- <span @click="$router.back()">上一步</span> -->
      <span>{{$route.meta.title}}</span>
      <div class="user">就诊人：{{$store.state.user}}</div>
    </div>
    <div class="flex1 flex box center">
      <div style="margin:0 auto;" class="pay">
        <div v-if="step===20">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="code"></div>
                <div class="dialog-small gmt">
                  请将
                  <span class="danger">付款码</span>放置在扫码区
                </div>
                <div class="dialog-small gmt">
                  支付金额：
                  <span class="cashMoney">{{codemoney}}</span>
                </div>
                <input v-focus ref="input" class="input" v-model="code" @keyup="getCode" />
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="info" class="gmt" style="width:100%;" @click="cancel()">取消支付</el-button>
          </el-button-group>
        </div>
        <div v-if="step===21">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="el-icon-loading"></div>
                <div class="dialog-small gmt">现金支付中...</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step===22">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-jinggao"></div>
                <div class="dialog-small gmt">现金支付失败</div>
                <div class="dialog-small danger">{{cashMsg}}</div>
              </div>
            </div>
          </div>
          <el-button-group>
            <!-- <el-button type="primary" class="gmt" style="width:50%;" @click="step=20">重新扫码</el-button> -->
            <el-button type="info" class="gmt" style="width:100%;" @click="cancel()">关闭</el-button>
          </el-button-group>
        </div>
        <div v-if="step===23">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-jinggao"></div>
                <div class="dialog-small gmt">现金支付通知失败</div>
                <div class="dialog-small gmt success">
                  已原路退回现金
                  <span class="cashMoney">{{codemoney}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="primary" class="gmt" style="width:100%;" @click="cancel()">确认</el-button>
          </el-button-group>
        </div>
        <div v-if="step===24">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-jinggao"></div>
                <div class="dialog-small gmt">现金支付通知失败</div>
                <div class="dialog-small gmt danger">
                  请联系工作人员退回现金
                  <span class="cashMoney">{{codemoney}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="primary" class="gmt" style="width:100%;" @click="cancel()">确认</el-button>
          </el-button-group>
        </div>
        <div v-if="step===30">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="el-icon-loading"></div>
                <div class="dialog-small gmt">医保支付中...</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step===31">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-jinggao"></div>
                <div class="dialog-small gmt">实体医保卡支付失败</div>
                <div class="dialog-small gmt success">
                  已原路退回现金
                  <span class="cashMoney">{{codemoney}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="primary" class="gmt" style="width:100%;" @click="cancel()">确认</el-button>
          </el-button-group>
        </div>
        <div v-if="step===32">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-jinggao"></div>
                <div class="dialog-small gmt">实体医保卡支付失败</div>
                <div class="dialog-small gmt danger">
                  请联系工作人员退回现金
                  <span class="cashMoney">{{codemoney}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="primary" class="gmt" style="width:100%;" @click="cancel()">确认</el-button>
          </el-button-group>
        </div>
        <div v-if="step===33">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-jinggao"></div>
                <div class="dialog-small gmt">现金+实体医保支付通知失败</div>
                <div class="dialog-small gmt success">
                  已原路退回现金
                  <span class="cashMoney">{{codemoney}}</span>
                </div>
                <div class="dialog-samll danger">
                  请联系工作人员退医保金额
                  <span class="cashMoney">{{cardmoney}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="primary" class="gmt" style="width:100%;" @click="cancel()">确认</el-button>
          </el-button-group>
        </div>
        <div v-if="step===34">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-jinggao"></div>
                <div class="dialog-small gmt">现金+实体医保支付通知失败</div>
                <div class="dialog-small gmt danger">
                  请联系工作人员退现金
                  <span class="cashMoney">{{codemoney}}</span>和医保金额
                  <span class="cashMoney">{{cardmoney}}</span>
                </div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="primary" class="gmt" style="width:100%;" @click="cancel()">确认</el-button>
          </el-button-group>
        </div>
        <div v-if="step===40">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="el-icon-loading"></div>
                <div class="dialog-small gmt">支付通知中...</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step===41">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="el-icon-loading"></div>
                <div class="dialog-small gmt">现金退款中....</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step===51">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="el-icon-loading"></div>
                <div class="dialog-small gmt">支付凭条订单中...</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step===52">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-zhifuchenggong"></div>
                <div class="dialog-small gmt">支付凭条打印成功!</div>
                <div class="dialog-small danger" v-if="paytype=='2'">请取走实体医保卡！</div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="success" class="gmt" style="width:100%;" @click="$router.replace('/')">确认</el-button>
          </el-button-group>
        </div>
        <div v-if="step===53">
          <div class="dialog">
            <div class="dialog-item">
              <div>
                <div class="iconfont icon-zhifuchenggong"></div>
                <div class="dialog-small gmt">支付成功</div>
                <div class="dialog-small danger">支付凭条打印失败！</div>
                <div class="dialog-small danger" v-if="paytype=='2'">请取走实体医保卡！</div>
              </div>
            </div>
          </div>
          <el-button-group>
            <el-button type="primary" class="gmt" style="width:100%;" @click="$router.replace('/')">确认</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <overtime/>
  </div>
</template>
<script>
/*
20请将支付码放置在感应区21支付验证中,22扫码支付失败23现金支付通知失败退现金成功24现金支付通知失败退现金失败
30实体医保支付中31实体医保支付失败自动退现金成功32实体医保支付失败自动退现金失败33现金+实体医保支付通知失败自动退现金成功34现金+实体医保支付通知失败自动退现金失败
40支付通知中41现金退款中
51收费凭条打印中52收费凭条打印成功53收费凭条打印失败
*/
export default {
  name: 'payWechat',
  data() {
    return {
      codeCheck: true, //二维码识读开关，防止重复提交ajax
      code: "", //识别得电子健康码字符串内容
      cashMsg: '',//现金支付失败描述
      cardMsg: '',//医保失败描述
      step: 20,
      type: '',//缴费类型，有guahao和jiaofei
      cardmoney: 0,//医保金额
      codemoney: 0,//现金金额
      payid: '',//订单号
      paytype: '',//1是支付扫脸,2支付宝扫码，3微信扫码
      doctor: '',//锁号id
      isYB: 0,//是否医保支付成功,0纯现金支付,1医保支付成功2医保支付失败
    };
  },
  mounted() {
    this.payid = this.$route.query.payid
    this.paytype = this.$route.query.paytype
    this.doctor = this.$route.query.doctor
    this.cardmoney = Number(this.$route.query.cardmoney)
    this.codemoney = Number(this.$route.query.codemoney)
    this.type = this.$route.query.type
    this.$refs.input.focus()
    document.onclick = () => {
      this.$refs.input.focus()
    };
  },
  methods: {
    //获取付款码
    getCode(e) {
      if (e.keyCode == 13) {
        if (this.codeCheck) {
          this.codeCheck = false
          this.goPay()
        }
      }
    },
    //现金支付
    goPay() {
      this.step = 21
      this.cashMsg = ''
      this.$http.post(false, '支付中...', '/Pay/Payment', {
        payId: this.payid,
        paymengType: 3,//现金支付类型  1是扫脸,2支付宝，3微信
        authIdentity: this.code,
        total: this.cardmoney + this.codemoney,
        cash: this.codemoney
      }).then(res => {
        if (res.status) {
          if (this.paytype > 0) {//现金支付成功后判断是否还需医保支付
            this.keep()
          } else {//如果不需要继续医保支付，则执行支付通知his
            this.payBack()
          }
        } else {
          this.cashMsg = res.message
          this.step = 22
        }
      })
    },
    //现金支付成功后通知失败的退费
    refund() {
      this.step = 41
      this.$http.post(false, '现金退款中...', '/PayService/TradeRefund', {
        tradeNo: this.payid,
        refundAmount: this.codemoney,
        requestNo: this.payid
      }).then(res => {
        if (res.status) {
          switch (this.isYB) {
            case 0:
              //现金支付成功后，通知his失败自动退现金成功
              this.step = 23
              break;
            case 2:
              //实体医保支付失败自动退现金成功
              this.step = 31
              break;
            case 1:
              //现金+实体医保支付通知失败自动退现金成功
              this.step=33
              break;
          }
        } else {
          switch (this.isYB) {
            case 0:
              //现金支付成功后，通知his失败自动现金失败
              this.step = 24
              break;
            case 2:
              //实体医保支付失败自动退现金失败
              this.step = 32
              break;
            case 1:
              //现金+实体医保支付通知失败自动退现金失败
              this.step=34
              break;
          }
        }
      })
    },
    //继续医保支付
    keep() {
      this.cardMsg = ''
      this.step = 30
      this.$http.post(false, '医保扣费中...', '/YiBao/YiBaoPayment', {
        yiBaoType: parseInt(this.paytype),
        payId: this.payid
      }).then(res => {
        if (res.status) {
          this.isYB = 1
          this.payBack()
        } else {//医保支付失败
          this.isYB = 2
          this.refund()
        }
      })
    },
    //取消锁号
    clearLock() {
      if (this.type == 'guahao' && this.doctor) {
        this.$http.clearLock(this.doctor)
      }
    },
    //取消支付
    cancel() {//因为挂号和缴费都共用该接口，所以当用户取消支付的时候，有锁号id存在的话就取消锁号
      if (this.type == 'guahao' && this.doctor) {
        this.$http.clearLock(this.doctor)
      }
      this.$router.replace('/')
    },
    payBack() {
      this.step = 40
      this.$http.post(false, '', '/Pay/Notify', {
        payId: this.payid,
        total: this.cardmoney + this.codemoney,
        medicalInsurance: this.cardmoney,
        paymentType: 3,
        cash: this.codemoney
      }).then(res => {
        if (res.status) {
          if (this.type == 'guahao') {
            this.doctor = ''//支付成功，取消锁号
          }
          this.printOrder()
        } else {//支付通知失败走现金退款
          this.clearLock()
          this.refund()
        }
      })
    },
    printOrder() {
      this.step = 51
      this.$http.post(false, '打印收费凭条', '/Pay/PrintResult', {
        PayId: this.payid
      }).then(res => {
        if (res.status) {
          this.step = 52
        } else {
          this.step = 53
        }
      })
    },
  },
  components: {
    'overtime': () => import('@/common/overtime')
  },
  watch: {
    step(n, o) {
      if (n === 20) {
        this.code = ''
        this.codeCheck = true
        this.$nextTick(() => {
          this.$refs.input.focus()
          document.onclick = () => {
            this.$refs.input.focus()
          };
        })
      } else {
        document.onclick = null;
      }
    }
  },
  props: {},
  computed: {},
  //自定义指令
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  },
  //组件销毁事件
  destroyed() {
    document.onclick = null;
  }
};
</script>