<template>
  <div id="music_player">
    <div class="music-player-out-wrap">
      <div class="music-player-wrap">
        <div class="music-img-wrap" :class="{Rotation:isPlay}">
          <div class="div-img head-music-pic" :style="getPicImgStyle"></div>
        </div>
        <div class="music-right-wrap">
          <div class="music-ope-wrap">
            <div class="music-title" :style="{width:cssStyle.titleWidth+'px'}" :title="playing.title">
              <div class="music-display-info sing-ellipsis" :class="{ marquee: isPlay }"
                   :style="{width:(cssStyle.titleWidth-5)+'px'}">{{playing.title}}
              </div>
              <div class="music-display-info sing-ellipsis" :class="{ marqueeT: isPlay }"
                   :style="{width:(cssStyle.titleWidth-5)+'px'}" v-show="isPlay">{{playing.title}}
              </div>
            </div>
            <div class="music-ope-bar">
              <span class="pre" @click="musicPlayPre"><span class="icon iconfont angle-double-left"></span></span>
              <span class="play" @click="musicState"><span class="icon iconfont "
                                                           :class="{timeout:!isPlay,play1:isPlay}"></span></span>
              <span class="pos" @click="musicPlayPos"><span class="icon iconfont angle-double-right"></span></span>
            </div>
          </div>
          <div class="music-volume-wrap">
            <span class="icon iconfont volume-"></span>
          </div>
          <div class="music-progress" :style="{width:cssStyle.barWidth+'px'}"></div>
        </div>
        <div class="music-list-wrap" @click="showPlay=!showPlay">
          <span class="icon iconfont headphones"></span>
        </div>
      </div>
      <div class="music-player-shade"></div>
      <transition name="trans">
        <pop-list class="pop-list" ref="popList" v-show="showPlay" :pop-list="musicList" pop-title="音乐列表" :flag="true"
                  @clickItem="clickItem"></pop-list>
      </transition>
    </div>
    <!-- <div id="music_player_lrc"></div> -->
    <!-- <canvas id="canvas"></canvas> -->
  </div>
</template>

<script>
  import blogUtils from "@/utils/BlogUtils";
  import PopList from "./PopList.vue";
  import blogApi from "@/utils/BlogApi";
  import audio from '@/utils/Audio'

  export default {
    name: "MusicPlayer",
    components: {PopList},
    created: function () {
      this.audio.ontimeupdate = this.musicUpdate;
      this.audio.onerror = this.musicError;
      this.audio.oncanplay = this.musicCanplay;
      this.audio.onended = this.musicEnded;
      blogApi.loadMusicList(this.$store.state.config.musicIds).then((list) => {
        this.playList = list;
        //this.musicState();
      });
      blogUtils.registerUnClick("#music_player", () => {
        this.showPlay = false;
      });

    },
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
        cssStyle: {
          maxTitleWidth: 130,
          titleWidth: 130,
          barMaxWidth: 140,
          barWidth: 0,
          fontSize: '9',
        }
      }
    },
    computed: {
      getPicImgStyle:function(){
        let src=this.playing.pic?this.playing.pic:'';
        return {
          "background":"url('"+src+"') 0% 0% / 100% no-repeat",
        }
      },
      musicList: function () {
        return this.playList.map((item, i) => {
          return {
            key: item.title,
            key2: item.author,
            value: item,
            index: i
          };
        });
      }
    },
    methods: {
      musicEnded: function (even) {
        blogUtils.showInfoMsg('播放结束,自动切换下一首');
        this.musicPlayPos();
      },
      musicUpdate: function (even) {
        this.cssStyle.barWidth = ((this.audio.currentTime / this.audio.duration) * this.cssStyle.barMaxWidth).toFixed(0);
        if(this.audio.currentTime / this.audio.duration>0){
          //document.getElementById("music_player_lrc").textContent = audio.getIndex(this.lrc,this.audio);
          audio.setText(this.lrc,this.audio)
        }
        
        
      },
      musicError: function (even) {
        blogUtils.showInfoMsg('播放失败,5秒后自动切换下一首');
        this.delayTime=setTimeout(()=>{
          this.musicPlayPos();
        },5000);
      },
      musicCanplay: function (even) {
      },
      /*切換播放暫停狀態*/
      musicState: function () {
        if (this.playing.url) {
          this.isPlay = !this.isPlay;
          if (this.isPlay) {
            this.audio.crossOrigin = 'anonymous';
            audio.rondom(this.audio)
            this.audio.play();
          } else {
            this.audio.pause();
          }
        } else {
          this.musicPlayPos();
        }
      },
      musicPlayPre: function () {
        if (this.playing.index == 0) {
          this.musicPlay(this.playList[this.playList.length - 1]);
        } else {
          this.musicPlay(this.playList[this.playing.index - 1]);
        }
      },
      musicPlayPos: function () {
        if (this.playing.index == this.playList.length - 1) {
          this.musicPlay(this.playList[0]);
        } else {
          this.musicPlay(this.playList[this.playing.index + 1]);
        }
        
      },

      musicSetInfo: function (item) {
        this.playing.url = item.url;
        this.playing.index = item.index;
        this.playing.pic = item.pic;
        this.playing.title = item.title + "[" + item.author + "]";
        let calTitleWidth = blogUtils.getTextWidth(this.playing.name, this.cssStyle.fontSize);
        calTitleWidth > this.cssStyle.maxTitleWidth ? this.cssStyle.titleWidth = calTitleWidth : this.cssStyle.titleWidth = this.cssStyle.maxTitleWidth;
        this.$refs.popList.setFlag(item.index);
        blogApi.loadMusicSonglrc(item.lrc).then(res=>{
          this.lrc = audio.loadLrl(res)
        })
        
      },
      musicPlay: function (item) {
        try {
          this.audio.crossOrigin = 'anonymous';
          this.audio.src = item.url;
          audio.rondom(this.audio)
          this.audio.play();
          this.musicSetInfo(item);
          this.isPlay = true;
          if(this.delayTime>0){
            clearTimeout(this.delayTime);
            this.delayTime=0;
          }
        } catch (e) {
          this.musicError();
        }

      },
      clickItem: function (item) {
        this.musicPlay(item);
      }
    }
  }
</script>
