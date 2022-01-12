/*
 * @Author: web.王晓冬
 * @Date: 2020-10-15 21:52:45
 * @LastEditors: www.itab.link
 * @LastEditTime: 2022-01-13 00:13:08
 * @Description: setting 关于我
*/
<template>
  <div>
    <section class="set-section mt20">
      <h2>关于</h2>
      <ul class="set-about">
        <li>
          <a href="/" target="_blank"> 隐私政策 </a>
        </li>
        <li>
          <a href="/" target="_blank"> 联系我 </a>
        </li>
        <li @click="opentModal('反馈与建议')">反馈与建议</li>
        <li @click="opentModal('捐助我')">捐助我</li>
      </ul>
    </section>
    <el-dialog width="520px" :visible.sync="visible" :title="title">
      <div class="ac f14" v-show="title == '反馈与建议'">
        <p class="mb20">
          如需反馈问题、提供建议，请加作者微信：xdlumia,进入微信群
        </p>
        <img src="@/assets/xdlumia-min.jpg" alt="" />
      </div>
      <div class="give-reward" v-show="title == '捐助我'">
        <p class="mb10 ac f14" v-lh="20">
          如果觉得还不错，请随意打赏，您的支持将鼓励我做的更好。
          <br />请简单粗暴的爱我，爱你们，么么哒(╯ε╰)
        </p>
        <img src="@/assets/alipay-min.jpg" alt="" />
        <img src="@/assets/wechat-min.jpg" alt="" />
      </div>
    </el-dialog>
  </div>
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
    return {
      visible: false,
      title: "捐助我",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    opentModal(title) {
      this.title = title;
      this.visible = true;
    },
  },
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
.set-about {
  li,
  a {
    cursor: pointer;
    color: var(--primary-color);
  }
}
.give-reward {
  img {
    max-width: 50%;
  }
}
.main {
  line-height: 24px;
  strong {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>