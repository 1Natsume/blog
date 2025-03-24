import $ from "jquery";
import text from '@/utils/canvasText'
import blogApi from "@/utils/BlogApi";
import blogUtils from "@/utils/BlogUtils";

let AudCtx, analyser, dataArray, bufferLength = 0;
function visualize(audio) {

  if (!AudCtx) {
    AudCtx = new AudioContext();//音频内容
    var src = AudCtx.createMediaElementSource(audio);
    analyser = AudCtx.createAnalyser();

    src.connect(analyser);
    analyser.connect(AudCtx.destination);
    analyser.fftSize = 2048;//快速傅里叶变换, 必须为2的N次方

    var bufferLength = analyser.frequencyBinCount;// = fftSize * 0.5

    //part4: 变量

    dataArray = new Uint8Array(bufferLength);//8位无符号定长数组
  }
  //part5: 动态监听
  function renderFrame() {
    requestAnimationFrame(renderFrame);//方法renderFrame托管到定时器，无限循环调度，频率<16.6ms/次

    if (AudCtx) {
      analyser.getByteFrequencyData(dataArray);//获取当前时刻的音频数据
      //part6: 绘画声压条
      for (var i = 0; i < bufferLength; i++) {

        var data = dataArray[i];//int,0~255

        let barHeight = dataArray[i * 16];
        const [r, g, b] = [255 - Math.random() * barHeight, Math.random() * barHeight, 120]

        let color = `rgb(${r}, ${g}, ${b})`

        // const frequency = data; // 选择频率数据中的一个值
        // const color = `rgb(255, ${frequency}, ${frequency})`; // 简单起见，我们用红色通道表示频率

        $('.panel-small').css('background-color', color);

      }
    }
  }
  renderFrame();

}


function parseTime(lrcTime) {
  let lrcTimeArr = lrcTime.split(":");
  return lrcTimeArr[0] * 60 + +lrcTimeArr[1];
}
// 获取当前播放到的歌词的下标
function getIndex(result, audio) {
  let Time = audio.currentTime;
  for (let i = 0; i < result.length; i++) {
    if (result[i].time > Time) {
      return result[i - 1].word;
    }
  }

}
let audio = {
  delayTime: 0,
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
  lrc: [],
  cssStyle: {
    maxTitleWidth: 130,
    titleWidth: 130,
    barMaxWidth: 140,
    barWidth: 0,
    fontSize: '9',
  },
  musicPlay: function (item) {
    try {
      this.audio.crossOrigin = 'anonymous';
      this.audio.src = item.url;
      this.audio.play();
      this.musicSetInfo(item);
      this.isPlay = true;
      if (this.delayTime > 0) {
        clearTimeout(this.delayTime);
        this.delayTime = 0;
      }
    } catch (e) {
      //audio.onerror()
    }

  },
  /*切換播放暫停狀態*/
  musicState: function () {
    if (this.playing.url) {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.audio.crossOrigin = 'anonymous';
        //audio.rondom(this.audio)
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
    // this.$refs.popList.setFlag(item.index);
    // blogApi.loadMusicSonglrc(item.lrc).then(res => {
    //   this.lrc = audio.loadLrl(res)
    // })

  },
  rondom: function (dom, list) {
    visualize(dom);
  },
  loadLrl: function (lrc) {
    // 最开始获取到的歌词列表是字符串类型（不好操作）
    let lrcArr = lrc.split('\n');
    // 接收修正后的歌词数组
    let result = [];
    // 将歌词数组转成由对象组成的数组，对象有time和word两个属性（为了方便操作）
    for (let i = 0; i < lrcArr.length; i++) {
      var lrcData = lrcArr[i].split(']');
      var lrcTime = lrcData[0].substring(1);
      var obj = {
        time: parseTime(lrcTime),
        word: lrcData[1]
      }
      result.push(obj);
    }
    return result
  },
  setText(result, audio) {
    if (result.length == 0 || result == undefined) {
      return
    }
    let word = getIndex(result, audio);
    //text([word])
  }
}
audio.audio.ontimeupdate = function () {
  audio.cssStyle.barWidth = ((audio.audio.currentTime / audio.audio.duration) * audio.cssStyle.barMaxWidth).toFixed(0);
  // if (audio.audio.currentTime / audio.audio.duration > 0) {
  //   document.getElementById("music_player_lrc").textContent = audio.getIndex(audio.lrc, audio.audio);
  //   audio.setText(audio.lrc, audio.audio)
  // }
}
export default audio;