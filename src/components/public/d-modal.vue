/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 17:48:38
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-30 08:44:59
 * @Description: 应用列表
*/
<template>
  <transition name="el-fade-in">
    <div class="d-modal" v-show="visible">
      <div class="d-modal-bg" @click="handleClose"></div>
      <div class="d-modal-wrap zoomIn" :style="{ maxWidth: width }">
        <div class="d-modal-header d-flex-between">
          <span class="d-model-title f20">{{ title }}</span>
          <i
            title="关闭"
            @click="handleClose"
            icon="icon-close"
            v-size="20"
            class="d-model-close"
          ></i>
        </div>
        <div class="d-model-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import weather from "@/components/sidebar/weather";

export default {
  name: "sidebar",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "600px",
    },
    title: String,
  },
  components: { weather },
  data() {
    //这里存放数据
    return {
      initialIndex: 0,
      isEdit: false,
      //0 web 1 app 2 自定义
      // navList: navList,
      timer: true,
      delta: "", //鼠标滚轮方向
      timeOutEvent: null,
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {},
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          let elBox = document.body.querySelector(".app-box");
          elBox.appendChild(this.$el);
        });
      }
    },
  },
  //方法集合
  methods: {
    // 关闭
    handleClose() {
      this.hide();
    },
    hide() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>
<style lang='less'>
.d-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .d-modal-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .d-modal-wrap {
    position: relative;
    margin: 15vh auto;
    z-index: 1;
    .icon-close {
      transition: 0.2s;
      display: inline-block;
      &:hover {
        transform: rotate(90deg);
        color: var(--primary-color);
      }
    }
    border-radius: 5px;
    padding: 25px;
    background-color: var(--background-info);
    .d-model-title,
    .d-model-close {
      color: rgba(var(--main-color), 0.8);
    }
    .d-model-body {
      margin-top: 20px;
      color: rgba(var(--main-color), 0.8);
      padding-bottom: 20px;
    }
  }
}
</style>