/*
 * @Author: web.王晓冬
 * @Date: 2020-10-10 10:04:55
 * @LastEditors: itab.link
 * @LastEditTime: 2022-01-12 20:56:02
 * @Description: file content
*/
<template>
  <div @contextmenu="doNothing()" class="app-box" :class="themeMode">
    <div class="app-bg" :style="{ filter: `blur(${$store.state.setContent.bgBlur}px)` }">
      <video
        v-if="wallpaper.type == 2"
        class="app-bg-video"
        autoplay="true"
        loop="true"
        muted="true"
        :src="wallpaper.src"
      ></video>
      <div v-else class="app-bg-img" :style="{ backgroundImage: `url(${wallpaper.src})` }"></div>
    </div>

    <div class="app-cover">
      <el-tooltip placement="top" v-if="wallpaper.copyright || wallpaper.title">
        <div slot="content">
          {{ wallpaper.title || wallpaper.copyright }}
          <br />
          <d-icon v-size="12" icon="icon-local" v-if="wallpaper.local">
            {{
              wallpaper.local
            }}
          </d-icon>
        </div>
        <d-icon v-size="24" icon="icon-about" class="wallpaper-info"></d-icon>
      </el-tooltip>
      <Home />
    </div>
  </div>
</template>
 <script>
import Home from "@/views/home.vue";

import { imgList, videoList } from "@/json";
import dayjs from "dayjs";

export default {
  name: "",
  props: {},
  components: {
    Home,
  },
  data() {
    //这里存放数据
    return {
      imgList: imgList,
      videoList: videoList,
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    document.querySelector("html").classList = this.themeMode;
  },
  computed: {
    wallpaper() {
      let wallpaper = this.videoList[0];
      wallpaper.type = 2;
      return this.$store.state.wallpaper || wallpaper;
    },
    themeMode() {
      // 如果设置跟随日出日落
      if (this.$store.state.setContent.sunrise) {
        if (this.$store.state.moment == "d") {
          return "light";
        } else {
          return "dark";
        }
      }
      return this.$store.state.setContent.themeMode;
    },
  },
  watch: {
    // 给html添加主题颜色
    themeMode(val) {
      document.querySelector("html").classList = val;
    },
  },
  //方法集合
  methods: {
    // 禁用右键菜单
    doNothing() {
      window.event.returnValue = false;
      return false;
    },

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
};
</script>
<style lang="less" scoped>
.app-box {
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #333;
  .app-bg {
    position: absolute;
    backface-visibility: hidden;
    transition-duration: 0.2s;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;

    .app-bg-img,
    .app-bg-video {
      display: block;
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: 0.3s;
    }
    .app-bg-img {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &.bgBlur {
      filter: blur(10px);
      transform: scale(1.042);
    }
  }
  .app-cover {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: radial-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.2) 166%),
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 0% 75%,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.3) 100%
      );
  }
}
.wallpaper-info {
  position: absolute;
  transition-duration: 0.2s;
  color: rgba(255, 255, 255, 0.2);

  right: 10%;
  bottom: 10%;
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
}
</style>