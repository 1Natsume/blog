<template>
  <div id="pub_aside">
    <div class="pub-head">
      <span class="article-menu-item" :class="selectItem == 1 ? 'article-menu-bottom' : ''" @click="selectItem = 1">
        <span class="icon iconfont fire"></span>
      </span>
      <span class="article-menu-item" :class="selectItem == 2 ? 'article-menu-bottom' : ''" @click="selectItem = 2">
        <span class="icon iconfont talk"></span>
      </span>
      <span class="article-menu-item" :class="selectItem == 3 ? 'article-menu-bottom' : ''" @click="selectItem = 3">
        <span class="icon iconfont menu"></span>
      </span>
    </div>
    <div class="pub-body">
      <div class="pub-body-view-posts" v-show="selectItem == 1">
        <div>
          <div class="pub-body-title">热门文章</div>
          <div>
            <div v-for="(item, id) in viewPosts" class="pub-item" @click="clickOpenArticle(item.url)">
              <div class="pub-face panel-right-img-style" :style="rightImg(id)"></div>
              <div class="pub-item-wrap">
                <div class="item-title double-ellipsis" :title="item.title">{{ item.title }}</div>
                <div class="item-see">
                  <span class="icon iconfont see"></span>
                  <span>{{ item.num }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside-info-page></aside-info-page>
        <blog-cloud-page></blog-cloud-page>
      </div>
      <div class="pub-body-comment" v-show="selectItem == 2">
        <div>
          <div class="pub-body-title">最新评论</div>
          <div>
            <div v-for="(item, id) in catListComment" class="pub-item" @click="clickOpenArticle(item.url)">
              <img class="pub-face panel-right-img-style" :src="item.img">
              <div class="pub-item-wrap">
                <div class="item-title sing-ellipsis" :title="item.title">{{ item.title }}</div>
                <div class="item-body double-ellipsis" :title="item.body">{{ item.body }}</div>
                <div class="item-committer" :title="item.committer">-- {{ item.committer }}</div>
              </div>
            </div>
          </div>
          <aside-info-page></aside-info-page>
          <blog-cloud-page></blog-cloud-page>
        </div>
      </div>
      <div class="pub-body-menulist" v-show="selectItem == 3">
        <blog-cloud-ad></blog-cloud-ad>

      </div>

    </div>
    <blog-navicat-page></blog-navicat-page>
  </div>
</template>

<script>
import emoji from "@/utils/EmojiUtils";
import blogApi from "@/utils/BlogApi";
import blogKit from "@/utils/BlogKit";
import Component from "@/utils/Component";
import BlogContext from "@/context/BlogContext";
export default {
  components: {
    BlogCloudAd: Component.BlogCloudAd,
    BlogNavicatPage: Component.BlogNavicatPage,
    BlogCloudPage: Component.BlogCloudPage,
    AsideInfoPage: Component.AsideInfoPage
  },
  name: "BodyAside",
  data: () => {
    return {
      selectItem: 1,
      viewPosts: [],
      catListComment: [],
    }
  },
  methods: {
    rightImg: function (id) {
      return {
        background: "url(" + BlogContext.panelRightImgPic[id] + ") no-repeat"
      }
    },
    clickOpenArticle: function (url) {
      if (this.$router.currentRoute.path != url) {
        this.$router.push(url);
      }
    },
  },
  created: function () {
    blogApi.loadTopLists().then((data) => {
      blogKit.convertSubjectUrls(data.topViewPostsBlock);
      this.viewPosts = data.topViewPostsBlock;
    });
    blogApi.loadSideColumn().then((data) => {
      blogKit.convertSubjectUrls(data.catListComment);
      data.catListComment.map((v) => {
        v.body = emoji.parseText(v.body);
        this.catListComment.push(v);
        blogApi.loadCommitterFaceUrl(v.url, v.committer).then((picUrl) => {
          v.img = picUrl;
        });
      })
    });
    // this.$bus.on("articleInited", function (dom) {
    //   this.selectItem = 1;
    // });
  }
}
</script>