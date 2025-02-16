<template>
  <div id="article_desc">
    <div class="article-page-body-wrap">
      <!-- <div class="entry-thumbnail" aria-hidden="true"><div class="item-thumb lazy" style="background-image: url(articleObj.imgUrl)"></div></div> -->
      <div class="inner-body-wrap">
        <div v-html="articleObj.body" ref="articleBody" v-highlight></div>
        <div class="body-wrap-bottom"><span class="icon iconfont ios-shijian"></span> 最后修改时间：{{ articleObj.time }}</div>
      </div>
      <div class="post-body-bottom">
        <span class="post-bottom-item" @click="diggAction()">
          <span class="icon iconfont zan"></span>
          <span v-show="!isDigg">已推荐</span>
          <span v-show="isDigg">点击推荐</span>
        </span>
        <span class="post-bottom-item" @click="fucusAction()">
          <span class="icon iconfont heart"></span>
          <span v-show="!isFucus">已关注</span>
          <span v-show="isFucus">点击关注</span>
        </span>
        <span class="post-bottom-item" @click="addToWz()">
          <span class="icon iconfont star"></span>收藏该文
        </span>
      </div>
      <div class="post-article-right">
        <div @click="openEdit">
          <span class="icon iconfont pen"></span>
          <span>编辑</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogApi from "@/utils/BlogApi";
import blogUtils from "@/utils/BlogUtils";
import blogKit from "@/utils/BlogKit";
export default {
  props: ['articleObj'],
  name: "ArticleDesc",
  data: () => {
    return {
      isFucus: '',
      isDigg: '',
    }
  },
  methods: {
    openEdit: function () {
      window.open(this.articleObj.editUrl);
    },
    initPageList: function () {
      this.$nextTick(() => {
        this.articleObj.pageId ? blogApi.loadBlogPostInfo(this.articleObj.pageId).then((data) => {
          this.isDigg = data.digg;
          this.isFucus = data.fucus;
          this.$bus.emit("articleInited", this.$refs.articleBody);
        }) : '';
      });
    },
    diggAction: function () {
      blogApi.voteBlogPost(this.articleObj.pageId, false).then((data) => {
        blogUtils.showInfoMsg(data.message);
      });
    },
    fucusAction: function () {
      blogApi.blogFollow().then((data) => {
        blogUtils.showInfoMsg(data);
      });
    },
    addToWz: function () {
      return blogKit.addToWz(this.articleObj.pageId)
    }
  },
  mounted: function () {
    this.initPageList();
  },
  watch: {
    articleObj() {
      this.initPageList();
    },
  },
  beforeUnmount: function () {
    this.$bus.emit("articleDestroy", true);
  },

}
</script>
