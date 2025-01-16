<!--eslint-disable-->
<template>
  <div id="brand_name">
    <div class="max-screen">
      <div class="max-screen-wrap">
        <router-link class="blog-name head-brand-color" :to="'/'" tag="span">&nbsp;{{blogName}}</router-link>
      </div>
    </div>
    <div class="min-screen" @click="$bus.$emit('switchPanelAside')">
      <div class="min-screen-wrap">
        <span class="icon iconfont menu"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import BlogContext from "@/context/BlogContext";
    export default {
        name: "BrandName",
      data: () => {
        return {
          blogName:BlogContext.blogName,
        }
      }
    }
</script>
