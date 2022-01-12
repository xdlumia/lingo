/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 18:03:48
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-01-20 09:43:20
 * @Description: setting 外观
*/
<template>
  <section class="set-section">
    <h2>外观</h2>
    <ul>
      <li class="d-flex-between">
        启动动画
        <el-switch v-model="startAnimation"></el-switch>
      </li>
      <li class="d-flex-between">
        显示图标名称
        <el-switch v-model="iconTitle"></el-switch>
      </li>

      <li>
        图标大小
        <div class="d-flex-between">
          <el-slider
            :min="60"
            :max="110"
            v-model="iconSize"
            class="wfull"
          ></el-slider>
          <span class="range-slider__value">
            <span>{{ iconSize }}</span>
          </span>
        </div>
      </li>
      <li>
        图标圆角
        <div class="d-flex-between">
          <el-slider
            :min="20"
            :max="100"
            v-model="iconRadius"
            class="wfull"
          ></el-slider>
          <span class="range-slider__value">
            <span>{{ iconRadius }}%</span>
          </span>
        </div>
      </li>
      <li>
        图标背景透明度
        <div class="d-flex-between">
          <el-slider
            :min="1"
            :max="90"
            v-model="iconOpacity"
            class="wfull"
          ></el-slider>
          <span class="range-slider__value">
            <span>{{ iconOpacity }}%</span>
          </span>
        </div>
      </li>

      <li class="d-flex-between">
        <p>
          底部显示名言名句
          <a
            v-color="'var(--primary-color)'"
            class="f12"
            href="https://hitokoto.cn/"
            target="_blank"
            >[一言]</a
          >
        </p>
        <el-switch v-model="yiyan"></el-switch>
      </li>
      <li class>
        图标布局
        <el-row :gutter="10">
          <el-col
            :span="12"
            v-for="(item, index) of layoutList"
            :key="index"
            class="ac"
          >
            <div
              @click="setLayout(item)"
              class="layout-content"
              :class="[
                `group-column-${item[0]} layout-row-${item[1]}`,
                { active: layout.toString() == item.toString() },
              ]"
            >
              <p
                :style="{ width: `calc(100% / ${item[1]})` }"
                v-for="row of item[0] * item[1]"
                class="layout-content-item d-flex-center"
                :key="row"
              ></p>
            </div>
            <p class="f12">{{ item[0] }} X {{ item[1] }}</p>
          </el-col>
        </el-row>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      // 当前布局
      activeLayout: "",
      // 布局示例
      layoutList: [
        [2, 4],
        [2, 5],
        [2, 6],
        [2, 7],
        [2, 8],
        [3, 4],
        [3, 5],
        [3, 6],
        [3, 7],
        [3, 8],
      ],
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //方法集合
  methods: {
    setLayout(row) {
      let setContent = this.$store.state.setContent || {};
      setContent.layout = row;
      this.$store.commit("setSetContent", setContent);
    },
  },
  computed: {
    layout() {
      return this.$store.state.setContent.layout || [2, 5];
    },
    yiyan: {
      get() {
        return this.$store.state.setContent.yiyan;
      },
      set(val) {
        let setContent = this.$store.state.setContent || {};
        setContent.yiyan = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
    iconRadius: {
      get() {
        return this.$store.state.setContent.iconRadius;
      },
      set(val) {
        let setContent = this.$store.state.setContent || {};
        setContent.iconRadius = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
    // 图标透明度
    iconOpacity: {
      get() {
        return this.$store.state.setContent.iconOpacity;
      },
      set(val) {
        let setContent = this.$store.state.setContent || {};
        setContent.iconOpacity = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
    // 图标透明度
    iconSize: {
      get() {
        return this.$store.state.setContent.iconSize;
      },
      set(val) {
        let setContent = this.$store.state.setContent || {};
        setContent.iconSize = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
    // 图标标题
    iconTitle: {
      get() {
        return this.$store.state.setContent.iconTitle;
      },
      set(val) {
        let setContent = this.$store.state.setContent || {};
        setContent.iconTitle = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
    // 启动动画
    startAnimation: {
      get() {
        return this.$store.state.setContent.startAnimation;
      },
      set(val) {
        let setContent = this.$store.state.setContent || {};
        setContent.startAnimation = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
  },
  watch: {},
};
</script>
<style lang='less' scoped>
.layout-content {
  transition: border 0.2s;
  display: flex;
  flex-flow: wrap;
  height: 60px;
  border: 1px solid rgba(var(--main-color), 0.15);
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    border-color: var(--primary-color);
  }
  &.active {
    border-color: var(--primary-color);
  }
  .layout-content-item {
    &:after {
      content: "";
      display: block;
      height: 10px;
      width: 10px;
      background-color: rgba(var(--main-color), 0.2);
      border-radius: 50%;
    }
  }
}
</style>