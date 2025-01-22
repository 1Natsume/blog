<template>
  <div id="blog_author_ing">
    <div class="author-head-img-wrap">
      <img class="author-head-img" :src="headBackImg">
      <div class="author-head-content">
        <div class="author-head-content-wrap">
          <div>
            <div class="head-author-name">{{ingName()}}</div>
            <div class="head-author-sign">{{ingTitle()}}</div>
            <div class="head-author-info">
              <div class="head-author-info-item">
                <div class="head-info-num">{{info.commentNum}}</div>
                <div class="head-info-title">评价</div>
              </div>
              <div class="head-author-info-item">
                <div class="head-info-num">{{info.pageNum}}</div>
                <div class="head-info-title">文章</div>
              </div>
              <div class="head-author-info-item">
                <div class="head-info-num">{{ingObj.count}}</div>
                <div class="head-info-title">新鲜事</div>
              </div>
            </div>
          </div>
          <div class="head-bottom-wrap">
            <div class="head-bottom">
              <div class="head-bottom-icon">
                <span class="icon iconfont git"></span>
              </div>
              <div class="head-bottom-icon">
                <span class="icon iconfont wechat"></span>
              </div>
              <div class="head-bottom-icon">
                <span class="icon iconfont qq2"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="author-body-wrap">
      <div class="author-content-item" v-for="item in ingObj.cnList">
        <div class="author-content-img-wrap">
          <img :src="item.avatarHdUrl" :onerror="'this.src=\''+item.avatarUrl+'\';this.onerror=null;'">
        </div>
        <div class="author-content-body-wrap">
          <div class="author-content-arrow-back"></div>
          <div class="boadr-top-wrap">
            <span class="board-top-author">{{item.author}}</span>
            <span class="board-top-time">{{item.date}}</span>
          </div>
          <div class="board-middle-wrap">
            {{item.desc}}
          </div>
          <div class="board-bottom-wrap">
            <span class="heart-wrap"><span class="icon iconfont heart"></span><span>{{item.digg||"0"}}</span></span>
            <span><span class="icon iconfont Icon-Fixedposition- position"></span><span>{{item.from||"博客园"}}</span></span>
          </div>
        </div>
      </div>
    </div>
    <pagination v-if="ingObj.pageNum" :page-size="ingObj.pageNum" :page-cur="ingObj.current" max-page="10" @clickPage="clickPage"></pagination>

  </div>
</template>

<script>
    import blogApi from "../../../utils/BlogApi";
    import BlogContext from "../../../context/BlogContext";
    import Pagination from "../../common/Pagination.vue";
    export default {
      name: "BlogAuthorIng",
      components: {Pagination},
      created: function () {
            Promise.all([
                // this.askIngList(),
                // this.askInfo(),
            ]).then(() => {
              this.$bus.emit("fullLoadingClose");
            });
        },

        methods: {
            askInfo: function () {
                let self = this;
                return new Promise((resolve, reject) => {
                    blogApi.loadArticleNum().then((info) => {
                        self.info = info;
                        resolve();
                    }).catch(() => {
                        resolve();
                    })
                })
            },
            askIngList: function (openLoadBar) {
                let self = this;
                openLoadBar ? this.$bus.emit("barLoadingOpen"): '';
                return new Promise((resolve, reject) => {
                    blogApi.loadBlogTalk(this.current).then((data) => {
                        self.ingObj = data;
                        self.ingObj.current=data.pageNum;
                        openLoadBar ? this.$bus.emit("barLoadingClose") : '';
                        resolve();
                    }).catch(() => {
                        resolve();
                    })
                });
            },
            ingTitle: () => {
                return BlogContext.ingTitle;
            },
            ingName: () => {
                return BlogContext.blogName;
            },
            clickPage:function(current){
                this.current=current;
            }
        },
        data: () => {
            return {
                ingMinHeight:'',
                headBackImg: BlogContext.headBackImg,

                ingObj: {
                    cnList: [],
                    current: -1,
                    pageNum: 0,
                    count:0,
                },
                current: -1,
                info: {}
            }
        },
        watch: {
            current: function () {
                this.askIngList(true);
            }
        }
    }
</script>
