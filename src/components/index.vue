<template>
  <div class="index" >
    <div class="index-box" v-if="verify">      
      <div  v-for="item in menu" :key="item.index" :class="item.class" @click="getmonth(item.click,item.parameters)" >
        <div :class="item.classOne"></div>
        <div class="title">{{item.title}}</div> 
      </div>    
    </div>
    <div class="index-boxs" v-else>
     <el-row type="flex" justify="center" class="gps">
      <el-col :span="12" class="user">{{title}}</el-col>
      <el-col :span="12" class="gtb"
        ><el-button
          type="primary"
          
          icon="el-icon-arrow-left"
         @click="verify=true;one=true">上一步</el-button>  
          <el-button type="primary"  @click="verify=true;one=true">返回首页</el-button></el-col>
    </el-row>
    <el-row type="flex" justify="center" class="header margin">
      <!-- <el-col :span="8" class="gtc"></el-col> -->
      <el-col :span="24" class="gtc">请选择以下方式{{title}}</el-col>
      <!-- <el-col :span="7" class="gtb">倒计时：<overtime :data="verify" /></el-col> -->
    </el-row>
    <el-row :gutter="20" type="flex" justify="space-between" class="margin" v-if="one">
      <el-col :span="12" >
        <div class="headers" @click="openCard()">
          <el-card >
              <div class="iconfont icon-credentials_icon gtc size"></div>
            <div class="gtc">居民二代身份证</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12" >
        <div class="headers" @click="initFace">
          <el-card >  
              <div class="iconfont icon-renlianshibie gtc size"></div>
            <div class="gtc">刷脸</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="space-between" class="margin">
      <el-col :span="12">
        <div  class="headers"  @click="model=true;step=31">
          <el-card >
              <div class="iconfont icon-erweima gtc size"></div>
            <div class="gtc">电子健康码</div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12" >
        <div class="headers"  @click="model=true;step=51">
          <el-card >
              <div class="iconfont icon-13 gtc size"></div>
            <div class="gtc">实体医保卡</div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" justify="space-between" v-if="one">
      <el-col :span="12" >
        <div class="headers"  @click="model=true;step=54">
          <el-card class="">      
             <div class="iconfont icon-erweima gtc size"></div>
            <div class="gtc">就诊码</div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    </div>


    <el-dialog :title="dialogTitle" :visible.sync="model" width="800px" :show-close="false" :close-on-click-modal="false" 
    top="0" :close-on-press-escape="false" @closed="close" append-to-body destroy-on-close>
      <div v-if="step===11">
        <div class="dialog">
          <div class="dialog-item">
            <div class="time">{{time}}</div>
            <div>
              <div class="iconfont icon-credentials_icon"></div>
              <div class="dialog-small gmt">请将居民身份证放置在身份证感应区内</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%" @click="model=false">取消</el-button>
        </el-button-group>
      </div>
      <div v-if="step===12">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt">身份证识别失败</div>
              <div class="dialog-small danger">{{idCardMessage}}</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%" @click="model=false">关闭</el-button>
        </el-button-group>
      </div>
      <div v-if="step===13">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">身份信息查询中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===21">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">扫脸初始化中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===22">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt danger">{{faceStartMessage}}</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="primary" class="gmt" style="width:50%" @click="initFace()">重试</el-button>
          <el-button type="info" class="gmt" style="width:50%" @click="model=false">取消</el-button>
        </el-button-group>
      </div>
      <div v-if="step===23">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">扫脸结果验证中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===24">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt danger">{{faceBackMessage}}</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%" @click="model=false">关闭</el-button>
        </el-button-group>
      </div>
      <div v-if="step===30">
        <div class="dialog">
          <div class="dialog-item" @click="openCard()">
            <div>
              <div class="iconfont icon-credentials_icon"></div>
              <div class="dialog-small gmt">二代居民身份证</div>
            </div>
          </div>
          <div class="dialog-item" @click="step=51">
            <div>
              <div class="iconfont icon-13"></div>
              <div class="dialog-small gmt">实体医保卡</div>
            </div>
          </div>
          <div class="dialog-item" @click="step=31">
            <div>
              <div class="iconfont icon-erweima"></div>
              <div class="dialog-small gmt">电子健康卡码</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="model=false">取消</el-button>
        </el-button-group>
      </div>
      <div v-if="step===31">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="code"></div>
              <div class="dialog-small gmt">
                请将
                <span class="danger">电子健康码</span>放置在扫码区
              </div>
              <input v-focus ref="input" class="input" v-model="code" @keyup="getCode" />
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="model=false">取消</el-button>
        </el-button-group>
      </div>
      <div v-if="step===32">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">二维码验证中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===41">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">二维码打印中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===42">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-zhifuchenggong"></div>
              <div class="dialog-small gmt">二维码打印成功</div>
              <div class="dialog-small success">请取走您的二维码并妥善保管</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="success" class="gmt" style="width:100%;" @click="model=false">确认</el-button>
        </el-button-group>
      </div>
      <div v-if="step===43">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt danger">二维码打印失败</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="model=false">关闭</el-button>
        </el-button-group>
      </div>
      <div v-if="step===51">
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
          <el-button type="primary" style="width:50%;" @click="resetYiBao()">确认插卡</el-button>
          <el-button type="info" style="width:50%" @click="model=false">取消</el-button>
        </el-button-group>
      </div>
      <div v-if="step===52">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">医保信息获取中...</div>
              <div class="dialog-small gmt">
                请根据提示音输入医保卡密码，点击
                <span class="danger">确认</span>
              </div>
              <div class="dialog-small gmt">
                医保卡默认密码：
                <span class="danger">123456</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===53">
        <div class="dialog">
          <div class="dialog-item" @click="openCard()">
            <div>
              <div class="iconfont icon-credentials_icon"></div>
              <div class="dialog-small gmt">二代居民身份证</div>
            </div>
          </div>
          <div class="dialog-item" @click="initFace()">
            <div>
              <div class="iconfont icon-renlianshibie"></div>
              <div class="dialog-small gmt">刷脸</div>
            </div>
          </div>
         
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="model=false">取消</el-button>
        </el-button-group>
      </div>
      <div v-if="step===54">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="code"></div>
              <div class="dialog-small gmt">
                请将
                <span class="danger">就诊码</span>放置在扫码区
              </div>
              <input v-focus ref="input" class="input" v-model="code" @keyup="getCode" />
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="model=false">取消</el-button>
        </el-button-group>
      </div>

    </el-dialog>
  </div>
