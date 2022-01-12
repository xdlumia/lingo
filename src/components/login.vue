/*
 * @Author: web.王晓冬
 * @Date: 2020-10-15 21:52:45
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-12-07 16:43:44
 * @Description: 注册
*/
<template>
  <div>
    <el-dialog title="欢迎使用" width="420px" :visible.sync="loginInfo.visible">
      <div class="pl20 pr20">
        <p class="login-tip">
          {{ loginInfo.type == "reg" ? "注册" : "登录" }}后可实现数据备份等功能
        </p>
        <el-form :model="loginForm" ref="loginForm" label-position="right">
          <el-form-item
            prop="loginName"
            :rules="{ required: true, message: '账号不能为空' }"
          >
            <el-input
              maxlength="18"
              size="medium"
              v-model="loginForm.loginName"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="{ required: true, message: '密码不能为空' }"
          >
            <el-input
              show-password
              size="medium"
              type="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="notarize"
            v-if="loginInfo.type == 'reg'"
            :rules="{ required: true, message: '密码确认不能为空' }"
          >
            <el-input
              show-password
              size="medium"
              type="notarize"
              v-model="loginForm.notarize"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
          <el-button
            @click="loginOrRegHandle"
            size="mediun"
            type="primary"
            class="wfull mb50 mt20"
            >立即{{ loginInfo.type == "reg" ? "注册" : "登录" }}</el-button
          >
        </el-form>

        <div
          v-loading="loading"
          class="ac mt20"
          v-if="loginInfo.type == 'login'"
        >
          还没有账号？<el-button type="text" @click="loginHandle('reg')"
            >立即注册</el-button
          >
        </div>
        <div class="ac mt20" v-if="loginInfo.type == 'reg'">
          已有账号？<el-button type="text" @click="loginHandle('login')"
            >立即登陆</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { encode } from "js-base64";
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name: "",
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      loading: false,
      loginForm: {
        loginName: "",
        password: "",
        notarize: "", //确认密码
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    loginInfo() {
      return this.$store.state.loginInfo || {};
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
    // 登陆注册
    loginOrRegHandle() {
      this.$refs.loginForm.validate((res) => {
        if (!res) return;
        this.loading = true;
        let type = "login";
        if (this.loginInfo.type == "reg") {
          if (this.loginForm.password != this.loginForm.notarize) {
            this.$message.error("两次输入的密码不一致,请重新输入");
            return;
          }
          type = "register";
        }
        let params = {};
        params.loginName = this.loginForm.loginName;
        params.password = encode(this.loginForm.password);
        this.$http[type](params)
          .then((res) => {
            if (res.code != 200) return;
            this.$message({
              type: "success",
              message: `${type == "login" ? "登陆" : "注册"}成功`,
              showClose: true,
            });
            // 用户信息保存到本地
            this.$store.commit("setUserInfo", res.data);
            // 调用登陆的弹出框
            this.$store.commit("setLoginInfo", {
              visible: false,
              type: type,
            });
            // 登录成功后初始化配置
            this.$store.dispatch("initSetting");
          })
          .finally(() => {
            this.loading = false;
          });
      });
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