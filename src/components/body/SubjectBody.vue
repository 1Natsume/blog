<template>
  <div id="route_body">
    <router-view ref="routeView" class="inner-route-body" :style="{ maxHeight: leftHeight + 'px' }"></router-view>
    <pub-aside ref="pubAside" class="pub-aside" :style="{ maxHeight: rightHeight + 'px' }"></pub-aside>
  </div>

</template>

<script>
import Component from "@/utils/Component";

export default {
  name: "RouteBody",
  components: { ArticleBody: Component.ArticleBody, PubAside: Component.PubAside },
  mounted: function () {
  },
  data: () => {
    return {
      leftHeight: '',
      rightHeight: ''
    }
  },
  methods: {
    resetView: function () {
      return;
      let left = this.$refs.routeView.$el.clientHeight;
      let right = this.$refs.pubAside.$el.clientHeight;
      if (left > right) {
        right = left;
      } else {
        left = right;
      }
      this.rightHeight = right;
      this.leftHeight = left;
    }
  }
}
</script>
