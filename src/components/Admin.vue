<template>
  <div>
    <div class="set_config">
      <div>
        <span>背景图片：<input type="text" v-model="bg"></span>


      </div>
      <div>
        <span>头部颜色：
          <div v-for="(item, key) in ColorList" :key="key">
            <input type="radio" v-text="item.title" :value="item.color" class="color_item">
          </div>
        </span>
      </div>
      <div><span><button>提交</button></span><span><a href="/">返回</a></span></div>
    </div>

  </div>

</template>
<script>
export default {
  name: 'Admin',
  data() {
    return {
      bg: [],
      headcolor: "",
      ColorList: [
        { title: '嫣红', name: 'red', color: '#e54d42' },
        { title: '桔橙', name: 'orange', color: '#f37b1d' },
        { title: '明黄', name: 'yellow', color: '#fbbd08' },
        { title: '橄榄', name: 'olive', color: '#8dc63f' },
        { title: '森绿', name: 'green', color: '#39b54a' },
        { title: '天青', name: 'cyan', color: '#1cbbb4' },
        { title: '海蓝', name: 'blue', color: '#0081ff' },
        { title: '姹紫', name: 'purple', color: '#6739b6' },
        { title: '木槿', name: 'mauve', color: '#9c26b0' },
        { title: '桃粉', name: 'pink', color: '#e03997' },
        { title: '棕褐', name: 'brown', color: '#a5673f' },
        { title: '玄灰', name: 'grey', color: '#8799a3' },
      ]
    }
  },
  created() {
    this.close()
    this.bg = this.$store.state.config.bg;
  },
  methods: {
    close() {
      this.$bus.emit("fullLoadingClose");
    },
    commit() {
      let config = this.$store.state.config;
    }
  }
}
</script>
<style>
.set_config {
  width: 80%;
  margin:0 auto;
  background-color: #fff;
  height: auto;
}

.color_item {
  width: 200px;
  height: 50px;
  font-size: 12px;
}
</style>