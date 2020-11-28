<template>
  <div class="el-page-header gmb">
    <div class="el-page-header__left" @click="back()" v-if="showBack">
      <i class="el-icon-back"></i>
      <div class="el-page-header__title">{{backTitle}}</div>
    </div>
    <div class="el-page-header__content">{{title}}</div>
    <div class="el-page-header__info">{{user}}</div>
  </div>
</template>
<script>
  export default {
    name: 'sitenav',
    methods:{
      back(){
        this.$emit('back')
      }
    },
    props: {
      backTitle:{
        type:String,
        default:'退出'
      },
      title: {
        type: String
      },
      user:{
          type:String,
          default:''
      },
      showBack:{
          type:Boolean,
          default:true
      }
    }
  }

</script>
