<template>
  <div id="brand_title" class="head-back-color">
    <router-link :to="'/'" class="brand-title-wrap" tag="div"></router-link>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "BrandTitle",
  data: () => {
    return {
      blogName: '',
    }
  },
  mounted(){
    $('.brand-title-wrap').append(this.$store.state.config.logo)
  }
}
</script>