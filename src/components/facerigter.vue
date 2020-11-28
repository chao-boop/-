<template>
  <div class="flex1">
    <el-dialog title :visible.sync="model" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" top="0" append-to-body :show-close="false">
      <div v-if="step===1">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="el-icon-loading"></div>
              <div class="dialog-small gmt">验证扫脸结果中...</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="step===2">
        <div class="dialog">
          <div class="dialog-item">
            <div>
              <div class="iconfont icon-jinggao"></div>
              <div class="dialog-small gmt danger">{{faceBackMessage}}</div>
            </div>
          </div>
        </div>
        <el-button-group>
          <el-button type="info" class="gmt" style="width:100%;" @click="$router.replace('/')">退出</el-button>
        </el-button-group>
      </div>
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
          <el-button type="info" class="gmt" style="width:100%;" @click="$router.replace('/')">退出</el-button>
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
  </div>
</template>
<script>
/*
1验证扫脸信息2扫脸信息验证失败3电子健康卡申领中4电子健康码申领失败5二维码打印正6二维码打印成功7二维码打印失败
*/
export default {
  name: 'facerigter',
  data() {
    return {
      model: true,
      step:0,
      ruleForm: {},
      faceBackMessage: '',
      registerMessage: ''
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.step=1
      this.$http.get(false, '获取扫脸用户信息中...', '/PayService/GetUserInfo', {
        code: this.$route.query.code
      }).then(res => {
        if (res.status) {
          this.ruleForm = res.data
          this.post()
        } else {
          this.faceBackMessage = res.message
          this.step = 2
        }
      })
    },
    post() {
      this.step = 3
      this.$http.post(false, '电子健康卡申请中...', '/HealthCard/RegisterAndApplyHealthCard', this.ruleForm).then(res => {
        if (res.status === true) {
          this.printCode(res.data.qrcode, this.ruleForm.userName)
        } else {
          this.registerMessage = res.message
          this.step = 4
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
  beforeDestroy() {}
}

</script>
