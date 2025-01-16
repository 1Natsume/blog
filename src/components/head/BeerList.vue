<template>
  <div id="beer_list" class="head-back-color">
    <div class="beer-list-wrap">
      <div class="beer-wrap head-back-color" @click="showPop=!showPop">
        <div class="beer-inner-wrap">
          <span class="icon iconfont bell"></span>
        </div>
      </div>
      <transition name="trans">
        <pop-list :pop-list="beerList" class="pop-list" v-show="showPop" pop-title="闲言碎语"></pop-list>
      </transition>
      </div>
  </div>
</template>

<script>
    import PopList from "./PopList.vue";
    import blogUtils from "@/utils/BlogUtils";
    import blogApi from "@/utils/BlogApi";
    export default {
      data: () => {
        return {
          showPop:false,
          beerList:[]
        }
      },
      name: "BeerList",
      components: {PopList},
      mounted:function() {
        blogUtils.registerUnClick("#beer_list", () => {
          this.showPop = false;
        });
        // blogApi.loadBlogTalkShort().then((res)=>{
        //   res.each((i,item)=>{
        //     this.beerList.push({
        //       key:item.desc,
        //       val:item
        //     })
        //   });
        //  /* this.beerList=res.map((item)=>{
        //     return {key:item.desc,val:item}
        //   });*/
        // });
      }
    }
</script>
