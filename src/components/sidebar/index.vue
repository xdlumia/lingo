/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 17:48:38
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-27 10:56:07
 * @Description: file content
*/
<template>
  <div class="app-sidebar-box">
    <transition name="el-fade-in">
      <div
        class="app-sidebar-cover"
        @click="$store.commit('setShowSide', { val: false })"
        v-show="showSidebar"
      ></div>
    </transition>

    <div class="app-sidebar-content" :class="{ active: showSidebar }">
      <h2 class="sidebar-title">
        {{ title[sideComp] }}
        <div class="ar fr">
          <d-icon
            class="sidebar-close"
            icon="icon-close"
            v-size="24"
            title="关闭"
            @click.native="$store.commit('setShowSide', { val: false })"
          >
          </d-icon>
        </div>
      </h2>
      <div class="app-sidebar-main">
        <keep-alive>
          <templates ref="comp" :is="sideComp"></templates>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
// const weather = () => import("@/components/sidebar/weather");
// const todo = () => import("@/components/sidebar/todo");
// const note = () => import("@/components/sidebar/note");
const setting = () => import("@/components/sidebar/setting");
// const add = () => import("@/components/sidebar/add");
const indexFiles = require.context(`./`, false, /(?<!index)\.vue$/);
const comps = indexFiles.keys().reduce((obj, key) => {
  let comp = indexFiles(key).default;
  let name = key.match(/.\/(\S*).vue/)[1];
  obj[name] = comp;
  return obj;
}, {});
export default {
  title: "设置",
  name: "sidebar",
  props: {},
  components: { ...comps, setting },
  data() {
    //这里存放数据
    return {
      title: {
        weather: "天气",
        todo: "待办事项",
        note: "便笺",
        setting: "设置",
        add: "新增",
      },
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {
    showSidebar() {
      return this.$store.state.isShowSide || false;
    },
    sideComp() {
      return this.$store.state.sideComp || "";
    },
  },
  watch: {
    "$store.state.editType": {
      handler(val) {
        this.title.add = val == "add" ? "新增" : "编辑";
      },
    },
  },
  //方法集合
  methods: {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.app-sidebar-cover {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 99;
}
.app-sidebar-content {
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 10px 10px 20px 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  transition: transform 0.2s;
  z-index: 100;
  transform: translateZ(0);
  transform: translateX(100%);
  top: 0;
  bottom: 0;
  right: 0;
  width: 400px;
  &.active {
    transform: translateX(0);
  }
  .app-sidebar-main {
    overflow-y: auto;
    padding-top: 60px;
    background-color: var(--background-info);
    height: 100%;
    width: 100%;
  }
}
.sidebar-title {
  position: absolute;
  z-index: 2001;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #1e1e1e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  line-height: 60px;
  // color: rgba(var(--main-color), 1);
  color: #fff;
  font-size: 24px;
  padding: 0 20px;
}
.sidebar-close {
  display: inline-block;
  transition: 0.2s;
  &:hover {
    transform: rotate(90deg);
  }
}
@media screen and (max-width: 641px) {
  .app-sidebar-content {
    width: 80%;
  }
}
</style>