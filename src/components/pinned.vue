/*
 * @Author: web.王晓冬
 * @Date: 2020-10-23 10:09:07
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-30 09:09:43
 * @Description: pinned
*/
<template>
  <div class="app-pinned">
    <template v-for="(row, index) of noteList">
      <div
        :class="{ zoomOut: row.animation }"
        class="pinned-item"
        v-if="row.fixed"
        :key="row.created"
      >
        <d-icon
          class="icon-close"
          icon="icon-close"
          @click.native="noteFixed(row, index)"
        ></d-icon>
        <div
          @blur="noteInput($event, row, index)"
          contenteditable
          class="pinned-text"
        >
          {{ row.text }}
        </div>
        <time class="pinned-time">{{
          row.created | timeToStr("YYYY-MM-DD HH:MM")
        }}</time>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {
    noteList() {
      return this.$store.state.note;
    },
  },
  watch: {},
  //方法集合
  methods: {
    noteInput(e, row, index) {
      row.text = e.target.textContent;
      this.noteList.splice(index, 1, row);
      //   this.$store.commit("setNote", this.noteList);
    },
    noteFixed(row, index) {
      row.animation = true;
      this.noteList.splice(index, 1, row);
      setTimeout(() => {
        row.fixed = !row.fixed;
        this.noteList.splice(index, 1, row);
        this.$store.commit("setNote", this.noteList);
      }, 180);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.app-pinned {
  position: absolute;
  left: 80px;
  top: 90px;
  width: 300px;
  perspective: 500px;
  transition: all 0.25s;

  .pinned-item {
    position: relative;
    transition-duration: 0.25s;
    cursor: pointer;
    font-size: 13px;
    padding: 15px 20px;
    background: rgba(var(--background), 0.7);
    border-radius: 5px;
    color: rgba(var(--main-color), 0.8);
    margin-bottom: 10px;

    .icon-close {
      opacity: 0;
      transition-duration: 0.2s;
      position: absolute;
      right: 5px;
      top: 5px;
      font-size: 14px;
      color: rgba(var(--main-color), 0.8);
    }
    &:hover {
      transform: rotateX(3deg) rotateY(-3deg);
      .icon-close {
        opacity: 1;
      }
    }
    .pinned-text {
      border: none;
      text-align: left;
      word-break: break-all;
    }
    .pinned-time {
      margin-top: 5px;
      display: block;
      color: rgba(var(--main-color), 0.3);
      font-size: 12px;
    }
  }
}
[contenteditable]:focus {
  outline: none;
}
</style>