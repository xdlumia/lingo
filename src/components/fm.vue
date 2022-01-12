/*
 * @Author: web.王晓冬
 * @Date: 2020-10-14 12:38:18
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-28 11:26:10
 * @Description: FM
*/
<template>
  <div class="app-fm al">
    <ul class="fm-box d-flex">
      <li class="d-cell">
        <div class="fm-title">
          <span>
            This Time - Carrie Underwood-张杰
            <p class="fm-time fr">{{ currentTime }}/{{ duration }}</p></span
          >
        </div>
        <div class="fm-progress">
          <p class="fm-progress-curr" v-w="`${progress}%`"></p>
        </div>
      </li>
      <li class="f24 ml20">
        <i
          :class="`el-icon-video-${isPlay ? 'pause' : 'play'}`"
          @click="playPause"
        ></i>
      </li>
    </ul>
    <audio
      class="d-hide"
      id="audio"
      @timeupdate="audioUpdateTime"
      @playing="playing"
      controls
      autoplay
      src="https://m8.music.126.net/20201027224122/5947f4e7d7370d53a08d039a31eeb82e/ymusic/0652/0f53/5653/181ac6b261898ffaa1c4a91d81eb1eb1.mp3"
    >
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>

<script>
import axios from "axios";
let audio = "";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      duration: "00:00", //总时长
      currentTime: "00:00", //当前播放时间
      progress: 0, //播放进度百分比
      isPlay: false,
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 初始化获取天气
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    audio = document.getElementById("audio");
    this.getDoubanFm();
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    getDoubanFm() {
      this.$http.getDoubanFm().then((res) => {
        if (res.code != 200) {
          return;
        }
        let data = JSON.parse(res.data || "{}");
        console.log(data.song.length);
      });
    },
    playing() {
      this.isPlay = true;
      // console.log(audio.paused); //是否暂停
    },
    // 暂停播放
    playPause() {
      if (this.isPlay) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlay = !this.isPlay;
    },
    timeToString(time) {
      time = parseInt(time);
      let Intmm = parseInt(time / 60); //取整分
      let mm = Intmm < 10 ? "0" + Intmm : Intmm; //个位数补0
      let yu = time % 60; //取剩余秒
      let ss = yu < 10 ? "0" + yu : yu; //秒
      return `${mm}:${ss}`;
    },
    // 播放更新事件
    audioUpdateTime(e) {
      let duration = e.target.duration; // 歌曲总长
      let currentTime = e.target.currentTime; // 当前歌曲播放长度
      this.progress = ((currentTime / duration) * 100).toFixed(2);
      this.duration = this.timeToString(duration);
      this.currentTime = this.timeToString(currentTime);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroyed() {},
};
</script>
<style lang='less' scoped>
//@import url();
.app-fm {
  width: 100%;
  font-size: 12px;
  padding: 10px 20px;
  overflow: hidden;
  color: #fff;
  cursor: pointer;

  .fm-box {
    opacity: 0.8;
    max-width: 400px;
    margin: 0 auto;
    .fm-progress {
      width: 100%;
      margin: 10px 0;
      width: 100%;
      height: 1px;
      background-color: #999;
      .fm-progress-curr {
        background-color: #fff;
        height: 100%;
        width: 0%;
      }
    }
    .fm-time {
      color: #e1e1e1;
    }
  }
}
</style>
