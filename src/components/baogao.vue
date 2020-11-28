<template>
  <div class="flex1 flex-column">
    <sitenav :title="$route.meta.title" :user="$store.state.user" @back="back()" />
    <div class="flex1 box" ref="tabs">
      <el-table :data="data" height="250" default-expand-all highlight-current-row v-loading="loading">
        <el-table-column label="日期" prop="inspectionDate" width="280" />
        <el-table-column label="项目名称" prop="inspectionName" show-overflow-tooltip />
        <el-table-column label="结果" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="success" @click="print(s.row)">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'baogao',
  data() {
    return {
      loading:false,
      data: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading=true
      this.$http.get(false, '查询中...', '/Report/GetReportList', {}).then(res => {
        this.loading=false
        if (res.status === true) {
          this.data = res.data
        } else {
          this.data = []
          this.$alert(res.message)
        }
      })
    },
    print(){

    }
  }
}

</script>
