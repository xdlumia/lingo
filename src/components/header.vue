<template>
  <div class="app-header">
    <div
      @click="$store.commit('setShowSide', { val: true, comp: 'weather' })"
      class="header-webther fl d-flex-ver d-pointer"
    >
      <svg v-size="22" class="icon ml5" aria-hidden="true">
        <use :xlink:href="`#icon-${$weatherIcon[weatherData.now.cond_code]}`" />
      </svg>
      <span class="wea">{{ weatherData.now.tmp }}</span>

      <em class="super">{{ airType }}</em>
    </div>
    <div class="header-setting fr">
      <d-icon
        icon="icon-setting"
        title="设置"
        @click="$store.commit('setShowSide', { val: true, comp: 'setting' })"
        class="icon-handle d-inline f24"
      ></d-icon>
      <d-icon
        icon="icon-add"
        title="添加网站"
        @click="$store.commit('setShowSide', { val: true, comp: 'add' })"
        class="icon-handle d-inline f24 ml10"
      ></d-icon>
    </div>
    <div id="aMap" class="d-hide"></div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      weatherData: { now: {} },
      currentPosition: {}, //当前位置
      airType: "°C",
      timer: null,
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCityLocal();
    this.timerGetCityLocal();

    // 定时获取天气
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    timerGetCityLocal() {
      this.timer = setInterval(() => {
        this.getCityLocal();
      }, 1000 * 60 * 60);
    },

    // 根据坐标获取城市编码
    getCityLocal() {
      this.$http
        .getCityLocal()
        .then((res) => {
          return res.data || {};
        })
        .then((res) => {
          this.currentPosition = res;
          this.getWeather(res.id);
        });
    },
    // 定时获取天气
    timerWeather() {
      this.timer = setInterval(() => {
        this.getWeather(this.currentPosition.cid);
      }, 5000);
    },
    // 获取天气
    getWeather(city) {
      this.$http.getWeather(city).then((res) => {
        if (res.status != "ok") return;
        this.weatherData = res || {};
        this.weatherData.location = this.currentPosition.name;
        this.moment(res.sun);
        this.$store.commit("setWeather", this.weatherData);
      });
    },
    // 判断白天晚上
    moment(sun) {
      let nowDate = dayjs().format("YYYY-MM-DD");
      let rise = new Date(`${nowDate} ${sun.rise}`).getTime(); //日出
      let set = new Date(`${nowDate} ${sun.set}`).getTime(); //日落

      let nowTamp = dayjs().valueOf();
      let moment = nowTamp > rise && nowTamp < set ? "d" : "n";

      // 如果当前时间大于日出时间 并且小于日落时间 那就是白天
      this.$store.commit("setMoment", moment);
    },
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroyed() {
    this.timer = null;
    clearInterval(this.timer);
  },
};
</script>
<style lang='less' scoped>
//@import url();
.app-header {
  overflow: hidden;
  max-height: 64px;
  min-height: 50px;
  padding: 20px 50px;
  color: #fff;
  .header-webther {
    .super {
      // vertical-align: super;
      font-size: 12px;
      color: #ddd;
      margin-top: -3px;
    }
    .icon {
      color: #fff;
    }
    .wea {
      font-size: 20px;
      margin-left: 8px;
      margin-right: 6px;
    }
  }
}
.header-setting {
  .icon-handle {
    transition: 0.5s;
    cursor: pointer;
    opacity: 0.4;
    &:hover {
      transform: rotate(90deg);
      opacity: 0.9;
    }
  }
}
</style>
