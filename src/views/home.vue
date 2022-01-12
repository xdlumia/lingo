/*
 * @Author: web.王晓冬
 * @Date: 2020-10-10 18:08:41
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-03-22 15:01:50
 * @Description: file content
*/
<template>
  <div class="app-container">
    <div class="app-content">
      <!-- 顶部内容 -->
      <Header />

      <!-- <d-iocn class="app-logo iconfont icon-ling"></d-iocn> -->
      <!-- 时间 -->
      <dateTime />
      <!-- 搜索框功能 -->
      <searchBox />
      <!-- 应用列表 -->
      <appGroupNav class="d-cell" />

      <!-- FM -->
      <!-- <fm /> -->
      <yiyan class="d-cell" v-if="yiyan" />
    </div>
    <!-- 便笺贴 -->
    <pinned />
    <!-- 侧边栏 -->
    <sideBar />
    <!-- <music /> -->
    <login />
  </div>
</template>

<script>
import login from "@/components/login";
import Header from "@/components/header";
import dateTime from "@/components/date-time";
import searchBox from "@/components/search-box";
import appGroupNav from "@/components/app-group-nav";
import pinned from "@/components/pinned";
import music from "@/components/music.vue";
const yiyan = () => import("@/components/yiyan");
const fm = () => import("@/components/fm");
const sideBar = () => import("@/components/sidebar");

export default {
  name: "",
  props: {},
  components: {
    Header,
    dateTime,
    searchBox,
    appGroupNav,
    yiyan,
    fm,
    sideBar,
    pinned,
    login,
    music,
  },
  data() {
    //这里存放数据
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {
    yiyan() {
      return this.$store.state.setContent.yiyan;
    },
  },
  watch: {},
  //方法集合
  methods: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.app-container {
  // position: absolute;
  height: 100%;
  width: 100%;
}
.app-content {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.app-container {
  // position: absolute;
  height: 100%;
  width: 100%;
}
.app-logo {
  height: 80px;
  width: 180px;
  color: #fff;
  display: inline-block;
}
</style>
