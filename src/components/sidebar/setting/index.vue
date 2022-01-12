/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 18:03:48
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-12-04 14:47:33
 * @Description: setting 设置
*/
<template>
  <div class="side-comp-box">
    <!-- 账号与备份 -->
    <user />
    <!-- 外观 -->
    <theme />
    <!-- 外观 -->
    <exterior />
    <!-- 壁纸 -->
    <wallpaper />
    <section class="set-section mt20">
      <ul>
        <li class="d-flex-between">
          初始化设置

          <el-button size="mini" type="primary" @click="resetSet"
            >重置</el-button
          >
        </li>
      </ul>
    </section>
    <!-- 关于我 -->
    <about />
  </div>
</template>

<script>
import user from "./user";
import exterior from "./exterior";
import wallpaper from "./wallpaper";
import theme from "./theme";
import about from "./about";

export default {
  name: "",
  props: {},
  components: { exterior, wallpaper, theme, about, user },
  data() {
    //这里存放数据
    return {};
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  watch: {},
  //方法集合
  methods: {
    resetSet() {
      this.$confirm(
        "此操作将清空您的喜好设置!  您的便笺和待办事项不会清空,是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      ).then(() => {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
      // let submit = confirm(
      //   "此操作将清空您的喜好设置!  您的便笺和待办事项不会清空"
      // );
      // if (submit) {
      //   this.$local.remove("setContent");
      //   this.$local.remove("navList");
      //   this.$local.remove("wallpaper");
      //   location.reload();
      // }
    },
  },
};
</script>
<style lang='less'>
.side-comp-box {
  padding: 0 20px 10px;
  background-color: var(--background-info);
  font-size: 14px;
  height: 100%;
  width: 100%;

  .set-section {
    color: rgba(var(--main-color), 0.7);
    line-height: 30px;
    & > ul {
      background-color: rgba(var(--main-color), 0.05);
      padding: 10px;
      border-radius: 5px;
    }
    h3 {
      color: rgba(var(--main-color), 1);
    }
    h2 {
      color: rgba(var(--main-color), 1);
      line-height: 50px;
      font-size: 16px;
    }
  }
}
</style>