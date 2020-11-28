<template>
  <div class="flex1 flex-column">
    <el-row type="flex" justify="center" class="gps">
      <el-col :span="12" class="user">{{ $router.history.current.params.title }}</el-col>
      <el-col :span="12" class="gtb"><el-button type="primary" icon="el-icon-arrow-left" @click="goHome()">上一步</el-button>
          <el-button type="primary"   @click="$router.replace('/')">返回首页</el-button>
          </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <el-row class="row-bg marginbotton background">
          <el-col :span="8" class="marginLeft">就诊人：{{ $store.state.user }}</el-col>
          <el-col :span="8" class="gtc">卡号：</el-col>
          <el-col :span="7" class="gtb">倒计时：<overtime /></el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="flex1 flex" v-if="!table">
      <div
        style="width: 39%; margin-right: 10px; padding: 1px; borderradius: 10px"
        class="flex-column"
      >
        <el-table
          :data="department"
          max-height="1400"
          header-cell-class-name="tableHeader"
          ref="singleTable"
          empty-text="暂无排班科室"
          @row-click="ksMessage"
          v-loading="departmentLoading"
          :show-header="false"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column>
            <template slot-scope="s">
              <div class="department-item">
                <div class="department-name">{{ s.row.departmentName }}</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex1 flex-column">
        <el-card class="box-card">
          <div class="box">
            <el-row type="flex" justify="center" class="borderbottom">
              <el-col :span="12" class="gtc">
                <h1>{{ departmessage.departmentName }}</h1>
              </el-col>
            </el-row>
            <div class="user">简介：</div>
            <el-row >
              <Spread :mes2="departmessage.departmentIntroduce"></Spread>
            </el-row>
            <el-row>
              <el-col :span="24" class="gtb carpadding"
                ><el-button
                  type="primary"
                  icon="el-icon-arrow-left"
                  @click.stop="ksClick"
                  >进入科室</el-button
                ></el-col
              >
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
    <el-row type="flex" justify="center" v-if="table">
      <el-col :span="24">
        <el-row class="row-bg margins">
          <el-col :span="24">
            <el-row type="flex" justify="space-between" class="padding">
              <el-col :span="24" class="gtc">{{ departmentName }}</el-col>
            </el-row>
          </el-col>
          <el-row :gutter="20" class="paddingleft" v-if="scheduling">
            <el-col
              :span="2"
               v-for="item in weekArray"
              :key="item.date"
            >
              <el-button
                type="primary"
                :plain="item.boolean"
                class="button gtc"
                @click="schedul(item)"
                >{{item.week}}<br/>{{item.date}}</el-button
              >
            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <div class="flex1 flex" v-if="table">
      <div
        style="width: 45%; margin-right: 10px; padding: 1px; borderradius: 10px"
        class="flex-column"
      >
        <el-table
          :data="doctor"
          max-height="1250"
          ref="singleTables"
          header-cell-class-name="tableHeader"
          empty-text="暂无医生"
          v-loading="doctorLoading"
          @row-click="ksdoctor"
          :show-header="false"
          highlight-current-row
          @current-change="handleCurrentChanges"
        >
          <el-table-column prop="doctorLevel" label="医生">
            <template slot-scope="s">
              <el-row :gutter="20">
                <el-col :span="11">
                  <div class="image gtc">
                    <img src="../assets/img/yang.jpg" class="imgs" />
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-row class="carpadding"
                    ><span class="textcolor">医生姓名：</span>{{ s.row.doctorName }}</el-row
                  >
                  <el-row class="carpadding"
                    ><span class="textcolor">职称：</span>{{ s.row.doctorLevel }}</el-row
                  >
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex1 flex-column">
        <el-card class="box-card">
          <div class="box">
            <el-row :gutter="20">
              <el-col :span="11">
                <div class="image gtc">
                  <img src="../assets/img/1.jpg"  class="imgs"/>
                </div>
              </el-col>
              <el-col :span="12">
                <el-row class="carpadding"
                  ><span class="textcolor">医生姓名：</span>{{ departdoctor.doctorName }}</el-row>
                <el-row class="carpadding"><span class="textcolor">职称：</span>{{ departdoctor.doctorLevel }}</el-row>
              </el-col>
            </el-row>
            <el-row> </el-row>
            <div class="user">简介：</div>
            <el-row>
              <Spread :mes2="departdoctor.introduce"></Spread>
            </el-row>
            <el-row >
              <el-row :gutter="10" class="border">
                 <el-col :span="4" v-if="paiban" class="gtb">  <el-button
                type="primary"
                class="buttonin"
                >{{week}}<br/>{{date}}</el-button
                  ></el-col>
                 <el-col :span="6" v-for="items in departdoctor.scheduling" :key="items.date" v-else>
              <el-button
                type="primary"
                :plain="items.boolean"
                class="buttonin"
                  @click="bottoms(items)"
                >{{items.week}}<br/>{{items.date}}</el-button
              >
                </el-col>
               
              </el-row>
              <el-row :gutter="20" class="border padding">
                <el-col :span="14">上午(余{{ departdoctor.amSize }})</el-col>
                <el-col :span="10" class="right">
                  <el-button type="success" @click="lock(1)" v-if="scheduling==true&&time!=thisTime||scheduling!=true&&time==thisTime||paiban">{{scheduling==true?"预约":"挂号"}}</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="border padding">
                <el-col :span="14">下午(余{{ departdoctor.pmSize }})</el-col>
                <el-col :span="10" class="right">
                  <el-button type="success" @click="lock(2)" v-if="scheduling==true&&time!=thisTime||scheduling!=true&&time==thisTime||paiban">{{scheduling==true?"预约":"挂号"}}</el-button>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
      :visible.sync="model"
      width="800px"
      :close-on-click-modal="false"
      top="0"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
      @closed="close()"
      destroy-on-close
    >
      <div v-if="step === 1">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">锁号中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 2">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">挂号信息生成中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 3">
        <el-form label-width="140px">
          <el-form-item label="就诊人">
            <p>{{ previewShow.userName }}</p>
          </el-form-item>
          <el-form-item label="挂号科室">
            <p>{{ previewShow.departmentName }}</p>
          </el-form-item>
          <el-form-item label="医师姓名">
            <p>{{ previewShow.doctorName }}</p>
          </el-form-item>
          <el-form-item label="医师职称">
            <p>{{ previewShow.doctorLevel }}</p>
          </el-form-item>
          <el-form-item label="挂号费用">
            <p class="money">{{ previewShow.appointmentAmount }}</p>
          </el-form-item>
          <el-form-item
            label="支付方式"
            v-if="previewShow.appointmentAmount > 0"
          >
            <div class="sex-box">
              <div
                class="sex"
                :class="{ active: payType == '1' }"
                v-if="isDzYiBao"
                @click="payType = '1'"
              >
                电子医保卡
              </div>
              <div
                class="sex"
                :class="{ active: payType == '2' }"
                v-if="isCardYiBao"
                @click="payType = '2'"
              >
                实体医保卡
              </div>
              <div
                class="sex"
                :class="{ active: payType == '0' }"
                @click="payType = '0'"
              >
                现金支付
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-button-group style="width: 100%">
          <el-button
            type="success"
            style="width: 50%"
            @click="confirm('ruleForm')"
            >确认挂号</el-button
          >
          <el-button type="info" style="width: 50%" @click="model = false"
            >取消挂号</el-button
          >
        </el-button-group>
      </div>
      <div v-if="step === 4">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">创建订单中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 20">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="code"></div>
              <div class="dialog-small gmt">
                请将
                <span class="danger">电子医保码</span>放置在扫码区
              </div>
              <input
                v-focus
                ref="input"
                class="input"
                v-model="code"
                @keyup="getCode"
              />
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button
            type="info"
            class="gmt"
            style="width: 100%"
            @click="model = false"
            >取消挂号</el-button
          >
        </el-button-group>
      </div>
      <div v-if="step === 30">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-13"></div>
              <div class="dialog-small gmt">请插入实体医保卡</div>
              <div class="dialog-small danger">中途请不要取出实体医保卡</div>
            </div>
          </div>
        </div>
        <el-button-group style="width: 100%">
          <el-button type="primary" style="width: 50%" @click="resetYiBao()"
            >确认插卡</el-button
          >
          <el-button type="info" style="width: 50%" @click="model = false"
            >取消挂号</el-button
          >
        </el-button-group>
      </div>
      <div v-if="step === 41">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">医保信息获取中...</div>
              <div class="dialog-small gmt">
                请根据提示音输入医保卡密码，点击
                <span class="danger">确认</span>
              </div>
              <div class="dialog-small">
                医保卡默认密码：
                <span class="danger">123456</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 42">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">医保扣费查询中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 43">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt">
                获取医保扣费失败，请排查以下原因
              </div>
              <div class="dialog-small blue fs20" style="text-align: left">
                请使用就诊本人九江地区医保卡
              </div>
              <el-button-group style="width: 100%">
                <el-button
                  type="info"
                  class="gmt"
                  style="width: 100%"
                  @click="model = false"
                  >确认</el-button
                >
              </el-button-group>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 44">
        <el-form label-width="140px">
          <el-form-item label="缴费名称">
            <p>{{ yibao.title }}</p>
          </el-form-item>
          <el-form-item label="总金额">
            <p class="money">{{ yibao.totalAmount }}</p>
          </el-form-item>
          <el-form-item label="医保支付">
            <p class="money money1">{{ yibao.yiBaoAmount }}</p>
          </el-form-item>
          <el-form-item label="现金支付">
            <p class="money">{{ yibao.cashAmount }}</p>
          </el-form-item>
          <el-button-group>
            <el-button
              type="success"
              class="gmt"
              style="width: 50%"
              @click="goPay()"
              >确认支付</el-button
            >
            <el-button
              type="info"
              class="gmt"
              style="width: 50%"
              @click="model = false"
              >放弃支付</el-button
            >
          </el-button-group>
        </el-form>
      </div>
      <div v-if="step === 45">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">医保支付中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 51">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">支付通知中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 52">
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
          <el-button
            class="gmt"
            type="primary"
            style="width: 100%"
            @click="$router.replace('/')"
            >关闭</el-button
          >
        </el-button-group>
      </div>
      <div v-if="step === 53">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small danger">免费挂号失败!</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button
            class="gmt"
            type="primary"
            style="width: 100%"
            @click="model = false"
            >关闭</el-button
          >
        </el-button-group>
      </div>
      <div v-if="step === 61">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">支付凭条订单中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step === 62">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-zhifuchenggong"></div>
              <div class="dialog-small gmt">支付凭条打印成功!</div>
              <div class="dialog-small danger" v-if="payType == '2'">
                请取走实体医保卡！
              </div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button
            type="success"
            class="gmt"
            style="width: 100%"
            @click="$router.replace('/')"
            >确认</el-button
          >
        </el-button-group>
      </div>
      <div v-if="step === 63">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-zhifuchenggong"></div>
              <div class="dialog-small gmt">支付成功</div>
              <div class="dialog-small danger">支付凭条打印失败！</div>
              <div class="dialog-small danger" v-if="payType == '2'">
                请取走实体医保卡！
              </div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button
            type="primary"
            class="gmt"
            style="width: 100%"
            @click="$router.replace('/')"
            >确认</el-button
          >
        </el-button-group>
      </div>
     
    </el-dialog>
  </div>
