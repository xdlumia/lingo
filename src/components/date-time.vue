/*
 * @Author: web.王晓冬
 * @Date: 2020-10-14 16:38:27
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-05-31 11:12:13
 * @Description: 时间
*/
<template>
  <div class="app-date-box ac">
    <p class="app-time">{{ time }}</p>
    <p class="app-date">{{ date }} 星期{{ week }}</p>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      time: "",
      date: "",
      week: "",
      timer: null, //定时器
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 初始化获取天气
    this.getTimeing();
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    // 定时获取时间
    getTimeing() {
      // 即时获取时间
      this.getTime();
      this.moment();
      this.timer = setInterval(() => {
        this.moment();
        this.getTime();
      }, 30000);
    },
    // 即时获取时间
    getTime() {
      let week = {
        1: "一",
        2: "二",
        3: "三",
        4: "四",
        5: "五",
        6: "六",
        7: "日",
      };
      this.date = dayjs().format("MM月DD日");
      this.time = dayjs().format("HH:mm");
      this.week = week[dayjs().day()];
    },
    // 判断白天晚上
    moment() {
      let nowDate = dayjs().format("YYYY-MM-DD");

      let rise = new Date(
        `${nowDate} ${this.$store.state.weather.sun.rise}`
      ).getTime(); //日出
      let set = new Date(
        `${nowDate} ${this.$store.state.weather.sun.set}`
      ).getTime(); //日落

      let nowTamp = dayjs().valueOf();
      let moment = nowTamp > rise && nowTamp < set ? "d" : "n";

      // 如果当前时间大于日出时间 并且小于日落时间 那就是白天
      this.$store.commit("setMoment", moment);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroyed() {
    this.timer = null;
    clearInterval(this.timer);
  },
};
</script>
<style lang='less' scoped>
//@import url();
.app-date-box {
  color: #fff;
  margin-bottom: 20px;
  .app-time {
    color: #fff;
    line-height: 50px;
    font-size: 50px;
  }
  .app-date {
    font-size: 12px;
    line-height: 26px;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
