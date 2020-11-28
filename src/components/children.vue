<template>
  <div class="flex1 flex-column">
    <div class="gps">
      <em @click="$router.replace('/')">退出</em>
      <span @click="$router.back()">上一步</span>
      <span>{{$route.meta.title}}</span>
    </div>
    <div class="flex1 flex box center">
      <div style="width:900px;margin:0 auto;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="false">
          <el-row :gutter="35">
            <el-col :span="12">
              <div class="form-item1">
                <el-form-item label="监护人姓名" prop="userName">
                  <p>{{ruleForm.userName}}</p>
                </el-form-item>
              </div>
              <div class="form-item1">
                <el-form-item label="出生日期" prop="birthday">
                  <p>{{$moment(ruleForm.birthday).format('YYYY-MM-DD')}}</p>
                </el-form-item>
              </div>
              <el-row :gutter="35">
                <el-col :span="12">
                  <div class="form-item1">
                    <el-form-item label="性别" prop="gender">
                      <p>{{ruleForm.gender}}</p>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="form-item1">
                    <el-form-item label="民族" prop="nation">
                      <p>{{ruleForm.nation}}</p>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <div class="form-item1">
                <el-form-item label="身份证号" prop="userCardNumber">
                  <p>{{ruleForm.userCardNumber}}</p>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="form-item2">
                <el-form-item label="儿童姓名" prop="childrenName" label-width="140px">
                  <el-input v-model="ruleForm.childrenName" placeholder="请输入儿童姓名" @focus="showpy" @blur="keyboardHide" />
                </el-form-item>
              </div>
              <div class="form-item2">
                <el-form-item label="出生日期" prop="childrenBirthday" label-width="140px">
                  <el-date-picker v-model="ruleForm.childrenBirthday" value-format="YYYY-MM-dd" type="date" placeholder="选择儿童出生日期" :clearable="false" :editable="false" style="width:100%;" />
                </el-form-item>
              </div>
              <div class="form-item2">
                <el-form-item label="儿童性别" prop="childrenGender" label-width="140px">
                  <el-input v-model="ruleForm.childrenGender" style="display:none;" />
                  <div class="sex-box">
                    <div class="sex" :class="{'active':ruleForm.childrenGender=='男'}" @click="ruleForm.childrenGender='男'">男</div>
                    <div class="sex" :class="{'active':ruleForm.childrenGender=='女'}" @click="ruleForm.childrenGender='女'">女</div>
                  </div>
                </el-form-item>
              </div>
              <div class="form-item2">
                <el-form-item label="手机号码" prop="phone" label-width="140px">
                  <el-input v-model="ruleForm.phone" placeholder="输入监护人手机号码" type="text" maxlength="11" @focus="shownumber" @blur="keyboardHide" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <div class="form-item1" style="margin-bottom:0;">
            <el-form-item label="住址" prop="address">
              <p class="textof">{{ruleForm.address}}</p>
            </el-form-item>
          </div>
        </el-form>
        <el-button-group>
          <el-button type="success" @click="post('ruleForm')" class="gmt" style="width:100%;">建档</el-button>
        </el-button-group>
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
  name: 'children',
  data() {
    return {
      step: 0,
      model: false,
      registerMessage: '',
      ruleForm: {
        userName: '',
        gender: '',
        birthday: '',
        nation: '',
        userCardNumber: '',
        address: '',
        phone: '',
        childrenName: '',
        childrenBirthday: '',
        childrenGender: ''
      },
      rules: {
        childrenName: [{
          required: true,
          message: '儿童姓名不能为空',
          trigger: 'change'
        }, {
          validator: rules.Cn,
          trigger: 'change'
        }],
        childrenBirthday: [{
          required: true,
          message: '请选择儿童出生日期',
          trigger: 'change'
        }],
        childrenGender: [{
          required: true,
          message: '请选择儿童性别',
          trigger: 'change'
        }],
        phone: [{
          required: true,
          message: '监护人手机号码不能为空',
          trigger: 'change'
        }, {
          validator: rules.Phone,
          trigger: "change"
        }]
      }
    }
  },
  mounted() {
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
      dwimeX.IMEShow()
    },
    //显示拼音输入法
    showpy() {
      dwimeX.IMESetMode("py");
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
          this.$http.post(false, '儿童电子健康卡申请中...', '/HealthCard/ChildrenRegister', this.ruleForm).then(res => {
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