</template>
<script>
/*
step流程
1锁号中2生成挂号预览信息3显示预览挂号信息4创建订单中
20请将电子医保码放置在感应区
30请插入实体医保卡
41医保卡读取中42医保扣费查询中43医保扣费查询失败44显示医保扣费明细45医保支付中
51支付通知his中52支付通知his失败53免费挂号通知his失败
61收费凭条打印中62支付凭条打印成功63支付凭条打印失败
*/
export default {
  name: "guahao",
  data() {
    return {
      isDzYiBao: "", //是否支持电子医保支付
      isCardYiBao: "", //是否支持实体医保支付
      departmentLoading: false,
      doctorLoading: false,
      step: 0,
      scheduling: false,
      currentRow: null,
      currentRows: null,
      table: false,
      codeCheck: true, //防止扫码庄灵敏度过高，做了控制器
      model: false, //确认挂号信息弹窗
      payType: "", //缴费支付方式
      departmentCode: "",
      departmentTime: 0, //1上午，2下午
      departmentName: "",
      department: [], //科室信息
      departmessage: {}, //科室介绍
      departdoctor: {},
      doctor: [], //医生信息
      appointmentId: "", //医生锁号id
      previewShow: {
        departmentCode: null,
        departmentName: "",
        departmentIntroduce: "",
      }, //预览挂号信息
      payId: "", //订单id
      code: "", //电子社保卡
      yibao: {}, //电子医保扣费明细
      resetYb: true, //是否需要重启医保服务
      time:"",//当天时间
      thisTime:"",//记录点击的时间按钮
      paibanTime:"",
      weekArray:[],//排班时间
      date:"",//
      week:"",
      paiban:false,
     
    };
  },
  mounted() {
    this.isDzYiBao = webConfig.isDzYiBao;
    this.isCardYiBao = webConfig.isCardYiBao;
    this.getList();
    // console.log(this.$store.state);
  },
  methods: {
    getList() {
      this.time = this.$moment().format("YYYY-MM-DD");
      this.departmentLoading = true;
      this.$http
        .get(false, "科室信息加载中...", "/Appointment/GetDepartments", {})
        .then((res) => {
          this.departmentLoading = false;
          if (res.status === true) {
            this.departmentName = "科室名称";
            this.department = res.data;
            this.$refs.singleTable.setCurrentRow(res.data[0]); //默认选中第一个
            this.ksMessage(res.data[0]); //默认显示第一个
            if(this.$router.history.current.params.title == "急诊挂号"){
                this. ksClick();
            }
          } else {
            this.department = [];
            this.$alert(res.message);
          }
        });
    },
    //排班按钮点击
    bottoms(item) {
      for (let index = 0; index < this.departdoctor.scheduling.length; index++) {
        this.departdoctor.scheduling[index].boolean = true;
      }
      this.departdoctor.scheduling=this.departdoctor.scheduling.filter(arr=>arr.boolean==true); //变异数组  跟新视图层
      item.boolean = false;//高亮按钮
      this.thisTime=item.date;
     
      this.departdoctor.amSize=item.array[0].count;//上午余信息
      this.departdoctor.pmSize=item.array[1].count;//下午余信息   
    },
    //排班按钮点击事件
    schedul(item){
      for (let index = 0; index < this.weekArray.length; index++) {
        this.weekArray[index].boolean = true;
      }
      this.weekArray=this.weekArray.filter(arr=>arr.boolean==true);
      item.boolean = false;
      if(item.week=="全部"){
         this.paiban=false;
        let endTime=this.$moment().add(6,"days").format("YYYYMMDD");
        let starTime=this.$moment().format("YYYYMMDD")
         this.getDoctor(this.departmessage.departmentCode, starTime ,endTime);
      }else{
      this.paiban=true;
      this.week=item.week;
      this.date=item.date;
         this.getDoctor(this.departmessage.departmentCode, item.dates ,item.dates);

      }
    },
    //进入科室
    ksClick() {
      if (this.departmessage.departmentCode) {
        this.table = true;
          let endTime=this.$moment().add(6,"days").format("YYYYMMDD");
          let starTime=this.$moment().format("YYYYMMDD")
        if (this.$router.history.current.params.title == "预约挂号"){
          this.getDoctor(this.departmessage.departmentCode, starTime ,endTime);//预约给一个星期
          this.scheduling = true;
          let array=[];
          for (let index = 0; index < 7; index++) {//给一个排班信息
              array.push({date:this.$moment().add(index,"days").format("MM-DD")});
              array[index].dates=this.$moment().add(index,"days").format("YYYYMMDD");
              array[index].boolean=true;
              array[index].week=this.getweekday( this.$moment().add(index,"days").format("YYYY-MM-DD"));
          }
          array.unshift({week:"全部" ,boolean:false,date:"--"});
          this.weekArray=array;
          console.log(this.weekArray);
        }else{
          if(this.$router.history.current.params.title == "急诊挂号"){
            this.getDoctor(1, starTime,starTime);//当日挂号  给当天时间
          }else{
            this.getDoctor(this.departmessage.departmentCode, starTime,starTime);//当日挂号  给当天时间
          }
        }
      } else {
        this.$alert("请选择科室");
      }
    },
    //科室对应列赋值
    ksMessage(row) {
      this.departmessage = row;
    },
    //科室医生个人信息
    ksdoctor(row) {
      if(typeof(row.scheduling)=='string'){
        row.scheduling=row.scheduling.replace("/","")//单个医生排班信息
        row.scheduling=JSON.parse(row.scheduling);//json
      }
      let ind=0;
      for (let index = 0; index < row.scheduling.length; index++) {
          row.scheduling[index].boolean=true;
          row.scheduling[index].week= this.getweekday(row.scheduling[index].date) ;
          if(row.scheduling[index].date==this.time){//当天按钮
              ind=index;
          }  
      }
      this.departdoctor = row;
      this.bottoms(this.departdoctor.scheduling[ind]);
    
    },
    getweekday(date){//根据日期判断星期几
      let weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
      let week = weekArray[new Date(date).getDay()];//注意此处必须是先new一个Date
      return week;
    },
    //获取科室医生列表
    getDoctor(id, startTime,EndTime){
      this.departmentName = this.departmessage.departmentName; //名称
      this.departmentCode = id;
      // this.departmentTime = amPm
      this.doctorLoading = true;
      this.$http
        .get(false, "科室医师信息加载中...", "/Appointment/GetDoctors", {
          DepartmentCode: id,
          // AmPm: amPm,
          StartTime: startTime,
          EndTime: EndTime,
        })
        .then((res) => {
          this.doctorLoading = false;
          if (res.status === true) {
            this.doctor = res.data;
            this.$refs.singleTables.setCurrentRow(res.data[0]); //默认选中第一个
            this.ksdoctor(res.data[0]); //默认展示第一个
          } else {
            this.doctor = [];
            this.$alert(res.message);
          }
        });
    },
    close() {
      this.clearLock();
      this.codeCheck = true;
      this.resetYb = true;
      this.step = 0;
      this.payType = "";
      this.payId = "";
      this.code = "";
      this.previewShow = {};
      this.yibao = {};
    },
    //选择挂号并锁定医师
    lock(type) {
      this.departmentTime = type;
      this.model = true;
      this.step = 1;
      this.$http
        .post(false, "锁定医师号源中...", "/Appointment/LockAppointment", {
          doctorCode: this.departdoctor.doctorCode,
          departmentCode: this.departdoctor.departmentCode,
          amPm: this.departmentTime,
        })
        .then((res) => {
          if (res.status === true) {
            this.appointmentId = res.data.appointmentId;
            this.preview();
          } else {
            this.model = false;
            this.$alert(res.message);
          }
        });
    },
    //预览挂号信息
    preview() {
      this.step = 2;
      this.$http
        .get(false, "生成挂号信息中...", "/Appointment/GetAppointmentInfo", {
          AppointmentId: this.appointmentId,
        })
        .then((res) => {
          if (res.status === true) {
            this.previewShow = res.data;
            this.step = 3;
          } else {
            this.model = false;
            this.$alert(res.message);
          }
        });
    },
    //确认挂号
    confirm(formName) {
      if (this.payType == "" && this.previewShow.appointmentAmount > 0) {
        //验证通过创建订单
        this.$alert("请选择支付方式");
      } else {
        this.createOrder();
      }
    },
    //创建订单
    createOrder() {
      if (this.$store.state.token != "") {
        this.step = 4;
        this.$http
          .post(false, "创建订单中...", "/Appointment/CreateOrder", {
            appointmentId: this.appointmentId,
          })
          .then((res) => {
            if (res.status === true) {
              this.payId = res.data.payId;
              if (this.previewShow.appointmentAmount > 0) {
                //非免费号源按正常流程走
                //如果是现金支付则直接跳进现金支付,否进入显示对应的医保操作界面
                switch (this.payType) {
                  case "0":
                    this.$router.push(
                      "/paySelect?type=guahao&payid=" +
                        res.data.payId +
                        "&paytype=" +
                        this.payType +
                        "&doctor=" +
                        this.appointmentId +
                        "&cardmoney=0" +
                        "&codemoney=" +
                        this.previewShow.appointmentAmount
                    );
                    break;
                  case "1":
                    this.step = 20;
                    break;
                  case "2":
                    this.step = 30;
                }
              } else {
                //免费号源直接走支付通知
                this.freeBack();
              }
            } else {
              this.model = false;
              this.$alert(res.message);
            }
          });
      } else {
        this.model = false;
        this.$alert("就诊档案查询失败，请重新验证身份", "", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$router.replace("/");
          },
        });
      }
    },
    //获取电子社保码
    getCode(e) {
      if (e.keyCode == 13) {
        if (this.codeCheck) {
          this.codeCheck = false;
          this.resetYiBao();
        }
      }
    },
    //确认已经插入实体医保卡
    confirmCard() {
      this.resetYiBao();
    },
    //读取实体医保卡
    resetYiBao() {
      this.step = 41;
      this.$http
        .get(false, "医保卡读卡中...", "/YiBao/ReadCard", {
          YiBaoType: this.payType,
          AuthCode: this.code,
        })
        .then((res) => {
          if (res.status && res.httpStatusCode == 200) {
            this.selectYiBao();
          } else {
            if (this.resetYb) {
              //如果第一次医保读卡失败，执行一次医保服务重启
              this.resetYb = false;

              this.$http
                .get(
                  false,
                  "医保服务重启中",
                  "/ServiceControl/RestartYibaoWcfService",
                  {}
                )
                .then((res) => {
                  if (res.status === true) {
                    console.log("医保服务重启成功");
                    this.resetYiBao();
                  } else {
                    this.model = false;
                    this.$alert(res.message);
                  }
                });
            } else {
              console.log("再次读卡医保卡失败");
              this.model = false;
              this.$alert(res.message);
            }
          }
        });
    },
    //查询医保预缴扣费
    selectYiBao() {
      this.step = 42;
      this.$http
        .post(false, "获取医保扣费中...", "/YiBao/YiBaoPrePayment", {
          yiBaoType: this.payType,
          payId: this.payId,
        })
        .then((res) => {
          if (res.status) {
            this.yibao = res.data;
            this.step = 44;
          } else {
            this.clearLock();
            this.step = 43;
          }
        });
    },
    goPay() {
      //开始支付，先判断是否需要现金支付，如果需要先进行现金支付
      if (this.yibao.cashAmount > 0) {
        this.$router.push(
          "/paySelect?type=guahao&payid=" +
            this.payId +
            "&paytype=" +
            this.payType +
            "&doctor=" +
            this.appointmentId +
            "&cardmoney=" +
            this.yibao.yiBaoAmount +
            "&codemoney=" +
            this.yibao.cashAmount
        );
      } else {
        //不需要另外现金支付
        this.step = 45;
        this.$http
          .post(false, "医保扣费中...", "/YiBao/YiBaoPayment", {
            yiBaoType: this.payType,
            payId: this.payId,
          })
          .then((res) => {
            if (res.status) {
              this.payBack();
            } else {
              this.model = false;
              this.$alert(res.message);
            }
          });
      }
    },
    //正常付款医保通知
    payBack() {
      this.step = 51;
      this.$http
        .post(false, "", "/Pay/Notify", {
          payId: this.payId,
          total: this.yibao.totalAmount,
          paymentType: 0,
          medicalInsurance: this.yibao.yiBaoAmount,
          cash: 0,
        })
        .then((res) => {
          if (res.status) {
            this.appointmentId = "";
            this.printOrder();
          } else {
            this.clearLock();
            this.step = 52;
          }
        });
    },
    //免费号源现金通知
    freeBack() {
      this.step = 51;
      this.$http
        .post(false, "", "/Pay/Notify", {
          payId: this.payId,
          total: 0,
          paymentType: 0,
          medicalInsurance: 0,
          cash: 0,
        })
        .then((res) => {
          if (res.status) {
            this.appointmentId = ""; //支付成功不触发解除锁号
            this.printOrder();
          } else {
            this.clearLock();
            this.step = 53;
          }
        });
    },
    printOrder() {
      this.step = 61;
      this.$http
        .post(false, "打印收费凭条", "/Pay/PrintResult", {
          PayId: this.payId,
        })
        .then((res) => {
          if (res.status) {
            this.step = 62;
          } else {
            this.step = 63;
          }
        });
    },
    //解除锁定医师
    clearLock() {
      if (this.appointmentId != "") {
        this.$http
          .post(false, "取消锁号中...", "/Appointment/CancelAppointment", {
            appointmentId: this.appointmentId,
          })
          .then((res) => {
            this.appointmentId = "";
          });
      }
    },
    //上一步
    goHome() {

    

        if (this.table == false||this.$router.history.current.params.title == "急诊挂号") {
          this.clearLock();
          this.$router.replace("/");
        } else {
          this.table = false;
        }
      
    },
    handleCurrentChange(val) {
   
      this.currentRow = val;
    },
    handleCurrentChanges(val) {

      this.currentRows = val;
    },
  },
  watch: {
    step(n, o) {
      document.onclick = null;
      switch (n) {
        case 20: //提示出示电子社保卡查看预扣费
          this.code = "";
          this.codeCheck = true;
          this.$nextTick(() => {
            this.$refs.input.focus();
            document.onclick = () => {
              this.$refs.input.focus();
            };
          });
          break;
      }
    },
  },
  components: {
    overtime: () => import("@/common/overtime"),
    Spread: () => import("@/common/spread"),
  },
  //自定义指令
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
  beforeDestroy() {
    document.onclick = null;
  },
};
</script>
<style scoped>
.box-card {
  width: 100%;
  height: 100%;
  border: 0;
}
.box {
  padding: 10px 10px;
  border-radius: 15px;
}
.button {
  font-size: 15px;
  margin-top: 10px;
}
.buttonin{
  font-size: 20px;
  padding: 10px 5px;

  }
.image {
  width: 90%;
  height: 130px;
  padding: 5px;
  border-radius: 15px;
  border-bottom: 1px solid #9aaac4;
}
.imgs {
  width: 80%;
  height: 100%;
}
/* .maxheight {
  padding-top: 15px;
  height: 400px;
  text-indent: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  margin-bottom: 40px;
} */
.carpadding {
  padding: 20px 0;
}
.row-bg {
  padding: 10px 0;
  border-radius: 10px;
  background: #ffffff;
  font-size: 30px;
}
.background{
   background-color:  rgb(64,158,255);
}
.margins {
  margin: 10px 0;
  margin-top: 5px;
}
.right {
  text-align: right;
  padding-right: 40px;
}
.paddingleft {
  padding: 5px 0px;
  padding-left: 5px;
}
.padding {
  padding: 10px 0;
  border-bottom: 1px solid #9aaac4;
}
.border {
  border: 1px solid #ebeef5;
  margin: 10px 0;
}
.borderbottom {
  border-bottom: 1px solid #9aaac4;
}
.marginLeft {
  margin-left: 20px;
}
.borderResade {
  border-radius: 15px;
}
.marginbotton {
  margin-bottom: 10px;
}
.textcolor{
  color:rgb(180,180,180);
}


</style>