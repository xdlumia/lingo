/*
 * @Author: web.王晓冬
 * @Date: 2020-10-15 21:52:45
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-27 15:12:48
 * @Description: setting 主题
*/
<template>
  <section class="set-section">
    <h2>主题</h2>
    <ul>
      <li class="d-flex-between">
        深色模式
        <el-switch
          v-model="themeMode"
          :disabled="$store.state.setContent.sunrise"
          active-value="dark"
          inactive-value="light"
        ></el-switch>
      </li>
      <li class="d-flex-between">
        <div>
          跟随日出日落
          <span class="f12" v-color="'rgba(var(--main-color),.4)'">
            日出:{{ $store.state.weather.sun.rise }},日落:{{
              $store.state.weather.sun.set
            }}
          </span>
        </div>
        <el-switch v-model="sunrise"></el-switch>
      </li>
    </ul>
  </section>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "",
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    themeMode: {
      get() {
        return this.$store.state.setContent.themeMode;
      },
      set(val) {
        let setContent = this.$store.state.setContent;
        setContent.themeMode = val;
        this.$store.commit("setSetContent", setContent);
      },
    },
    sunrise: {
      get() {
        return this.$store.state.setContent.sunrise;
      },
      set(val) {
        let setContent = this.$store.state.setContent;
        setContent.sunrise = val;
        // setContent.themeMode = false;
        this.$store.commit("setSetContent", setContent);
      },
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
</style>