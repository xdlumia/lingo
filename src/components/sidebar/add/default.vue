<template>
  <div class="default-nav">
    <el-input
      class="p5"
      maxlength="10"
      clearable
      placeholder="请输入网站名称"
      v-model="queryForm.name"
      size="small"
      @clear="queryHandle"
      @keyup.native.13="queryHandle"
    >
      <i class="el-icon-search el-input__icon d-block" slot="prefix" @click="queryHandle()"></i>
    </el-input>
    <div class="d-flex">
      <ul class="class-box d-elip">
        <li class="pl20" @click="tabClick({ type: -1 })" :class="{ active: tabActive == -1 }">常用网站</li>
        <li
          @click="tabClick(item)"
          :class="{ active: tabActive == item.type }"
          v-for="item of categoryData"
          :key="item.type"
        >{{ item.name }}</li>
      </ul>
      <div
        class="default-box"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="tabActive == -1"
      >
        <div
          class="app-group layout-row-2 p0 mt0"
          style="width: auto; margin-top: -20px"
          v-loading="loading"
        >
          <div class="ac" v-if="!defaultNavList.length">暂无数据</div>
          <template v-for="(row, index) of defaultNavList">
            <div class="app-group-item mb10" v-if="row.key != 'add'" :key="index">
              <div class="group-item-content" v-size="80">
                <!-- 图标 -->

                <i
                  @click.stop="selNav(row)"
                  v-show="!navListIds.includes(row.id)"
                  class="icon-item unselect el-icon-success"
                ></i>
                <i
                  @click.stop="selNav(row)"
                  v-show="navListIds.includes(row.id)"
                  class="icon-item select el-icon-success"
                ></i>

                <div
                  @click.stop="urlTo(row)"
                  class="group-item-icon d-flex-center d-hidden"
                  v-font="setContent.iconSize"
                  :style="{
                    backgroundColor: `rgba(var(--background),${setContent.iconOpacity / 100
                      }`,
                    borderRadius: `${setContent.iconRadius / 2}%`,
                  }"
                >
                  <el-tooltip v-if="row.type == 2" effect="dark" placement="top">
                    <div style="max-width: 300px" slot="content">{{ row.description || row.title }}</div>
                    <img v-size="row.source ? '100%' : '38%'" :src="row.icon" :alt="row.title" />
                  </el-tooltip>
                  <d-icon v-else v-size="'40%'" v-color="row.color" :icon="`icon-${row.key}`" />
                </div>
                <p
                  class="group-item-title f12 d-elip"
                  style="padding: 0"
                  :title="row.title"
                  :style="{ color: `rgba(var(--main-color),.8)` }"
                >
                  <span>{{ row.title }}</span>
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navList } from "@/json";

const categoryData = [
  // { name: "受欢迎的", type: "popular" },

];
export default {
  name: "",
  props: {},
  components: {},
  data() {
    //这里存放数据
    return {
      tabActive: -1,
      loading: false,
      defaultNavList: navList, //默认捷径
      queryForm: { type: -1, name: "", page: 1, size: 50 },
      // 分类
      categoryData: categoryData,
      // 网站列表
      websiteData: [],
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  computed: {
    //设置内容
    setContent() {
      return this.$store.state.setContent || {};
    },
    // 当前用户用到的菜单]
    navList() {
      return this.$store.state.navList;
    },
    // 桌面存在的捷径id
    navListIds() {
      return this.$store.state.navList.map((row) => row.id);
    },
  },
  watch: {},
  //方法集合
  //方法集合
  methods: {
    tabClick(item) {
      document.querySelector(".default-box").scrollTop = 0;
      this.tabActive = item.type;
      this.queryForm.type = item.type;
      if (this.tabActive == -1) {
        this.queryForm.type = "";
      }

      this.queryForm.page = 1;
      if (this.tabActive == -1) {
        // index==-1是 定义的默认图标
        this.defaultNavList = navList;
      }
    },
    queryHandle() {
      this.queryForm.type = "";
      this.queryForm.page = 1;
      this.tabActive = "";
    },


    urlTo(row) {
      if (row.type == 0 || row.type == 2) {
        window.open(row.url, "_blank");
      } else {
        this.$message.warning("当前图标属于应用");
        return;
        let editType = row.key == "add" ? "add" : "";
        this.$store.commit("setShowSide", {
          val: true,
          comp: row.key,
          editType: editType,
        });
      }
    },
    // 点击添加捷径
    selNav(row) {
      // 判断当前图标是否存在首页列表中
      let idIndex = this.navListIds.findIndex((v) => v == row.id);
      // 如果没有当前图标添加 否则删除
      if (idIndex == -1) {
        let length = this.navList.length;
        // 因为最后一个图标是添加 所以要插入倒数第二位
        this.navList.splice(length - 1, 0, row);
      } else {
        let navListIndex = this.navList.findIndex((v) => v.id == row.id);
        this.navListIds.splice(idIndex, 1);
        this.navList.splice(navListIndex, 1);
      }
      this.$store.commit("setNavList", this.navList);
    },
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.default-nav {
  .class-box,
  .default-box {
    height: calc(100vh - 146px);
    overflow-y: auto;
    flex: 1;
  }
  .class-box {
    flex: 1;
    min-width: 140px;
    max-width: 140px;
    background-color: rgba(0, 0, 0, 0.1);
    li {
      padding: 0 25px;
      line-height: 40px;
      font-size: 14px;
      cursor: pointer;
      color: rgba(var(--main-color), 0.7);
      &.active {
        color: #1e6fff;
      }
      &:hover {
        background: rgba(var(--main-color), 0.1);
      }
    }
  }
  .group-item-content {
    &:active {
      transform: scale(1) !important;
    }

    .icon-item {
      font-size: 28px;
      border-radius: 50%;
      position: absolute;
      z-index: 2;
      right: 0px;
      bottom: 0px;
      &.unselect {
        color: #ddd;
        display: none;
      }
      &:hover {
        color: #3d923b;
      }

      &.select {
        color: #06af02;
        &:hover {
          &:before {
            content: "\e79d";
            color: #e6162d;
          }
        }
      }
    }
    &:hover {
      .unselect {
        display: block;
      }
    }
  }
}
</style>