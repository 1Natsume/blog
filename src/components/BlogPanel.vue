<template>
  <div id="blog_panel">
    <Headertop></Headertop>
    <blog-head-bar class="blog-head-bar" :style="loadColor(this.$store.state.config.headcolor)"></blog-head-bar>
    <div class="main-panel">
      <panel-aside id="panel_aside" class="panel-aside"
        :class="{ 'blog-aside-show': asideIsShow, 'blog-aside-hide': !asideIsShow }"
        :style="loadColor(this.$store.state.config.asidecolor)"></panel-aside>
      <div class="panel-aside-shape" :class="!asideIsShow ? 'panel-aside-shape-hide' : ''" @click="asideIsShow = false">
        sss
      </div>
      <loading-bar ref="loadingBar" class="loading-bar-clz"></loading-bar>
      <loading-body ref="loadingBody" class="loading-body-clz"></loading-body>
      <div class="route-body none-base-scroll" ref="routerView" @scroll="panelScrollEvent">
        <div id="panel_top_target"></div>
        <router-view class="router-view-wrap" ref="routeViewWrap"
          :style="{ 'min-Height': this.routeMinHeight + 'px' }"></router-view>
        <blog-bottom></blog-bottom>
        <div id="panel_bottom_target"></div>
      </div>
    </div>
    <Tool></Tool>
  </div>
</template>

<script>
import Component from "@/utils/Component";

export default {
  name: "BlogPanel",
  methods: {
    panelScrollEvent: function (e) {
      this.$bus.emit("panelScrollEven", e);
    },
    loadColor(color) {
      return 'background-color: ' + color + ''
    }
  },
  data: () => {
    return {
      loading: true,
      lastPageId: '',
      routeMinHeight: '',
      asideIsShow: false,
      headcolor: ''
    }
  },
  created() {

  },
  components: {
    Headertop: Component.Headertop, BlogBottom: Component.BlogBottom,
    LoadingBar: Component.LoadingBar, LoadingBody: Component.LoadingBody,
    RouteBody: Component.RouteBody, ArticlesBody: Component.ArticlesBody,
    PanelAside: Component.PanelAside, BlogHeadBar: Component.BlogHeadBar, Tool: Component.Tool
  },
  beforeRouteUpdate: function (to, from, next) {
    this.$bus.emit("fullLoadingOpen", next);
  },
  mounted: function () {
    /*监控滑到顶部事件*/
    this.$bus.on("panelToTop", () => {
      document.getElementById("panel_top_target").scrollIntoView({ behavior: "smooth" });
    });
    /*监控滑到底部事件*/
    this.$bus.on("panelToBottom", () => {
      document.getElementById("panel_bottom_target").scrollIntoView({ behavior: "smooth" });
    });
    /*小屏切换顶部设置界面*/
    this.$bus.on("switchPanelAside", () => {
      this.asideIsShow = !this.asideIsShow;
    });
    /*全屏加载开启*/
    this.$bus.on("fullLoadingOpen", (next) => {
      this.$nextTick(() => {
        this.$refs.loadingBody ? this.$refs.loadingBody.openLoading(() => {
          next ? next() : '';
          this.$refs.routerView.scrollTo(0, 0);
        }) : '';

      })
    });
    /*全屏加载关闭*/
    this.$bus.on("fullLoadingClose", () => {
      this.$nextTick(() => {
        this.$refs.loadingBody ? this.$refs.loadingBody.closeLoading() : '';
      })
    });
    /*条加载开启*/
    this.$bus.on("barLoadingOpen", () => {
      this.$nextTick(() => {
        this.$refs.loadingBar ? this.$refs.loadingBar.openLoadingBar() : '';
      })
    });
    /*条加载关闭*/
    this.$bus.on("barLoadingClose", () => {
      this.$nextTick(() => {
        this.$refs.loadingBar ? this.$refs.loadingBar.closeLoadingBar() : '';
      })
    });
    //this.routeMinHeight = (this.$refs.routerView.clientHeight - 40);
  }
}
</script>