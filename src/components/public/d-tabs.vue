/*
 * @Author: web.王晓冬
 * @Date: 2020-10-27 16:37:58
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-27 16:57:46
 * @Description: file content
*/
<template>
  <ul class="d-tabs">
    <li
      class="d-tabs-item"
      v-for="(row, index) of data"
      :key="index"
      :class="{ active: value == index }"
      @click="tabClick(row, index)"
    >
      {{ row.label || row }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "",
  props: {
    value: {
      required: true,
    },
    data: {
      required: true,
      type: [Array, Object],
      default: () => [],
    },
  },
  components: {},
  data() {
    return {};
    //这里存放数据
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {},
  watch: {},
  //方法集合
  methods: {
    tabClick(row, index) {
      this.$emit("input", index);
      this.$emit("tab-click", row, index);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.d-tabs {
  .d-tabs-item {
    cursor: pointer;
    text-align: center;
    flex: 1;
    color: rgba(var(--main-color), 1);
    border-bottom: 1px solid transparent;
    display: inline-block;
    padding: 0 20px;
    &.active {
      background-color: rgba(var(--main-color), 0.02);
      color: var(--primary-color);
      border-color: var(--main-color);
    }
    &:hover {
      color: var(--primary-color);
    }
  }
  line-height: 40px;
  background-color: rgba(var(--main-color), 0.06);
  color: rgba(var(--color), 1);
}
</style>