</template>
<script>
/*step步骤
11将身份证放置感应区12身份证读取失败或者13身份信息查询中
21扫脸初始化，22初始化失败23扫脸结果验证中24扫脸验证失败
30显示验证方式31提示出示健康码或电子医保码32二维码验证中
41二维码打印中42二维码打印成功43二维码打印失败
51提示插入实体医保卡52医保卡读取中
*/
let a;//弹出定时器
let c;//身份证定时器
import menu from "@/assets/js/menu";

export default {
  name: "index",
  data() {
    return {
      title:"验证",
      menu:[],
      modelTime:0,
      step: 0,
      timeOut: 20,//初始时间
      time: 20,
      model: false,
      one:true,
      verify:true,
      codeCheck: true, //二维码识读开关，防止重复提交ajax
      printCheck: true, //电子健康码打印中
      healType: 0, //医院业务 1挂号，2缴费,3检验报告
      code: "", //识别得电子健康码或电子社保卡内容
      dialogTitle: '',
      //接口message处理
      idCardMessage: '',//身份证读卡报错信息
      codeMessage: '',//二维码读卡报错信息
      faceStartMessage: '',//扫脸初始化报错信息
      faceBackMessage: '',//扫脸验证报错信息
      isLis: false,
      resetYb: true//是否需要重启医保服务
    };
  },
  mounted() {
    this.menu=menu.menu;
    this.$store.commit("exit", "");
    this.$message.closeAll()
    this.modelTime=webConfig.overTime
    this.isLis = webConfig.isLis
    window.aliNo = this.faceError
    //aliface扫脸初始化
    window.aliFaceInit = function (callback) {
      if (callback.status === false) {
        aliNo(callback.message)
      }
    }
    window.alicall = this.aliBack
    //aliface窗口关闭后回调
    window.aliftoken = function (callback) {
      alicall(callback)
    }
  },
  methods: {
    //挂号、缴费、检验检验等业务
    works(type) {
      this.healType = type
      // this.model = true
      // this.step = 30
      this.verify=false;
      this.title="验证";

    },
    healthCode() {//电子健康码
      // this.healType = type
      // this.model = true
      // this.step = 53
      this.title="建档";
      this.verify=false;
      this.one=false;

    },
    //打开身份证识读
    openCard() {
      this.model = true
      this.step = 11
      this.loopCard()
      c = setInterval(() => {
        if (this.time === 1) {
          clearInterval(c);
          this.step = 12
        } else {
          this.time = this.time - 1;
        }
      }, 1000)
    },
    //轮询身份证识读
    loopCard() {
      this.$http.post(false, "身份证识读中...", "/HealthCard/ReadDataByIdCard", {}).then(res => {
        if (res.status === true) {
          clearInterval(c);
          if (this.step == 11) {
            this.his(res.data);
          }
        } else {
          if (this.step == 11) {
            this.idCardMessage = res.message;
            this.loopCard();
          }
        }
      })
    },
    //查询his患者信息
    his(obj) {
      this.step = 13;
      this.$http.post(false, "身份信息查询中...", "/HealthCard/GetJWTokenById", obj).then(res => {
        if (res.status === true) {
          if (res.data.isExist === true) {//如果电子健康码存在
            if (this.healType > 0) {//如果是通过身份证验证进行医院业务
              this.model = false;
              // console.log(res);
              this.$store.commit("token", res.data);
              this.go();
            } else {
              this.printCode(res.data.qrcode, res.data.userName);
            }
          } else {
            if (this.healType > 0) {
              this.model = false;
              this.$alert(res.message);
            } else {
              this.model = false;
              this.$store.commit("card", res.data);
              setTimeout(() => {
                this.$router.push("/adult");
              }, 100)
            }
          }
        } else {
          this.model = false
          this.$alert(res.message);
        }
      })
    },
    //刷脸初始化
    initFace() {
      this.model = true;
      this.step = 21;
      aliFaceClient.CreateFace('Filing');
    },
    faceError(msg) { //aliface唤起失败
      this.faceStartMessage = msg
      this.step = 22
    },
    aliBack(obj) { //支付宝扫脸回调
      if (obj.status === true) { //扫脸成功
        this.getFaceCode(obj.data)
      } else { //扫脸失败
        this.faceError(obj.message)
      }
    },
    //扫脸成功后跳转到阿里页面获取code
    getFaceCode(token) {
      this.step = 23
      this.$http.get(false, '获取扫脸用户信息中...', '/PayService/GetAlipayOAuthAddress', {
        fToken: token
      }).then(res => {
        if (res.status) {
          location.href = res.data
        } else {
          this.faceBackMessage = res.message
          this.step = 24
        }
      })
    },
    //获取电子健康码和电子医保码
    getCode(e) {
      if (e.keyCode == 13) {
        if (this.codeCheck === true) {
          this.codeCheck = false;
          this.step = 32
          this.$http.get(false, "二维码验证中...", "/HealthCard/GetJWTokenByQrcode", {
            Qrcode: this.code
          }).then(res => {
            if (res.status === true) {
              this.$store.commit("token", res.data);
              this.go()
            } else {
              this.model = false
              this.$alert(res.message)
            }
          })
        }
      }
    },
    /*读取实体医保卡 */
    resetYiBao() {
      this.step = 52
      this.$http.post(false, '医保卡读卡中...', '/HealthCard/GetJWTokenByYibaoCard', {
      }).then(res => {
        if (res.status && res.httpStatusCode == 200) {
          this.$store.commit("token", res.data);
          this.go()
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
            this.model = false
            this.$alert(res.message)
          }
        }
      })
    },
    //打印二维码
    printCode(code, name) {
      if (this.printCheck === true) {
        this.printCheck = false
        this.step = 41
        this.$http.printCode(code, name, success => {
          this.$store.commit("exit", "");
          this.step = 42
        }, error => {
          this.$store.commit("exit", "");
          this.step = 43
        });
      }
    },
    close() {
      clearInterval(c)
      this.dialogTitle = ''
      this.idCardMessage = ''
      this.codeMessage = ''
      this.faceMessage = ''
      this.faceBackMessage = ''
      this.healType = 0
      this.code = ''
      this.step = 0
      this.codeCheck = true
      this.printCheck = true
      this.resetYb = true
      this.time = this.timeOut
    },
    //医院业务跳转
    go() {
      var url = "";
      switch (this.healType) {
        case 0:
      this.$router.push({name:"guahao",params:{title:"急诊挂号"}});
          break;

        case 1:
          // url = ;
          // this.$router.push("/guahao");
      this.$router.push({name:"guahao",params:{title:"当日挂号"}});

          break;
        case 2:
          // url = "/jiaofei";
          this.$router.push("/jiaofei");

          break;
        case 3:
          // url = "/baogao";
          this.$router.push("/baogao");
          break;
        case 4:
            this.$router.push({name:"guahao",params:{title:"预约挂号"}});   
            break; 
      }
      

      // setTimeout(() => {
      //   this.$router.push(url);
      // }, 100);
    },
    yaopin(){
      this.$router.push('/yaopin')
    },
    getmonth(month,parameters){//菜单点击事件
      // console.log(month);
      this[month](parameters);
    },
    goto(url){
       switch (url) {
             case 0:
      this.$router.push({name:"guahao",params:{title:"急诊挂号"}});
          break;
        case 1:
          this.$router.push({name:"guahao",params:{title:"当日挂号"}});
          break;
        case 2:
          this.$router.push("/jiaofei");
          break;
        case 3:
          this.$router.push("/baogao");
          break;
        case 4:
          this.$router.push({name:"guahao",params:{title:"预约挂号"}}); 
          break;   
      }
    },
   
  },
   components: {
    overtime: () => import("@/common/overtime"),
  },
  //自定义指令
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  },
  watch: {
    model(n,o){
      if(n){
        a=setInterval(()=>{
          if(this.modelTime>1){
            this.modelTime-=1
          }else{
            this.model=false
          }
        },1000)
      }else{
        clearInterval(a)
        this.modelTime=webConfig.overTime
      }
    },
    step(n, o) {
      if (n == 31) {
        this.code = ''
        this.$nextTick(() => {
          this.$refs.input.focus()
          document.onclick = () => {
            this.$refs.input.focus()
          };
        })
      } else {
        document.onclick = null;
      }
      if (n == 30) {
        this.dialogTitle = "请选择验证方式"
      } else {
        this.dialogTitle = ""
      }
    },
    
  },
  beforeDestroy() {
    clearInterval(c);
    clearInterval(a);
    document.onclick = null;
  }

};
</script>
<style  scoped>
.headers {
  border-radius: 10px;
  
}
.header{
   background: rgb(64,158,255);
  padding: 10px 0;
  border-radius: 10px;
  font-size: 30px;


}
.margin {
  margin-bottom: 20px;
}
.size{
  font-size: 8rem;
}
</style>