<template>
    <div id="blog_cloud_ad">
        <div class="pub-body-title">福利区</div>
        <div v-html="adDisplay"></div>
    </div>
</template>

<script>
  import BlogContext from "@/context/BlogContext";
    export default {
        name: "BlogCloudAd",
        data: () => {
        return {
          adDisplay: BlogContext.adDisplay,
        }
      }
    }
</script>