/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 18:03:48
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-27 11:20:25
 * @Description: note
*/
<template>
  <div class="side-note">
    <ul class="note-list">
      <li class="note-item" @click="addNote">
        <d-icon v-size="16" class="mr5" icon="icon-add" />
        新建笔记
      </li>
      <li
        v-for="(row, index) of noteList"
        :key="index"
        @click="rowHandle(row, index)"
        class="note-item"
        :class="{ active: index == noteIndex }"
      >
        <span class="note-item-text d-elip">
          {{ row.text ? row.text : "新建笔记" }}
        </span>
        <p class="f14 note-handle">
          <d-icon
            v-if="row.text"
            v-size="16"
            class="icon mr5"
            :icon="`icon-fixed-${row.fixed ? 'solid' : 'line'}`"
            @click.native.stop="noteFixed(row, index)"
            :title="`${row.fixed ? '取消' : '固定'}到桌面`"
          />

          <d-icon
            v-if="index != noteIndex"
            v-size="16"
            class="icon"
            icon="icon-close"
            @click.native="noteDelete(row, index)"
            title="删除"
          />
        </p>
      </li>
    </ul>
    <div class="note-input">
      <textarea
        @input="textInput"
        v-model="value"
        rows="2"
        placeholder="写点儿什么吧"
      ></textarea>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  title: "便笺",
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      noteIndex: 0,
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
  },
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
    init() {
      // 获取note
      this.noteIndex = 0;
    },
    localSave() {
      this.$store.commit("setNote", this.noteList);
    },
    // 新建笔记
    addNote() {
      let textJson = {
        text: "",
        created: dayjs().valueOf(),
      };
      this.noteList.unshift(textJson);
      this.value = "";
      this.localSave();
    },
    rowHandle(row, index) {
      this.noteIndex = index;
      this.value = row.text;
    },
    textInput() {
      this.noteList[this.noteIndex].text = this.value;
      this.noteList[this.noteIndex].created = dayjs().valueOf();
      this.localSave();
    },
    noteFixed(row, index) {
      row.fixed = !row.fixed;
      row.animation = false;
      this.noteList.splice(index, 1, row);
      this.localSave();
    },
    // 删除note
    noteDelete(row, index) {
      this.noteList.splice(index, 1);
      this.localSave();
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.side-note {
  display: flex;
  height: 100%;
  .note-list {
    min-width: 150px;
    max-width: 150px;
    width: 150px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    .note-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 13px;
      color: rgba(var(--main-color), 0.7);
      line-height: 40px;
      padding: 0 10px;
      font-weight: 500;
      .note-item-text {
        flex: 1;
      }
      .note-handle {
        display: none;
        .icon {
          color: rgba(var(--main-color), 0.7);
        }
      }
      &.active {
        color: #1e6fff;
      }
      &:hover {
        background: rgba(var(--main-color), 0.1);
        .note-handle {
          display: block;
        }
      }
      &:first-child {
        margin-bottom: 20px;
        text-align: center;
        background: rgba(var(--main-color), 0.05);
      }
    }
  }
  .note-input {
    flex: 1;
    textarea {
      color: rgba(var(--main-color), 0.8);
      padding: 20px 10px;
      box-sizing: border-box;
      font-size: 14px;
      display: block;
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>