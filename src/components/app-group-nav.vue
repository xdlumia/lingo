/*
 * @Author: web.王晓冬
 * @Date: 2020-10-12 17:48:38
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2021-06-09 15:46:42
 * @Description: 应用列表
*/
<template>
  <div class="d-flex-hor">
    <div
      class="app-group"
      @mousewheel="mousewheelHandle($event)"
      :class="{ zoomIn: setContent.startAnimation }"
    >
      <el-carousel
        ref="elCarousel"
        arrow="never"
        :height="`${(setContent.iconSize + 60) * layout[0]}px`"
        :autoplay="false"
        :initial-index="initialIndex"
        indicator-position="outside"
        :class="`layout-col-${layout[0]} layout-row-${layout[1]}`"
      >
        <el-carousel-item v-for="(groupRow, index) in navList" :key="index">
          <div
            class="app-group-item"
            :class="[{ swing: isEdit }, { scaleOut: item.delete }]"
            v-for="item of groupRow"
            :key="item.id"
          >
            <div
              @dragstart="ondrop"
              @dragleave="ondragover"
              draggable="true"
              class="group-item-content"
              @contextmenu.prevent="isEdit = true"
              @touchstart="gotouchstart()"
              @touchmove="gotouchmove()"
              @touchend="gotouchend()"
              v-size="setContent.iconSize"
              :title="item.title"
            >
              <!-- 图标操作 -->
              <div class="icon-item-handle" v-if="item.key != 'add'">
                <p
                  @click.stop="delHandle(item)"
                  class="icon-item-delete d-flex-center"
                  v-color="'#333'"
                >
                  <d-icon v-size="16" icon="icon-close" />
                </p>
                <p
                  @click="editHandle(item)"
                  class="icon-item-edit d-flex-center"
                  :style="{ borderRadius: `${setContent.iconRadius / 2}%` }"
                >
                  <d-icon v-size="34" icon="icon-edit" />
                </p>
              </div>
              <!-- 有可能是天气 -->
              <div
                @click.stop="urlTo(item)"
                class="group-weather group-item-icon"
                :style="[
                  { borderRadius: `${setContent.iconRadius / 2}%` },
                  {
                    backgroundColor: `rgba(var(--background),${
                      setContent.iconOpacity / 100
                    })`,
                  },
                ]"
                v-if="item.key == 'weather'"
              >
                <!-- 图标 -->
                <d-icon
                  v-size="'40%'"
                  :icon="`icon-${$weatherIcon[weatherData.now.cond_code]}`"
                />
                <p class="group-weather-info">
                  {{ weatherData.location }} {{ weatherData.now.cond_txt }}
                  {{ weatherData.now.tmp }}°
                </p>
              </div>
              <!-- backgroundColor 如果当前图标有 背景色就是用背景色 否则使用默认色 -->
              <div
                @click.stop="urlTo(item)"
                v-else
                v-font="setContent.iconSize"
                :style="[
                  {
                    backgroundColor: `${
                      item.bgColor
                        ? item.bgColor
                        : `rgba(var(--background),${
                            setContent.iconOpacity / 100
                          })`
                    }`,
                  },
                  { borderRadius: `${setContent.iconRadius / 2}%` },
                ]"
                class="group-item-icon d-flex-center"
              >
                <!--文字  -->
                <span
                  v-if="item.type == 2 && item.iconType == 'text'"
                  :style="{ color: item.bgColor ? '#fff' : '' }"
                  class="group-item-icon-font"
                  >{{ item.icon }}</span
                >
                <!-- 图片图标 -->
                <img
                  v-else-if="item.type == 2"
                  v-size="item.source ? '100%' : '38%'"
                  :src="item.icon"
                  alt=""
                />
                <!-- icon图标 -->
                <d-icon
                  v-else
                  v-size="'42%'"
                  v-color="item.color"
                  :icon="`icon-${item.key}`"
                />
              </div>
            </div>
            <p class="group-item-title f14 d-elip">
              <span v-show="setContent.iconTitle"> {{ item.title }}</span>
            </p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "sidebar",
  props: {},
  components: { draggable },
  data() {
    //这里存放数据
    return {
      myArray: [],
      initialIndex: 0,
      isEdit: false,
      //0 web 1 app 2 自定义
      // navList: navList,
      timer: true,
      delta: "", //鼠标滚轮方向
      timeOutEvent: null,
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    document.addEventListener(
      "click",
      () => {
        this.isEdit = false;
      },
      false
    );
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  computed: {
    // 获取所有菜单并分组
    navList() {
      let navList = this.$store.state.navList;
      let objList = {};
      let navNum = navList.length; //获取菜单总数
      let pageSize = this.layout[0] * this.layout[1]; //每页数量
      navList.forEach((item, index) => {
        let page = Math.floor(index / pageSize);
        if (objList[page]) {
          objList[page].push(item);
        } else {
          objList[page] = [item];
        }
      });
      return objList;
    },
    //设置内容
    setContent() {
      return this.$store.state.setContent || {};
    },
    // 布局设置
    layout() {
      return this.$store.state.setContent.layout || [2, 8];
    },
    // 天气数据
    weatherData() {
      return this.$store.state.weather || {};
    },
  },
  watch: {},
  //方法集合
  methods: {
    ondrop() {
      console.log(11);
    },

    ondragover() {
      console.log("ondragover");
    },
    scrollLoop() {
      let length = Object.keys(this.navList).length || 0;
      //上滚
      if (this.delta > 0) {
        this.initialIndex++;
        if (this.initialIndex >= length) {
          this.initialIndex = 0;
        }
      }
      //下滚
      if (this.delta < 0) {
        this.initialIndex--;

        if (this.initialIndex < 0) {
          this.initialIndex = length - 1;
        }
      }

      this.$refs.elCarousel.setActiveItem(this.initialIndex);
    },
    mousewheelHandle(ev) {
      this.delta = -ev.wheelDelta || ev.detail;

      if (this.timer) {
        this.timer = false;
        this.scrollLoop();
        setTimeout(() => {
          this.timer = true;
        }, 260);
      }
    },
    urlTo(row) {
      if (row.type == 0 || row.type == 2) {
        window.open(row.url, "_blank");
      } else {
        let editType = row.key == "add" ? "add" : "";
        this.$store.commit("setShowSide", {
          val: true,
          comp: row.key,
          editType: editType,
        });
      }
    },
    delHandle(row) {
      let navList = this.$store.state.navList;
      let index = navList.findIndex((v) => v.id == row.id);
      navList[index].delete = true;
      navList.splice(index, 1, navList[index]);
      setTimeout(() => {
        navList[index].delete = false;
        navList.splice(index, 1);
        this.$store.commit("setNavList", navList);
      }, 200);
    },
    editHandle(row) {
      this.$store.commit("setShowSide", {
        val: true,
        comp: "add",
        editType: "edit",
      });
      this.$store.commit("setNavRowData", row);
    },
    gotouchstart(row) {
      let that = this;
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
      this.timeOutEvent = setTimeout(() => {
        //执行长按要执行的内容，
        this.isEdit = true;
      }, 600); //这里设置定时
    },
    //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
    gotouchend() {
      clearTimeout(this.timeOutEvent);
      if (this.timeOutEvent != 0) {
        //这里写要执行的内容（尤如onclick事件）
      }
    },
    //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    gotouchmove() {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    },
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
};
</script>
<style lang='less'>
.group-weather {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  position: relative;
  text-align: center;

  &-info {
    text-align: center;
    font-size: 12px;
    transform: scale(0.9);
    color: rgba(var(--main-color), 0.8);
  }
}
.app-group {
  margin-top: 30px;
  width: 1300px;
  padding: 0 20px;
  overflow: hidden;
  &-item {
    transition-duration: 0.2s;
    text-align: center;
    cursor: pointer;
    width: calc(100% / 5);
    display: inline-block;
    margin-top: 30px;
    .group-item-title {
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      overflow: hidden;
    }
    .group-item-content {
      margin: 0 auto;
      position: relative;
      .group-item-icon {
        transition-duration: 0.2s;
        box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
        height: 100%;
        overflow: hidden;
        backdrop-filter: blur(3px);
        &:hover {
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
        }
        .group-item-icon-font {
          font-weight: 500;
          text-transform: uppercase;
          font-size: 0.3em;
          color: rgba(var(--main-color), 1);
        }
      }
      .icon-item-handle {
        opacity: 1;
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
      }
      .icon-item-handle {
        display: none;
        z-index: 9;
        .icon-item-delete {
          .icon {
            cursor: auto;
          }
          z-index: 11;
          position: absolute;
          backdrop-filter: blur(10px);
          box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
          right: -5px;
          top: -5px;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background-color: #efefef;
        }
        .icon-item-edit {
          opacity: 0;
          transition-duration: 0.2s;
          z-index: 10;
          position: absolute;
          left: 0;
          top: 0;
          backdrop-filter: blur(10px);
          height: 100%;
          width: 100%;
          color: #333;
          background-color: rgba(255, 255, 255, 0.5);
          &:hover {
            opacity: 1;
          }
        }
      }

      &:active {
        transform: scale(0.95);
      }
    }
    &.swing {
      .icon-item-handle {
        display: block;
      }
    }
  }

  &.active {
    transform: translateX(0);
  }
}
.layout-col-3 {
  .app-group-item {
    margin-top: 25px;
  }
}
.layout-row-2 {
  .app-group-item {
    width: calc(100% / 2);
  }
}
.layout-row-3 {
  .app-group-item {
    width: calc(100% / 3);
  }
}
.layout-row-4 {
  .app-group-item {
    width: calc(100% / 4);
  }
}
.layout-row-5 {
  .app-group-item {
    width: calc(100% / 5);
  }
}
.layout-row-6 {
  .app-group-item {
    width: calc(100% / 6);
  }
}
.layout-row-7 {
  .app-group-item {
    width: calc(100% / 7);
  }
}
.layout-row-8 {
  .app-group-item {
    width: calc(100% / 8);
  }
}
</style>