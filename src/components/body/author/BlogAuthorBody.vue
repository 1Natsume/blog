<template>
  <div>
    <BlogAuthorIng></BlogAuthorIng>
    <div id="blog_author_aside">
      <div class="blog-author-aside-wrap">
        <div class="contact-title">联系方式</div>
        <div class="contact-item">
          <span class="contact-png">

          </span>
          <span class="contact-content">
            <div class="contact-content-top">email</div>
            <div class="contact-content-bottom">123</div>
          </span>
        </div>
        <div class="about-me-wrap">
          <div class="about-me-head">关于我</div>
          <div class="about-me-body">
            {{ aboutmeHtml }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Component from "@/utils/Component";
export default {
  name: "BlogAuthorBody",
  components: { BlogAuthorIng:Component.BlogAuthorIng }
}
</script>

<style scoped></style>
