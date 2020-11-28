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

    <el-input placeholder="请输入药品名称进行查找" class="gmb" v-model="value" @focus="showpy" @blur="keyboardHide">
      <el-button slot="append" icon="el-icon-search" @click="sel()">查找</el-button>
    </el-input>
    <el-table :data="data" height="250" header-cell-class-name="tableHeader" default-expand-all highlight-current-row v-loading="loading">
      <el-table-column label="名称" prop="drugName" show-overflow-tooltip />
      <el-table-column label="分类" prop="drugClassify" show-overflow-tooltip align="center" width="120" />
      <el-table-column label="规格" prop="drugSpecification" show-overflow-tooltip align="center" width="180" />
      <el-table-column label="单价" align="right" width="160px">
        <template slot-scope="scope">
          <div class="money">{{scope.row.univalence}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="primary" @click="show(scope.row.drugId)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages gmt">
      <el-pagination :page-size="20" @current-change="goPage" background layout="total, prev, pager, next" :total="count" />
    </div>
    <el-dialog :title="info.drugName" :visible.sync="model" width="800px" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body top="0">
      <el-form label-width="12.037vw">
        <el-row>
          <el-form-item label="名称">
            <p>{{info.drugName}}</p>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="分类">
              <p>{{info.drugClassify}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格">
              <p>{{info.drugSpecification}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单位">
              <p>{{info.drugUnit}}</p>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格">
              <p class="money">{{info.univalence}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="成分">
            <p>{{info.drugIngredient}}</p>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="性状">
            <p>{{info.drugCharacter}}</p>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="功能说明">
            <p>{{info.drugExplain}}</p>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="用法用量">
            <p>{{info.drugUsage}}</p>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="生产厂商">
            <p>{{info.drugManufacturer}}</p>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  
  </div>
</template>
<script>
var h = dwimeX.IMEGetHeight();
export default {
  name: "yaopin",
  data() {
    return {
      loading: false,
      model: false,
      value: "",
      pages: 1,
      count: 0,
      data: [],
      info: {}
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    setDw() {
      var y = document.getElementById("app").offsetHeight - h
      dwimeX.IMESetPos(0, y)
    },
    showpy() {
      dwimeX.IMESetMode("py");
      // this.setDw()
      dwimeX.IMEShow();
    },
    //隐藏键盘
    keyboardHide() {
      dwimeX.IMEClose();
    },
    //点击分页
    goPage(index) {
      this.pages = index
      this.getInfo()
    },
    //搜索
    sel() {
      this.pages = 1;
      this.getInfo();
    },
    getInfo() {
      this.loading = true
      this.$http.get(false, "药品获取中...", "/Medicine/GetDrugList", {
        QueryText: this.value,
        PageIndex: this.pages
      }).then(res => {
        this.loading = false
        if (res.status === true) {
          this.data = res.data.data;
          this.count = res.data.count;
        } else {
          this.data = []
          this.count = 0
          this.$alert(res.message)
        }
      });
    },
    //获取药品详情
    show(id) {
      this.$http.get(true, "获取中...", "/Medicine/GetDrugInfo", {
        DrugId: id
      }).then(res => {
        if (res.status === true) {
          this.info = res.data;
          this.model = true;
        } else {
          this.info = {};
          this.$alert(res.message)
        }
      });
    }
  },
  components: {
    'overtime': () => import('@/common/overtime')
  },
  beforeDestroy() {
    this.keyboardHide();
  }
};
</script>
<style  scoped>
.overtime{
  display: inline-block;
  width: 100%;
}
</style>