/*
 * @Author: web.王晓冬
 * @Date: 2020-10-15 21:52:45
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-12-07 17:00:49
 * @Description: setting 主题
*/
<template>
  <div>
    <section class="set-section">
      <h2>账号与备份</h2>
      <ul v-if="Object.keys(userInfo).length">
        <li>
          <el-button type="text">{{ userInfo.loginName }}</el-button>
          <el-button class="fr" type="priamry" size="mini" @click="logout"
            >退出登陆</el-button
          >
        </li>

        <li>
          <el-button type="text" @click="bakHandle">手动备份数据</el-button>
        </li>
      </ul>
      <ul v-else>
        <li>
          <el-button
            class="wfull"
            size="medium"
            type="primary"
            @click="loginHandle('login')"
            >登录</el-button
          >
        </li>
        <li class="mt10">
          <el-button
            class="wfull"
            type="text"
            size="medium"
            @click="loginHandle('reg')"
            >注册</el-button
          >
        </li>
      </ul>
    </section>
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
    return {};
  },
  //监听属性 类似于data概念
  computed: {
    userInfo() {
      return this.$store.state.userInfo || {};
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    loginHandle(type) {
      let data = {
        visible: true,
        type: type,
      };
      this.$store.commit("setLoginInfo", data);
    },
    logout() {
      this.$message.success("退出成功");
      this.$store.commit("setUserInfo", "");
    },
    // 手动备份
    bakHandle() {
      this.$store.dispatch("saveConfig");
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
.login-tip {
  font-size: 12px;
  margin-bottom: 20px;
  color: rgba(var(--main-color), 0.5);
}
</style>