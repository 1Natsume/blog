<template>
  <div id="music_player">
    <div class="music-player-out-wrap">
      <div class="music-player-wrap">
        <div class="music-img-wrap" :class="{ Rotation: audio.isPlay }">
          <div class="div-img head-music-pic" :style="getPicImgStyle()"></div>
        </div>
        <div class="music-right-wrap">
          <div class="music-ope-wrap">
            <div class="music-title" :style="{ width: audio.cssStyle.titleWidth + 'px' }" :title="audio.playing.title">
              <div class="music-display-info sing-ellipsis" :class="{ marquee: audio.isPlay }"
                :style="{ width: (audio.cssStyle.titleWidth - 5) + 'px' }">{{ audio.playing.title }}
              </div>
              <div class="music-display-info sing-ellipsis" :class="{ marqueeT: audio.isPlay }"
                :style="{ width: (audio.cssStyle.titleWidth - 5) + 'px' }" v-show="audio.isPlay">{{ audio.playing.title
                }}
              </div>
            </div>
            <div class="music-ope-bar">
              <span class="pre" @click="musicPlayPre"><span class="icon iconfont angle-double-left"></span></span>
              <span class="play" @click="musicState"><span class="icon iconfont "
                  :class="{ timeout: !audio.isPlay, play1: audio.isPlay }"></span></span>
              <span class="pos" @click="musicPlayPos"><span class="icon iconfont angle-double-right"></span></span>
            </div>
          </div>
          <div class="music-volume-wrap">
            <span class="icon iconfont volume-"></span>
          </div>
          <div class="music-progress" :style="{ width: audio.cssStyle.barWidth + 'px' }"></div>
        </div>
        <div class="music-list-wrap" @click="audio.showPlay = !audio.showPlay">
          <span class="icon iconfont headphones"></span>
        </div>
      </div>
      <div class="music-player-shade"></div>
      <transition name="trans">
        <pop-list class="pop-list" ref="popList" v-show="audio.showPlay" :pop-list="musicList" pop-title="音乐列表"
          :flag="true" @clickItem="clickItem"></pop-list>
      </transition>
    </div>
    <div id="music_player_lrc"></div>
    <!-- <canvas id="canvas"></canvas> -->
  </div>
</template>

<script>
import Component from "@/utils/Component";
import blogUtils from "@/utils/BlogUtils";
import blogApi from "@/utils/BlogApi";
import audio from '@/utils/Audio'
import BlogContext from "@/context/BlogContext";

export default {
  name: "MusicPlayer",
  components: { PopList: Component.PopList },
  created: function () {
    audio.audio.ontimeupdate = this.musicUpdate;
    audio.audio.onerror = this.musicError;
    audio.audio.oncanplay = this.musicCanplay;
    audio.audio.onended = this.musicEnded;
    blogApi.loadMusicList(BlogContext.musicIds).then((list) => {
      audio.playList = list;
      //this.musicState();
    });
    blogUtils.registerUnClick("#music_player", () => {
      audio.showPlay = false;
    });
  },
  data: () => {
    return {
      audio: audio
    }
  },
  computed: {
    musicList: function () {
      return this.audio.playList.map((item, i) => {
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
      this.audio.cssStyle.barWidth = ((audio.audio.currentTime / audio.audio.duration) * audio.cssStyle.barMaxWidth).toFixed(0);
      // if (audio.audio.currentTime / audio.audio.duration > 0) {
      //   document.getElementById("music_player_lrc").textContent = audio.getIndex(audio.lrc, audio.audio);
      //   audio.setText(audio.lrc, audio.audio)
      // }
    },
    musicError: function (even) {
      blogUtils.showInfoMsg('播放失败,5秒后自动切换下一首');
      audio.delayTime = setTimeout(() => {
        this.musicPlayPos();
      }, 5000);
    },
    musicCanplay: function (even) {
    },
    getPicImgStyle: function () {
      let src = this.audio.playing.pic ? this.audio.playing.pic : '';
      return {
        "background": "url('" + src + "') 0% 0% / 100% no-repeat",
      }
    },
    musicState() {
      audio.musicState()
      this.playing = audio.playing
    },
    musicPlayPre() {
      audio.musicPlayPre()
      this.playing = audio.playing
    },
    musicPlayPos() {
      audio.musicPlayPos()
      this.playing = audio.playing
    },
    clickItem: function (item) {
      audio.musicPlay(item);
    }
  }
}
</script>
