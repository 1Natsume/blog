<template>
    <div class="play_list_main">
        <div class="song-list">
            <div v-for="item in playList" class="song-item">{{ item.title }}</div>
        </div>
        <div class="play-contols">123</div>
        <div class="song"></div>
    </div>
</template>
<script>
import blogApi from "@/utils/BlogApi";
export default{
    name:"",
    data: () => {
      return {
        delayTime:0,
        audio: new Audio(),
        isPlay: false,
        playing: {
          index: 0,
          title: '音乐播放器',
          name: '',
          url: '',
          pic: '',
        },
        playList: [],
        showPlay: false,
        lrc:[],
      }
    },
    created(){
        $("#blog").attr('class', 'handsome');
        blogApi.loadMusicList(this.$store.state.config.musicIds).then((list) => {
        this.playList = list;
        //this.musicState();
      });
    },
    methods:{

    }
}
</script>
<style>
.play_list_main{
    position: fixed;
    top:0;
    left: 0;
}
.song-list{
    position: fixed;
    top: 100px;
    width: 800px;
    height: 70%;
    margin-left: 30%;
    margin-right: 30%;
    overflow: hidden;
    overflow-y: scroll;
    background-color: beige;
}
.song-item{
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 5px;
}
.play-contols{
    position: fixed;
    width: 100%;
    height: 10%;
    bottom: 0;
    background-color: beige;
}
</style>