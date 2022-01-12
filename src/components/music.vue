/*
 * @Author: web.王晓冬
 * @Date: 2020-10-14 12:38:18
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-01-19 11:12:30
 * @Description: FM
*/
<template>
  <div
    class="music-box"
    :class="{ 'full-screen': isFullScreen }"
    @click="isFullScreen = !isFullScreen"
  >
    <svg
      width="230"
      height="230"
      viewBox="0 0 230 230"
      transform="rotate(90),scale(-1,1)"
    >
      //进度条渐变色
      <defs>
        <linearGradient id="orange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F34D4D" />
          <stop offset="100%" stop-color="#F27D31" />
        </linearGradient>
      </defs>
      　
      <circle
        class="test"
        cx="125"
        cy="115"
        r="50"
        fill="none"
        stroke="url(#orange)"
        stroke-width="12"
        stroke-dasharray="314.1592653589793"
        stroke-dashoffset="31.41592653589793"
        stroke-linecap="round"
      />
      　　　　　　　　//内层圆　　　　　　 　　　　
    </svg>
    我是小蚊子
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
      isFullScreen: false,
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
        console.log(res);
        let data = res.data;
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
.music-box {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 999;
  width: 100px;
  height: 100px;
  transition: all 0.5s;
  background: #181818;
  color: #fff;
  &.full-screen {
    width: 100%;
    height: 100%;
    left: 0px;
    bottom: 0px;
    border-radius: 0;
  }
}
</style>