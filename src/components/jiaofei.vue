<template>
  <div class="flex1 flex-column">
     <el-row type="flex" justify="center" class="gps">
      <el-col :span="12" class="user">{{$route.meta.title}}</el-col>
      <el-col :span="12" class="gtb"
        ><el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="$router.replace('/')"
          >上一步</el-button
        >  <el-button type="primary"   @click="$router.replace('/')"
          >返回首页</el-button></el-col>
    </el-row>
     <el-row type="flex" justify="center">
        <el-col :span="24">

      <el-row class="row-bg marginbotton background">
        <el-col :span="8"  class="">就诊人：{{$store.state.user}}</el-col>
        <el-col :span="8" class="gtc">卡号：</el-col>
        <el-col :span="7" class="gtc">倒计时：<overtime /></el-col>
      </el-row>
        </el-col>
    </el-row>
    <el-table :data="data" height="250" header-cell-class-name="tableHeader" default-expand-all highlight-current-row v-loading="tableLoading">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row style="margin-bottom:10px;" :gutter="20" type="flex" v-for="(item,k) in scope.row.getPrescriptionData" :key="k">
            <el-col :span="24">{{item.prescriptionName}}</el-col>
            <el-col style="width:240px;">
              <span class="money">{{item.totalPrice}}</span>
            </el-col>
            <el-col style="width:180px;">
              <el-button type="primary" :loading="loading" @click="detailsShow(item.prescriptionName,item.prescriptionId)">费用清单</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="150" prop="treatmentDate" />
      <el-table-column label="就诊类型" prop="treatmentTypeName" show-overflow-tooltip />
      <el-table-column label="流水号" prop="treatmentId" width="180px" />
      <el-table-column label="总金额" align="right" width="180px">
        <template slot-scope="scope">
          <div class="money">{{scope.row.totalPrice}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right" width="200px">
        <template slot-scope="scope">
          <el-button type="success" @click="show(scope.$index)">前往缴费</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="title" :visible.sync="modelShow" width="800px" :close-on-click-modal="false" top="0" :close-on-press-escape="false" append-to-body destroy-on-close>
      <el-table :data="detailed" border max-height="1000px">
        <el-table-column label="名称" prop="projectName" show-overflow-tooltip />
        <el-table-column label="单价" width="140" prop="univalence" align="center" />
        <el-table-column label="数量" width="80" prop="amount" align="center" />
        <el-table-column label="单位" width="80" prop="unit" align="center" />
        <el-table-column label="小计" width="180" align="right">
          <template slot-scope="scope">
            <div class="money">{{scope.row.totalPrice}}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="model" width="800px" :close-on-click-modal="false" top="0" :close-on-press-escape="false" :show-close="false" append-to-body @closed="close()" destroy-on-close>
      <div v-if="step===3">
        <el-form label-width="140px">
          <el-form-item label="就诊人">
            <p>{{$store.state.user}}</p>
          </el-form-item>
          <el-form-item label="缴费名称">
            <p>{{previewShow.treatmentTypeName}}</p>
          </el-form-item>
          <el-form-item label="缴费金额">
            <p class="money">{{previewShow.totalPrice}}</p>
          </el-form-item>
          <el-form-item label="支付方式">
            <div class="sex-box">
              <div class="sex" :class="{'active':payType=='1'}" v-if="isDzYiBao" @click="payType='1'">电子医保卡</div>
              <div class="sex" :class="{'active':payType=='2'}" v-if="isCardYiBao" @click="payType='2'">实体医保卡</div>
              <div class="sex" :class="{'active':payType=='0'}" @click="payType='0'">现金支付</div>
            </div>
          </el-form-item>
        </el-form>
        <el-button-group style="width:100%;">
          <el-button type="primary" style="width:50%;" @click="confirm('ruleForm')">确认缴费</el-button>
          <el-button type="info" style="width:50%" @click="model=false">取消缴费</el-button>
        </el-button-group>
      </div>
      <div v-if="step===4">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">创建订单中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===20">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="code"></div>
              <div class="dialog-small gmt">
                请将
                <span class="danger">电子医保码</span>放置在扫码区
              </div>
              <input v-focus ref="input" class="input" v-model="code" @keyup="getCode" />
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="model=false">取消挂号</el-button>
        </el-button-group>
      </div>
      <div v-if="step===30">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-13"></div>
              <div class="dialog-small gmt">请插入实体医保卡</div>
              <div class="dialog-small danger">中途请不要取出实体医保卡</div>
            </div>
          </div>
        </div>
        <el-button-group style="width:100%;">
          <el-button type="primary" :loading="loading" style="width:50%;" @click="resetYiBao()">确认插卡</el-button>
          <el-button type="info" style="width:50%" @click="model=false">取消挂号</el-button>
        </el-button-group>
      </div>
      <div v-if="step===41">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">医保信息获取中...</div>
              <div class="dialog-small gmt">请根据提示音输入医保卡密码，点击<span class="danger">确认</span></div>
              <div class="dialog-small">
                医保卡默认密码：
                <span class="danger">123456</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===42">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">医保扣费查询中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===43">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt danger">获取医保扣费失败</div>
              <div class="dialog-small blue fs20" style="text-align:left;">请使用就诊本人九江地区医保卡</div>
              <el-button-group style="width:100%;">
                <el-button type="info" class="gmt" style="width:100%;" @click="model=false">确认</el-button>
              </el-button-group>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===44">
        <el-form label-width="140px">
          <el-form-item label="缴费名称">
            <p>{{yibao.title}}</p>
          </el-form-item>
          <el-form-item label="总金额">
            <p class="money">{{yibao.totalAmount}}</p>
          </el-form-item>
          <el-form-item label="医保支付">
            <p class="money money1">{{yibao.yiBaoAmount}}</p>
          </el-form-item>
          <el-form-item label="现金支付">
            <p class="money">{{yibao.cashAmount}}</p>
          </el-form-item>
          <el-button-group>
            <el-button type="success" class="gmt" style="width:50%;" @click="goPay()">确认支付</el-button>
            <el-button type="info" class="gmt" style="width:50%;" @click="model=false">放弃支付</el-button>
          </el-button-group>
        </el-form>
      </div>
      <div v-if="step===45">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">医保支付中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===51">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">支付通知中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===52">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt">支付通知失败</div>
              <div class="dialog-small danger">请联系工作人员医保退费</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button class="gmt" type="primary" style="width:100%;" @click="$router.replace('/')">确认</el-button>
        </el-button-group>
      </div>
      <div v-if="step===61">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">支付凭条订单中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===62">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-zhifuchenggong"></div>
              <div class="dialog-small gmt">支付凭条打印成功!</div>
              <div class="dialog-small danger" v-if="payType=='2'">请取走实体医保卡！</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="success" class="gmt" style="width:100%;" @click="$router.replace('/')">确认</el-button>
        </el-button-group>
      </div>
      <div v-if="step===63">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-zhifuchenggong"></div>
              <div class="dialog-small gmt">支付成功</div>
              <div class="dialog-small danger">支付凭条打印失败！</div>
              <div class="dialog-small danger" v-if="payType=='2'">请取走实体医保卡！</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="primary" class="gmt" style="width:100%;" @click="$router.replace('/')">确认</el-button>
        </el-button-group>
      </div>
    </el-dialog>
 
  </div>
</template>
<script>
/*
step流程
3显示预览缴费信息4创建订单中
20请将电子医保码放置在感应区
30请插入实体医保卡
41医保卡读取中42医保扣费查询中43医保扣费查询失败44显示医保扣费明细45医保支付中
51支付通知his中52支付通知his失败
61收费凭条打印中62支付凭条打印成功63支付凭条打印失败
*/
export default {
  name: 'jiaofei',
  data() {
    return {
      isDzYiBao: '',//是否支持电子医保支付
      isCardYiBao: '',//是否支持实体医保支付
      tableLoading: false,
      loading: false,
      coedCheck: true,
      model: false, //确认缴费信息弹窗
      step: 0,
      index: 0, //缴费下标
      data: [],
      title: '', //费用清单dialog标题
      modelShow: false,
      detailed: [], //费用清单明细


      previewShow: {},
      payType: '',//缴费方式
      payId: '', //订单id
      code: '', //电子社保卡
      yibao: {}, //电子医保扣费明细
      paymsg: '',//支付失败message
      resetYb: true//是否需要重启医保服务
    }
  },
  mounted() {
    this.isDzYiBao = webConfig.isDzYiBao
    this.isCardYiBao = webConfig.isCardYiBao
    this.getList()
  },
  methods: {
    getList() {
      this.tableLoading = true
      this.$http.get(false, '数据获取中...', '/PayInfo/GetHospitalId', {}).then(res => {
        this.tableLoading = false
        if (res.status === true) {
          this.data = res.data
        } else {
          this.$alert(res.message)
        }
      })
    },
    detailsShow(name, id) {
      this.title = name
      this.$http.get(false, '费用清单获取中...', '/PayInfo/GetAppointments', {
        PrescriptionId: id
      }).then(res => {
        if (res.status === true) {
          this.detailed = res.data
          this.modelShow = true
        } else {
          this.$alert(res.message)
        }
      })
    },
    close() {
      this.step = 0
      this.payId = ''
      this.payType = ''
      this.code = ''
      this.resetYb = true
      this.yibao = {}
    },
    //前往缴费
    show(index) {
      this.previewShow = this.data[index]
      this.model = true
      this.step = 3
    },
    //确认缴费
    confirm(formName) {
      if (this.payType != '') {
        this.createOrder()
      } else {
        this.$alert('请选择支付方式')
      }
    },
    //创建订单
    createOrder() {
      if (this.$store.state.token != '') {
        this.step = 4
        this.$http.post(false, '创建订单中...', '/PayInfo/ConfimPayInfo', {
          TreatmentId: this.previewShow.treatmentId
        }).then(res => {
          if (res.status === true) {
            this.payId = res.data.payId
            //如果是现金支付则直接跳进现金支付,否进入显示对应的医保操作界面
            switch (this.payType) {
              case '0':
                this.$router.push('/paySelect?type=jiaofei&payid=' + res.data.payId + '&paytype=' + this.payType + '&cardmoney=0' + '&codemoney=' + this.previewShow.totalPrice)
                break;
              case '1':
                this.step = 20;
                break;
              case '2':
                this.step = 30;
            }
          } else {
            this.model = false
            this.$alert(res.message)
          }
        })
      } else {
        this.model = false
        this.$alert('就诊档案查询失败，请重新验证身份', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.replace('/')
          }
        });
      }

    },
    //获取电子社保码
    getCode(e) {
      if (e.keyCode == 13) {
        if (this.codeCheck) {
          this.codeCheck = false
          this.resetYiBao()
        }
      }
    },
    confirmCard() {//确认已经插入实体医保卡
      this.resetYiBao()
    },
    resetYiBao() {
      this.step = 41
      this.$http.get(false, '医保卡读卡中...', '/YiBao/ReadCard', {
        YiBaoType: this.payType,
        AuthCode: this.code
      }).then(res => {
        if (res.status && res.httpStatusCode == 200) {
          this.selectYiBao()
        } else {
          if (this.resetYb) {//如果第一次医保读卡失败，执行一次医保服务重启
            this.resetYb = false
            this.$http.get(false, '医保服务重启中', '/ServiceControl/RestartYibaoWcfService', {}).then(res => {
              if (res.status === true) {
                console.log('医保服务重启成功')
                this.resetYiBao()
              } else {
                this.model = false
                this.$alert(res.message)
              }
            })
          } else {
            console.log('再次读卡医保卡失败')
            this.model = false
            this.$alert(res.message)
          }
        }
      })
    },
    //查询医保预缴扣费
    selectYiBao() {
      this.step = 42
      this.$http.post(false, '获取医保扣费中...', '/YiBao/YiBaoPrePayment', {
        yiBaoType: this.payType,
        payId: this.payId
      }).then(res => {
        if (res.status) {
          this.yibao = res.data
          this.step = 44
        } else {
          this.step = 43
        }
      })
    },
    goPay() {
      //开始支付，先判断是否需要现金支付，如果需要先进行现金支付
      if (this.yibao.cashAmount > 0) {
        this.$router.push('/paySelect?type=jiaofei&payid=' + this.payId + '&paytype=' + this.payType + '&cardmoney=' + this.yibao.yiBaoAmount + '&codemoney=' + this.yibao.cashAmount)
      } else {//不需要另外现金支付
        this.step = 45
        this.$http.post(false, '医保扣费中...', '/YiBao/YiBaoPayment', {
          yiBaoType: this.payType,
          payId: this.payId
        }).then(res => {
          if (res.status) {
            this.payBack()
          } else {
            this.model = false
            this.$alert(res.message)
          }
        })
      }
    },
    payBack() {
      this.step = 51
      this.$http.post(false, '', '/Pay/Notify', {
        payId: this.payId,
        total: this.yibao.totalAmount,
        paymentType: 1,
        medicalInsurance: this.yibao.yiBaoAmount,
        cash: 0
      }).then(res => {
        if (res.status) {
          this.printOrder()
        } else {
          this.step = 52
        }
      })
    },
    printOrder() {
      this.step = 61
      this.$http.post(false, '打印收费凭条', '/Pay/PrintResult', {
        PayId: this.payId
      }).then(res => {
        if (res.status) {
          this.step = 62
        } else {
          this.step = 63
        }
      })
    },
  },
  watch: {
    step(n, o) {
      document.onclick = null
      switch (n) {
        case '2': //提示出示电子社保卡查看预扣费
          this.code = ''
          this.status = true
          this.$nextTick(() => {
            this.$refs.input.focus()
            document.onclick = () => {
              this.$refs.input.focus()
            };
          })
          break;
      }
    }

  },
  //自定义指令
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  components: {
    'overtime': () => import('@/common/overtime')
  },
  beforeDestroy() {
    document.onclick = null
  }
}

</script>
<style  scoped>
.row-bg {
  padding: 10px 0;
  border-radius: 10px;
  background: #ffffff;
  font-size: 30px;
}
.background{
   background-color:  rgb(64,158,255);
}
.marginbotton{
  margin-bottom: 10px;
}
</style>