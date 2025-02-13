<!--eslint-disable-->
<template>
  <div id="brand_name">
    <div class="max-screen">
      <div class="max-screen-wrap">
        <router-link class="blog-name head-brand-color" :to="'/'" tag="span">
        </router-link>
      </div>
    </div>
    <div class="min-screen" @click="switchPanelAside()">
      <div class="min-screen-wrap">
        <span class="icon iconfont menu"></span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "BrandName",
  data: () => {
    return {
      blogName: '',
    }
  },
  created(){
    
  },
  mounted(){
    $('.blog-name').append(this.$store.state.config.logo)
  }
  , methods: {
    switchPanelAside() {
      this.$bus.emit('switchPanelAside');
    }
  }
}
</script>