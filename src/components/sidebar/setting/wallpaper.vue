/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 18:03:48
 * @LastEditors: www.itab.link
 * @LastEditTime: 2022-01-13 00:13:24
 * @Description: 设置-壁纸
*/
<template>
  <section class="set-section">
    <h2 class="f16">壁纸</h2>
    <ul>
      <li class>
        对壁纸进行模糊处理
        <!-- <el-switch v-model="bgBlur"></el-switch> -->
        <ul class="d-flex-between">
          <el-slider v-model="bgBlur" class="wfull"></el-slider>
          <span class="range-slider__value">
            <span>{{ bgBlur }}</span>
          </span>
        </ul>
      </li>
      <li>
        <h3>动态</h3>
        <el-row :gutter="10">
          <el-col :span="8" v-for="(row, index) of videoList" :key="index">
            <div
              :title="`${row.title} ${row.local}`"
              class="wallpaper-item"
              @click="selWallpaper(row, 2)"
              :class="{ active: activeSrc == row.src }"
            >
              <video :alt="row.title" :src="row.src" />
            </div>
          </el-col>
        </el-row>
        <h3>必应</h3>
        <el-row :gutter="10">
          <el-col :span="8">
            <div
              :title="`${bingWallpaper.title} ${bingWallpaper.copyright}`"
              class="wallpaper-item"
              @click="selWallpaper(bingWallpaper, 1)"
              :class="{ active: activeSrc == bingWallpaper.fullSrc }"
            >
              <el-image
                fit="cover"
                class="wallpaper-img"
                :alt="bingWallpaper.title"
                :src="bingWallpaper.src"
                lazy
              ></el-image>
            </div>
          </el-col>
          <el-col :span="16">
            <title>必应壁纸</title>
            <p
              class="f12 bing-copyright"
              :title="bingWallpaper.copyright"
              style="line-height: 18px"
            >
              {{ bingWallpaper.copyright }}
            </p>
            <p class="f12">
              图像来源:
              <a
                v-color="'var(--primary-color)'"
                href="https://cn.bing.com/"
                target="_blank"
                >必应</a
              >

              <a
                v-color="'var(--primary-color)'"
                class="ml10"
                href="/"
                download="bing"
                target="_blank"
                >点此下载</a
              >
            </p>
          </el-col>
        </el-row>
        <div v-for="(item, index) of dataList" :key="index">
          <h3>{{ item.title }}</h3>
          <el-row :gutter="10">
            <el-col :span="8" v-for="(row, index) of item.data" :key="index">
              <div
                :title="`${row.title} ${row.local}`"
                @click="selWallpaper(row, 0)"
                class="wallpaper-item"
                :class="{ active: activeSrc == row.src }"
              >
                <el-image
                  fit="cover"
                  class="wallpaper-img"
                  :alt="row.title"
                  :src="row.src"
                  lazy
                ></el-image>
              </div>
            </el-col>
          </el-row>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { videoList, imgList } from "@/json";

export default {
  name: "wallpaper",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      dataList: [
        {
          title: "默认",
          data: imgList,
        },
      ],
      imgList: imgList,
      videoList: videoList,
      activeSrc: "",
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.activeSrc = this.$local.get("wallpaper").src;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {
    bingWallpaper() {
      return this.$store.state.bingWallpaper || {};
    },
    bgBlur: {
      get() {
        return this.$store.state.setContent.bgBlur;
      },
      set(val) {
        let setContent = this.$store.state.setContent || {};
        setContent.bgBlur = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
  },
  watch: {},
  //方法集合
  methods: {
    // 0 本地 1 bing 2视频
    selWallpaper(row, type) {
      row.type = type;
      this.activeSrc = row.src;
      this.$store.commit("setWallpaper", row);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.wallpaper-item {
  cursor: pointer;
  position: relative;
  background: #000;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  height: 60px;
  &:after {
    display: flex;
    font-family: element-icons !important;
    justify-content: center;
    align-items: center;
    content: "\e6da";
    color: #fff;
    font-size: 24px;
    font-weight: 100;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: opacity 0.2s;
    background: rgba(0, 0, 0, 0.7);
  }
  &.active {
    &:after {
      opacity: 1;
    }
  }
  .wallpaper-img,
  video {
    width: 100%;
    height: 100%;
    transition: 0.2s;
    display: block;
  }
  &:hover {
    .wallpaper-img,
    video {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }
}
.bing-copyright {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
</style>