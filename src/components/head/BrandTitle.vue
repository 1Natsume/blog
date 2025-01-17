<template>
  <div id="brand_title" class="head-back-color">
    <router-link :to="'/'" class="brand-title-wrap" tag="div"></router-link>
  </div>
</template>

<script>
import BlogContext from "@/context/BlogContext";
import $ from "jquery";
export default {
  name: "BrandTitle",
  data: () => {
    return {
      blogName: BlogContext.blogName,
    }
  },
  mounted(){
    $('.brand-title-wrap').append(BlogContext.logo)
  }
}
</script>