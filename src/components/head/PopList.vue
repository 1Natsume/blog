<!--eslint-disable-->
<template>
  <div id="pop_list">
    <div class="pop-list-wrap small-base-scroll">
      <div class="pop-list-head pop-list-item" v-show="popTitle">
        {{ popTitle }}
      </div>
      <div v-for="(item, id) in popList" class="pop-list-item" @click="clickItem(item, id)">
        <div class="left-flag" v-if="flag && flagIndex == id"> </div>
        <div class="item-key sing-ellipsis" :class="item.key2 ? 'item-key1' : ''">{{ item.key }}</div>
        <div class="item-key sing-ellipsis item-key2" v-if="item.key2">{{ item.key2 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopList",
  methods: {
    setFlag: function (flagIndex) {
      this.flagIndex = flagIndex;
    },
    clickItem: function (item, id) {
      if (item == undefined || id == undefined) {
        return;
      }
      this.$emit('clickItem', item.value);
      this.setFlag(id);
    },
  },
  data: () => {
    return {
      flagIndex: -1,
    }
  },
  props: {
    flag: {
      type: Boolean
    },
    popTitle: {
      type: String,
      default() {
        return "";
      }
    },
    popList: {
      type: Array,
      default() {
        return [
          //key:'test1',key2:'test2',val:''
          {},
        ];
      }
    }
  },
}
</script>
