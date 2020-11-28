<template>
 <div>
  <p class="overflow-line" id="J_description">{{introduce}}</p>
  <button type="button" class="btn-more" v-if="isShowMore" id="J_btnmore" @click="showmoreDesc($event)">更多</button>
 </div>
</template>
<script>
 export default {
  name: 'Spread',
  data() {
   return {
    isShowMore: false,
    isDescStatus: true,
    introduce: ""
   };
  },
  props: {
   mes2: {
    type: String,
    default: ""
   }
  },
  methods: {
   showmoreDesc(e) {
    let el = e.currentTarget;
    el.previousElementSibling.classList[!this.isDescStatus ? 'add' : 'remove']('overflow-line');
    el.previousElementSibling.classList[!this.isDescStatus ? 'remove' : 'add']('m-content');
    el.classList[this.isDescStatus ? 'add' : 'remove']('more-collapse');
    el.innerHTML = !this.isDescStatus ? '更多' : '收起';
    this.isDescStatus = !this.isDescStatus;
    this.isShowMore = true;
   }
  },
  watch: {
   mes2(val) {
    this.introduce = val;
    if (this.introduce.length > 75) {
     this.isShowMore = true;
    }
   }
  }
 };
</script>
 
<style scoped>
  .m-content{
   text-indent: 2em;
   font-size: 17px;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
   overflow:auto

 }
.overflow-line {
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 10;
   text-indent: 2em;
   font-size: 17px;
   overflow: hidden;
  
 }

 
.btn-more {
  float: right;
  background: #ffffff;
  border: 0;
  font-size: 15px;
  color: #5383E7;
  position: relative;
  /* margin-top: rc(5); */
  /* padding-right: rc(33); */
  }
.btn-more:focus{
       border: none; 
   }
 
 
   /* .btn-more .more-collapse::after,
   .btn-more .more-collapse::before {
    top: 2px;
    transform: rotate(180deg);
   }
 
   .btn-more .more-collapse::before {
    top: 4px;
   } */
 
 
  /* .btn-more::after,
  .btn-more::before {
   width: 0;
   height: 0;
   content: '';
   position: absolute;
   right: 0;
   top: 7px;
   border: rc(12) solid transparent;
  } */
 
  /* .btn-more::after {
   border-top-color: #5383E7;
   z-index: 1;
   border: 0;
  }
 
  .btn-more::before {
   border-top-color: #1c2239;
   z-index: 2;
   top: 5px;
   border: 0;
  } */
 

</style>
