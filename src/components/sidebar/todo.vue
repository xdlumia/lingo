/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 18:03:48
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-12-07 17:59:42
 * @Description: todo
*/
<template>
  <div class="side-todo">
    <div class="todo-input">
      <input
        v-model.trim="value"
        @keydown.13="addTodo"
        placeholder="添加任务"
        type="text"
      />
    </div>
    <ul class="todo-unfinish">
      <li class="todo-item" v-for="(row, index) of unfinish" :key="row.time">
        <el-checkbox
          name="unfinish"
          @click.native="finHandle(row, index, $event)"
        ></el-checkbox>
        <span class="todo-item-text">{{ row.text }}</span>
        <d-icon
          v-size="18"
          class="todo-delete"
          icon="icon-close"
          @click.native="todoDelete('unfinish', index)"
          title="删除"
        />
      </li>
    </ul>
    <!-- 未完成 -->
    <div class="finish-box" :class="{ active: active }">
      <div class="finish-btn d-flex-ver f14" @click="active = !active">
        <i class="icon el-icon-arrow-right f14 mr5"> </i>

        已完成
      </div>
      <transition name="el-zoom-in-top">
        <ul class="todo-finish" v-show="active">
          <li
            class="todo-item d-elip"
            v-for="(row, index) of finish"
            :key="row.time"
          >
            <el-checkbox
              checked
              name="finish"
              @click.native="unfinHandle(row, index, $event)"
            ></el-checkbox>
            <span :title="row.text" class="todo-item-text">{{ row.text }}</span>
            <d-icon
              v-size="18"
              class="todo-delete"
              icon="icon-close"
              @click.native="todoDelete('finish', index)"
              title="删除"
            />
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  title: "待办事项",
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      active: true,
      //   未完成
      unfinish: [],
      //   已完成
      finish: [],
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.init();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {},
  watch: {},
  //方法集合
  methods: {
    init() {
      // 获取todo
      let todo = this.$local.get("todo") || {};
      this.unfinish = todo.unfinish || [];
      this.finish = todo.finish || [];
    },
    localSave() {
      this.$local.set("todo", {
        unfinish: this.unfinish,
        finish: this.finish,
      });
      this.$store.dispatch("saveConfig");
    },
    // 添加todo
    addTodo() {
      if (this.value) {
        let textJson = {
          text: this.value,
          created: dayjs().valueOf(),
        };
        this.unfinish.unshift(textJson);
        this.value = "";
      }
    },
    // 标记完成
    finHandle(row, index, ev) {
      console.log(ev);
      ev.preventDefault();
      this.unfinish.splice(index, 1);
      this.finish.unshift(row);
      this.localSave();
    },
    // 标记未完成
    unfinHandle(row, index, ev) {
      ev.preventDefault();
      this.finish.splice(index, 1);
      this.unfinish.unshift(row);
      this.localSave();
    },
    // 删除todo
    todoDelete(type, index) {
      this[type].splice(index, 1);
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
/deep/.el-collapse-item__header {
  flex-direction: row-reverse;
  justify-content: flex-end;
  .el-collapse-item__arrow {
    margin: 0;
  }
}
/deep/.el-collapse-item__content {
  padding-bottom: 0;
}
.side-todo {
  padding-top: 20px;
  overflow: hidden;
  background-color: var(--background-info);
  font-size: 14px;
  height: 100%;
  width: 100%;
  // 输入框
  .todo-input {
    input {
      color: rgba(var(--main-color), 0.8);
      padding: 0 10px;
      height: 60px;
      font-size: 16px;
      line-height: 40px;
      background: rgba(var(--main-color), 0.1);
      display: block;
      box-sizing: border-box;
      width: 100%;
    }
  }
  // 列表
  .todo-item {
    padding: 0 15px;
    input:checked {
      margin-right: 10px;
    }
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgba(var(--main-color), 0.9);
    min-height: 50px;
    line-height: 24px;
    border-bottom: 1px solid rgba(var(--main-color), 0.05);
    .todo-item-text {
      margin-left: 10px;
      flex: 1;
    }
    .todo-delete {
      display: none;
      color: rgba(var(--main-color), 0.4);
      transition: 0.2s;
      &:hover {
        color: rgba(var(--main-color), 0.5);
      }
    }
    &:hover {
      background-color: rgba(var(--main-color), 0.05);
      .todo-delete {
        display: block;
      }
    }
  }
  .todo-finish {
    .todo-item {
      .todo-item-text {
        text-decoration: line-through;
      }

      color: #999;
    }
  }
}
.finish-box {
  .finish-btn {
    padding: 0 10px;
    height: 40px;
    background-color: rgba(var(--main-color), 0.06);
    color: rgba(var(--main-color), 0.8);
    .icon {
      transition: 0.2s;
    }
  }
  &.active {
    .icon {
      transform: rotate(90deg);
    }
  }
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #777;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #777;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #777;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #777;
}
</style>