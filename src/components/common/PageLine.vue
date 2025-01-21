<!--eslint-disable-->
<template>
  <div id="page_line">
    <div class="post-comment-num">
      <ul class="pagination">
        <li v-for="item in pageLines" @click="$emit('clickItem',item.num)">
          <a :class="item.focus?'active':''">{{item.text}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "PageLine",
        props: {
          pageLines:{
            default() {
              return [];
            }
          },
        },
    }
</script>
