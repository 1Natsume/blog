<template>
  <div id="article_body">
    <article-title :article-info="articleInfo"></article-title>
    <article-pre-line></article-pre-line>
    <article-desc :articleObj="article" class="article-body-item"></article-desc>
    <article-pre-pos :article-id="articleId" class="article-body-margin"></article-pre-pos>
    <article-comment class="article-body-item" ref="articleComment" :article-id="articleId"></article-comment>
    <article-message class="article-body-item" :article-id="articleId" @noticeReplayEvent="noticeReplayEvent"
      @noticeQuoteEvent="noticeQuoteEvent" @noticeUpdateEvent="noticeUpdateEvent"></article-message>
  </div>
</template>

<script>
import blogApi from "@/utils/BlogApi";
import Component from "@/utils/Component";
import $bus from '@/utils/mitt'
export default {
  name: "ArticleBody",
  components: {
    ArticlePrePos: Component.ArticlePrePos,
    ArticleMessage: Component.ArticleMessage,
    ArticleComment: Component.ArticleComment,
    ArticleDesc: Component.ArticleDesc,
    ArticleTitle: Component.ArticleTitle,
    ArticlePreLine: Component.ArticlePreLine
  },
  data: () => {
    return {
      articleId: "",
      article: {},
      articleInfo: { 'title': '', 'time': '', 'viewCount': '', 'commentCount': '', 'fontNum': '', 'articleLabels': [] }
    }
  },
  created: function () {
    this.initArticle();
  },
  methods: {
    // openFullScreenEven:function(){
    //   this.$bus.emit("openFullScreenEven", {
    //     title: this.articleInfo.title,
    //     body: this.article.body
    //   });
    // },
    noticeUpdateEvent: function (commentId) {
      this.$refs.articleComment.setUpdateCommentId(commentId);
    },
    noticeReplayEvent: function (commentId, commenter) {
      this.$refs.articleComment.setReplayCommentId(commentId, commenter);
    },
    noticeQuoteEvent: function (commentId, commenter) {
      this.$refs.articleComment.setQuoteCommentId(commentId, commenter);
    },
    initArticle: function () {
      $("#blog").attr('class', 'handsome');
      this.articleId = this.$route.params.articleId;

      Promise.all([
        blogApi.loadArticle(this.articleId).then((data) => {
          this.article = data;
          this.articleInfo.fontNum = data.fontNum;
          this.articleInfo.title = data.title;
          this.articleInfo.time = data.time;
          this.articleInfo.viewCount = data.readNum;
        }),
        blogApi.loadCommentCount(this.articleId).then((data) => {
          this.articleInfo.commentCount = data;
        }),
        blogApi.loadCategoriesTags(this.articleId).then((data) => {
          this.articleInfo.articleLabels = data.tags;
        })
      ]).then(() => {
        this.$nextTick(() => {
          $bus.emit("fullLoadingClose");
        });

      });
    }
  },
  watch: {
    $route() {
      if (this.articleId != this.$route.params.articleId) {
        this.initArticle();
      }
    },
  },
}
</script>
