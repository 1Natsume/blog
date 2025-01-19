<template>
  <div id="keyword_searcher">
    <div class="keyword-searcher-wrap">
      <input class="input-wrap" placeholder="输入关键字查询" v-model="keyword" @focus="search()" />
      <div class="search-btn head-keyword-back-color" @click="search()">
        <span class="icon iconfont -search"></span>
      </div>
    </div>
    <div class="keyword-searcher-shade"></div>
    <transition name="trans">
      <pop-list class="pop-list" :pop-list="list" v-show="isShow"></pop-list>
    </transition>
  </div>
</template>

<script>
import PopList from "./PopList.vue";
import blogApi from "@/utils/BlogApi";
import blogUtils from "@/utils/BlogUtils";
export default {
  name: "KeywordSearcher",
  components: { PopList },
  data: () => {
    return {
      isShow: false,
      keyword: '',
      list: []
    }
  },
  mounted: function () {
    blogUtils.registerUnClick("#keyword_searcher", () => {
      this.isShow = false;
    });
  },
  methods: {
    search() {
      this.list = blogApi.loadkeywordList(this.keyword).list
      this.isShow = true
    }
  }
}
</script>