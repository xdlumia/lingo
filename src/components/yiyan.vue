/*
 * @Author: web.王晓冬
 * @Date: 2020-10-14 12:38:18
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-01-20 09:55:08
 * @Description: 一言
*/
<template>
  <div class="app-yiyan ac">
    <div
      class="yiyan-text f12"
      v-clipboard:copy="yiyan.hitokoto"
      @contextmenu="yiyanHandle"
      v-clipboard:success="onCopy"
      title="点击左键复制，右键切换"
    >
      「 {{ yiyan.hitokoto }} 」
    </div>
    <div class="yiyan-from f12">--{{ yiyan.from }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      yiyan: {},
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // 获取一言
    this.getYiyan();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {},
  watch: {},
  //方法集合
  methods: {
    yiyanHandle() {
      this.getYiyan();
    }, //获取一言
    getYiyan() {
      this.$http.getYiyan().then((res) => {
        this.yiyan = res || {};
      });
    },
    onCopy() {
      this.$message.success("一言已复制到剪切板");
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
.app-yiyan {
  overflow: hidden;
  cursor: pointer;
  max-height: 60px;
  padding: 10px 0;
  transition: 0.3s;
  line-height: 20px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.9);
  .yiyan-text {
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  }
  .yiyan-from {
    opacity: 0;
    transition: 0.4s;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
    backdrop-filter: blur(1px);
    .yiyan-from {
      opacity: 1;
    }
  }
}
</style>
