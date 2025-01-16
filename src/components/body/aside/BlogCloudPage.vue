<!--eslint-disable-->
<template>
  <div id="blog_cloud_page">
    <div class="menu-body-item">
      <div class="menu-body-item-title">
        <div>标签云</div>
      </div>
      <div class="cloud-content cloud_label_content_clz">
        <span v-for="item in labels">
          <router-link :to="item.url" :title="item.name">
             <span class="info-item-bg">
                  <span>{{item.name}}</span>
             </span>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import blogApi from "@/utils/BlogApi";
  import blogUtils from "@/utils/BlogUtils";
  import blogKit from "@/utils/BlogKit";
  export default {
    name: "BlogCloudPage",
    created: function () {
      blogApi.loadCloudLabel().then((list) => {
        this.labels = blogKit.convertSubjectUrls(list);
      });
    },
    data: () => {
      return {labels: []}
    }
  }
</script>
