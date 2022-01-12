/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 18:03:48
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-01-19 17:17:46
 * @Description: add 添加和修改图标
*/
<template>
  <div class="side-add">
    <d-tabs
      class="d-flex-between"
      v-model="tabIndex"
      :data="['默认', '自定义']"
    />
    <!-- 默认捷径 -->
    <defaults v-show="tabIndex == 0" />

    <!-- 自定义添加捷径 -->
    <div class="mt20 pl20 pr20" v-show="tabIndex == 1">
      <div>
        <input
          @input="getIcon"
          class="add-input"
          v-model.trim="addForm.title"
          maxlength="20"
          placeholder="标题"
          type="text"
        />
        <input
          class="add-input"
          v-model.trim="addForm.url"
          placeholder="网址"
          @input="getIcon"
          type="text"
        />
        <p style="color: #e74c3c" class="f12">{{ tips }}</p>
        <div class="app-group mb20 d-flex-ver" style="width: auto">
          <div class="app-group-item mt0" style="width: auto">
            <div class="group-item-content" v-size="setContent.iconSize">
              <!-- 图标 -->

              <div
                class="group-item-icon d-flex-center"
                :style="[
                  {
                    backgroundColor: `${
                      addForm.bgColor
                        ? addForm.bgColor
                        : `rgba(var(--background),${
                            setContent.iconOpacity / 100
                          })`
                    }`,
                  },
                  { borderRadius: `${setContent.iconRadius / 2}%` },
                  { fontSize: `${setContent.iconSize}px` },
                ]"
              >
                <span
                  v-if="addForm.type == 2 && addForm.iconType == 'text'"
                  :style="{ color: addForm.bgColor ? '#fff' : '' }"
                  class="group-item-icon-font"
                  >{{ addForm.icon }}</span
                >
                <img
                  v-else-if="addForm.type == 2"
                  @error="imgError"
                  v-size="'36%'"
                  :src="addForm.icon"
                  alt=""
                />
                <d-icon
                  v-else
                  v-size="'40%'"
                  v-color="addForm.color"
                  :icon="`icon-${addForm.key}`"
                />
              </div>
            </div>
          </div>
          <div class="add-icon-info ml10">
            输入完整链接后会自动获取网站图标<br />
            如果图标获取失败会以标题前两个字符作为名称
          </div>
        </div>
        <ul class="add-color d-pointer d-flex-between">
          <li
            class="add-color-item"
            @click="selBgColor(item)"
            v-for="item of colorList"
            :class="[
              `color-item-select-${item == addForm.bgColor ? true : false}`,
              `color-item-${item}`,
            ]"
            :key="item"
            :style="[{ backgroundColor: item }, { borderColor: item }]"
          ></li>
        </ul>
        <el-button type="primary" class="wfull mt20" @click="submit">
          确定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import defaults from "./add/default";
function isURL(domain) {
  var name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
  if (!name.test(domain)) {
    return false;
  } else {
    return true;
  }
}
function formatUrl(url) {
  if (
    url.substr(0, 7).toLowerCase() == "http://" ||
    url.substr(0, 8).toLowerCase() == "https://" ||
    url.substr(0, 2).toLowerCase() == "http://"
  ) {
    return url;
  } else {
    return "http://" + url;
  }
}
export default {
  title: "新增",
  name: "add",
  props: {},
  components: { defaults },
  data() {
    //这里存放数据
    return {
      tabIndex: 0,
      colorList: [
        "",
        "#1abc9c",
        "#2ecc71",
        "#33c5c5",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
      ],
      tips: "",
      addForm: {
        title: "",
        url: "",
        bgColor: "",
        type: 2,
        icon: "",
        iconType: "text",
        color: "",
        key: "",
        id: "",
      },
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {
    //设置内容
    setContent() {
      return this.$store.state.setContent || {};
    },
    editType() {
      return this.$store.state.editType;
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
  watch: {
    "$store.state.navRowData": {
      handler(val) {
        for (let key in this.addForm) {
          this.addForm[key] = val[key] || "";
        }
        this.init(val);
      },
      deep: true,
      immediate: true,
    },
    "$store.state.isShowSide": {
      handler(val) {
        if (val && this.editType == "add") {
          this.init();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  //方法集合
  methods: {
    init() {
      if (this.editType != "edit") {
        this.tabIndex = 0;
        this.addForm = {
          title: "",
          url: "",
          bgColor: "",
          type: 2,
          icon: "",
          iconType: "text",
          color: "",
          key: "",
          id: "",
        };
      } else {
        this.tabIndex = 1;
      }
    },
    // 选择图片背景
    selBgColor(item) {
      this.addForm.bgColor = item;
    },
    // 提交
    submit() {
      if (!this.addForm.title) {
        this.tips = "请输入标题";
        return;
      }
      if (!isURL(this.addForm.url)) {
        this.tips = "请输入正确的网址";
        return;
      }

      this.addForm.url = formatUrl(this.addForm.url);

      if (this.editType == "edit") {
        let url = this.addForm.url;
        let index = this.navList.findIndex((v) => v.id == this.addForm.id);
        let cloneData = this.$util.deepClone(this.addForm);
        this.navList.splice(index, 1, cloneData);
        this.$store.commit("setNavList", this.navList);
        this.$store.commit("setShowSide", { val: false });
        this.$message.success("修改成功");
      } else {
        this.addForm.id = dayjs().valueOf(); //当前时间戳作为id
        let length = this.navList.length;
        let cloneData = this.$util.deepClone(this.addForm);
        this.navList.splice(length - 1, 0, cloneData);
        this.$store.commit("setNavList", this.navList);
        this.$message.success("添加成功");
      }
    },
    getIcon() {
      if (!this.addForm.title) {
        this.tips = "请输入标题";
      } else if (!isURL(this.addForm.url)) {
        this.tips = "请输入正确的网址";
      } else {
        this.tips = "";
      }

      let url = this.addForm.url;
      if (isURL(url)) {
        this.addForm.icon = `${formatUrl(url)}/favicon.ico`;
        this.addForm.iconType = 1;
      } else {
        this.imgError();
      }
    },
    imgError() {
      this.addForm.iconType = "text";
      this.addForm.icon = this.addForm.title.substr(0, 2);
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less' scoped>
.side-add {
  overflow: hidden;
  background-color: var(--background-info);
  font-size: 14px;
  height: 100%;
  width: 100%;
  .add-input {
    font-size: 14px;
    color: rgba(var(--main-color), 0.8);
    border-radius: 3px;
    padding: 0 10px;
    margin-bottom: 20px;
    line-height: 40px;
    background: rgba(var(--main-color), 0.1);
    display: block;
    box-sizing: border-box;
    width: 100%;
  }
  .add-color {
    .add-color-item {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-clip: content-box;
      border: 1px solid;
      box-sizing: content-box;
      padding: 2px;
      transition: 0.2s;
      box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.15);
      &:hover {
        transform: scale(1.2);
      }
    }

    .color-item-select-false {
      border-color: transparent !important;
    }
  }
  .add-icon-preview {
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
.color-item- {
  background-size: 35%;
  background-image: url("../../assets/transparent.png");
  border-color: #666 !important;
}
.add-icon-info {
  line-height: 20px;
  font-size: 14px;
  color: rgba(var(--main-color), 0.6);
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