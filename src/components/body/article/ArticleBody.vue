<template>
    <div id="article_body">
        <article-title :article-info="articleInfo"></article-title>
        <article-pre-line></article-pre-line>
        <article-desc :articleObj="article" class="article-body-item" ></article-desc>
        <article-pre-pos :article-id="articleId" class="article-body-margin"></article-pre-pos>
        <article-comment class="article-body-item" ref="articleComment" :article-id="articleId"></article-comment>
        <article-message class="article-body-item" :article-id="articleId" @noticeReplayEvent="noticeReplayEvent" @noticeQuoteEvent="noticeQuoteEvent" @noticeUpdateEvent="noticeUpdateEvent"></article-message>
    </div>
</template>

<script>
  import blogApi from "@/utils/BlogApi";
  import ArticleTitle from "./ArticleTitle.vue";
  import ArticlePreLine from "./ArticlePreLine.vue";
  import ArticleDesc from "./ArticleDesc.vue";
  import ArticleComment from "./ArticleComment.vue";
  import ArticleMessage from "./ArticleMessage.vue";
  import ArticlePrePos from "./ArticlePrePos.vue";

  export default {
      name: "ArticleBody",
      components: {ArticlePrePos, ArticleMessage, ArticleComment, ArticleDesc, ArticleTitle,ArticlePreLine},
      data:()=>{
          return {
            articleId:"",
            article:{},
            articleInfo:{'title':'','time':'','viewCount':'','commentCount':'','fontNum':'','articleLabels':[]}
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
          noticeUpdateEvent:function(commentId){
            this.$refs.articleComment.setUpdateCommentId(commentId);
          },
          noticeReplayEvent:function(commentId,commenter){
              this.$refs.articleComment.setReplayCommentId(commentId,commenter);
          },
          noticeQuoteEvent:function(commentId,commenter){
              this.$refs.articleComment.setQuoteCommentId(commentId,commenter);
          },
          initArticle: function() {
              this.articleId=this.$route.params.articleId;

              Promise.all([
                blogApi.loadArticle(this.articleId).then((data)=>{
                  this.article=data;
                  this.articleInfo.fontNum=data.fontNum;
                  this.articleInfo.title=data.title;
                  this.articleInfo.time=data.time;
                  this.articleInfo.viewCount=data.readNum;
                }),
                blogApi.loadCommentCount(this.articleId).then((data)=>{
                  this.articleInfo.commentCount=data;
                }),
                blogApi.loadCategoriesTags(this.articleId).then((data)=>{
                  this.articleInfo.articleLabels=data.tags;
                })
              ]).then(()=>{
                this.$nextTick(()=>{
                  this.$bus.emit("fullLoadingClose");
                });

              });

          }
        },
        watch: {
          $route() {
            if(this.articleId!=this.$route.params.articleId){
              this.initArticle();
            }
          },
        },
    }
</script>
