<template>
  <div id="category_body">
    <div class="category-body-wrap">
      <div class="head-title">
        <div class="title-font" v-if="title">{{ title }}</div>
        <div class="title-thumb" v-if="!title">{{ categoryTitle }}</div>
        <div class="title-sign " v-if="!title">{{ categorySign }}</div>
      </div>
      <div class="wrapper-md" id="post-panel">
        <div class="article-list-wrap blog-post">
          <div v-for="(item, key) in arrList" :key="key" :class="item.isTop == true ? 'panel-small' : 'panel'">
            <div class="sticky" v-if="item.isTop">置顶</div>
            <div :class="item.isTop == true ? 'index-img-small' : 'index-post-img'"><router-link :to="item.url">
                <div :class="item.isTop == true ? 'item-thumb-small lazy' : 'item-thumb lazy'"
                  :style="'background-image: url(' + item.imgUrl + ')'"></div>
              </router-link>
            </div>
            
            <div class="post-meta wrapper-lg p-b-none" v-if="item.desc">
              <h2 class="m-t-none index-post-title">
                <router-link :to="item.url">{{ item.title }}</router-link>
              </h2>
              <p class="summary l-h-2x text-muted">{{ item.desc }}</p>
              <div class="line line-lg b-b b-light"></div>
              <div class="text-muted post-item-foot-icon">
                <i class="icon iconfont ios-shijian text-muted"></i><span>&nbsp;{{ item.time }}</span>
                <i class="icon iconfont talk text-muted"></i>&nbsp;{{ item.commentNum }} 条评论
                <i class="icon iconfont see text-muted"></i>&nbsp;{{ item.readNum }}<span class="hidden-xs"> 次浏览</span>
              </div>
            </div>
          </div>
        </div>
        <page-line :page-lines="pageList" @clickItem="clickItem"></page-line>
      </div>

    </div>
  </div>
</template>
<script>
import blogKit from "@/utils/BlogKit";
import blogApi from "@/utils/BlogApi";
import BlogContext from "@/context/BlogContext";
import PageLine from "../common/PageLine.vue";
import { mapState, mapActions } from 'vuex'

let imgList = Array.from(Array(BlogContext.panelItemPic.length - 1), (v, k) => k).sort(() => Math.random() >= 0.5 ? 1 : -1).map((item) => 1 + item);

export default {
  components: { PageLine },
  data: () => {
    return {
      arrList: [],
      title: "",
      pageList: [],
      pageNum: 1,
      categoryId: "default",
      archiveId: "",
      tagId: "",
      articleName: BlogContext.blogName,
      categoryTitle: BlogContext.blogName,
      categorySign: BlogContext.blogSign
    }
  },
  created: function () {
    this.initCategoryBody(1);
  },
  methods: {
    getRandomImgClz: () => {
      let imgSrc = imgList.shift();
      imgList.push(imgSrc);
      return {
        background: "url(" + BlogContext.panelItemPic[imgSrc] + ") no-repeat"
      }
      // return "panel-item-pic-"+imgSrc;
    },
    clickItem: function (pageNum) {
      this.initCategoryBody(pageNum);
    },
    initCategoryBody: function (pageNum) {
      this.$bus.emit("fullLoadingOpen");
      this.categoryId = this.$route.params.categoryId;
      this.archiveId = this.$route.params.archiveYear ? this.$route.params.archiveYear + "/" + this.$route.params.archiveMonth : undefined;
      this.tagId = this.$route.params.tagId;
      this.pageNum = pageNum;
      let promiseArr = [];
      /*设置对应值*/
      let setDataFunc = (dataList) => {
        this.arrList = blogKit.convertSubjectUrls(dataList.list);
        this.title = dataList.title;
        this.pageList = dataList.pageList;
        this.$bus.emit("fullLoadingClose");
      }
      /*初始化目录*/
      if (this.categoryId && "default" != this.categoryId) {
        blogApi.loadCategoryList(this.categoryId, this.pageNum).then(setDataFunc);
      } else if (this.archiveId) {
        blogApi.loadArchiveList(this.archiveId, this.pageNum).then(setDataFunc);
      } else if (this.tagId) {
        blogApi.loadTagList(this.tagId, this.pageNum).then(setDataFunc);
      } else {
        blogApi.loadDefaultCategoryList(this.pageNum).then(setDataFunc);
      }
    },
    isTabRoute: function () {
        // if(this.$route.path =='/c/subject/category'){
        //   let recruitScrollY = this.$store.state.recruitScrollY
        //   document.documentElement.scrollTop = recruitScrollY;
        // }
        
      
    }
  },
  name: "ArticlesBody",
  watch: {
    $route() {
      this.initCategoryBody();
      this.isTabRoute()
    },
  },
  beforeRouteLeave(to, from, next) {
    let position = document.documentElement && document.documentElement.scrollTop; //记录离开页面时的位置
    
    if (position == null) position = 0
    this.$store.commit('changeRecruitScrollY', position) //离开路由时把位置存起来
    next()
  }
}
</script>
