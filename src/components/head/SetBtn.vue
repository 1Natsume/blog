<template>
  <div id="set_btn" class="head-back-color">
    <div class="set-btn-out-wrap">
    <div class="set-btn-wrap" @click="openManagerView">
        <span>设置</span>
        <span class="icon iconfont angeldown1"></span>
    </div>
    </div>
  </div>
</template>

<script>
  import BlogContext from "@/context/BlogContext";
    export default {
        name: "SetBtn",
        methods:{
          openManagerView:()=>{
            let res = this.$router.resolve({
              path:'/admin'
            })
            window.open(res.href,'_blank')
          }
        }
    }
</script>