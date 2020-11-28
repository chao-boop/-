<template>
  <div class="flex1 flex-column">
    <div class="gps">
      <em @click="$router.replace('/')">退出</em>
      <span>{{$route.meta.title}}</span>
    </div>
    <!-- <el-row type="flex" justify="center" class="gps">
      <el-col :span="12" >{{$route.meta.title}}</el-col>
      <el-col :span="12" class="gtb user"
        ><el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="$router.replace('/')"
          >上一步</el-button
        ></el-col>
    </el-row> -->
    <div class="flex1 flex box center">
      <div style="width:900px;margin:0 auto;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="false">
          <el-row :gutter="35">
            <el-col :span="9">
              <div class="form-item1">
                <el-form-item label="姓名" prop="userName">
                  <p>{{ruleForm.userName}}</p>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="form-item1">
                <el-form-item label="性别" prop="gender">
                  <p>{{ruleForm.gender}}</p>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="9">
              <div class="form-item1">
                <el-form-item label="出生日期" prop="birthday">
                  <p>{{$moment(ruleForm.birthday).format('YYYY-MM-DD')}}</p>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="35">
            <el-col :span="9">
              <div class="form-item1">
                <el-form-item label="民族" prop="nation">
                  <p>{{ruleForm.nation}}</p>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="15">
              <div class="form-item1">
                <el-form-item label="身份证号" prop="userCardNumber">
                  <p>{{ruleForm.userCardNumber}}</p>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="35">
            <el-col :span="24">
              <div class="form-item1">
                <el-form-item label="住址" prop="address">
                  <p class="textof">{{ruleForm.address}}</p>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="form-item2">
                <el-form-item label="手机号码" prop="phone" label-width="140px">
                  <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" type="text" maxlength="11" @focus="shownumber" @blur="keyboardHide" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-button-group>
          <el-button type="success" @click="post('ruleForm')" class="gmt" style="width:100%;">建档</el-button>
        </el-button-group>
        <div class="goChildren" v-if="isChildren">
          如果您需要为未申领身份证的儿童进行健康卡申领，请点击
          <span @click="$router.push('/children')">儿童卡建档</span>
        </div>
      </div>
    </div>
    <el-dialog title :visible.sync="model" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" top="0" append-to-body :show-close="false">
      <div v-if="step===3">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">处理中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===4">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt danger">{{registerMessage}}</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="model=false">关闭</el-button>
        </el-button-group>
      </div>
      <div v-if="step===5">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">二维码打印中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===6">
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
          <el-button type="success" class="gmt" style="width:100%;" @click="$router.replace('/')">退出</el-button>
        </el-button-group>
      </div>
      <div v-if="step===7">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt">建档成功！</div>
              <div class="dialog-small gmt danger">二维码打印失败</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="$router.replace('/')">关闭</el-button>
        </el-button-group>
      </div>
    </el-dialog>
    <overtime/>
  </div>
</template>
<script>
/*
3电子健康卡申领中4电子健康码申领失败5二维码打印正6二维码打印成功7二维码打印失败
*/
import rules from "@/assets/js/rules";
export default {
  name: 'adult',
  data() {
    return {
      isChildren: '',//是否支持儿童建档
      model: false,
      step: 0,
      ruleForm: {
        userName: '',
        gender: '',
        birthday: '',
        nation: '',
        userCardNumber: '',
        address: '',
        phone: '',
      },
      rules: {
        phone: [{
          required: true,
          message: '手机号码不能为空',
          trigger: 'change'
        }, {
          validator: rules.Phone,
          trigger: "change"
        }]
      }
    }
  },
  mounted() {
    this.isChildren = webConfig.isChildren
    this.ruleForm = {
      userName: this.$store.state.card.userName,
      gender: this.$store.state.card.gender,
      birthday: this.$store.state.card.birthday,
      nation: this.$store.state.card.nation,
      userCardNumber: this.$store.state.card.userCardNumber,
      address: this.$store.state.card.address,
      phone: this.$store.state.card.phone
    }
  },
  methods: {
    //显示数字键盘
    shownumber() {
      dwimeX.IMESetMode("numpad");
      dwimeX.IMEShow();
    },
    //隐藏键盘
    keyboardHide() {
      dwimeX.IMEClose();
    },
    post(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.model = true
          this.step = 3
          this.$http.post(false, '成人电子健康卡申请中...', '/HealthCard/RegisterAndApplyHealthCard', this.ruleForm).then(res => {
            if (res.status === true) {
              this.printCode(res.data.qrcode, this.ruleForm.userName)
            } else {
              this.registerMessage = res.message
              this.step = 4
            }
          })
        } else {
          this.$alert('请认真必填填写信息！')
        }
      })

    },
    //打印二维码
    printCode(code, name) {
      this.step = 5
      this.$http.printCode(code, name, success => {
        this.step = 6
      }, error => {
        this.step = 7
      });
    },
  },
  components: {
    'overtime': () => import('@/common/overtime')
  },
  beforeDestroy() {
    this.keyboardHide()
  }
}

</script>
