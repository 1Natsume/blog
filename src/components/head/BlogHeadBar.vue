<template>
  <div id="blog_head_bar" ref="blogHeadBar">
    <brand-title class="brand-title"></brand-title>
    <brand-name></brand-name>
    <min-set-btn class="min-set-btn" @clickSet="switchSetView"></min-set-btn>
    <keyword-searcher class="keyword-searcher"></keyword-searcher>
    <div class="float-right-wrap">
      <music-player class="music-player"></music-player>
      <beer-list class="beer-list"></beer-list>
      <set-btn class="set-btn"></set-btn>
    </div>
  </div>
</template>

<script>
  import BrandName from "./BrandName.vue";
  import KeywordSearcher from "./KeywordSearcher.vue";
  import MusicPlayer from "./MusicPlayer.vue";
  import BeerList from "./BeerList.vue";
  import SetBtn from "./SetBtn.vue";
  import MinSetBtn from "./MinSetBtn.vue";
  import BrandTitle from "./BrandTitle.vue";
  export default {
    name: "BlogHeadBar",
    data: () => {
      return {
       
      }
    },
    mounted: function () {
      let self=this;
      function resetHeadView(){
        $(self.$refs.blogHeadBar).css('overflow',$(window).width()<900?'hidden':'');
        self.minShowSet=false;
      }
      resetHeadView();
      $(window).resize((e)=>{resetHeadView()});
      this.$refs.blogHeadBar.addEventListener('transitionstart',(e)=>{
        $(e.target).css('overflow','hidden');
      });
      this.$refs.blogHeadBar.addEventListener('transitionend',(e)=>{
        if($(e.target).height()=='250'){
          $(e.target).css('overflow','');
        }
      });
    },
    computed: {

    },
    components: {BrandTitle, MinSetBtn, SetBtn, BeerList, MusicPlayer, KeywordSearcher, BrandName},
    methods:{
      switchSetView:function(){
        setTimeout(()=>{
          this.minShowSet=!this.minShowSet;
        },this.minShowSet&&$("#blog_head_bar .pop-list").is(":visible")?300:0);
      }
    }
  }
</script>