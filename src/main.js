/*
 * @Author: web.王晓冬
 * @Date: 2020-10-10 18:03:48
 * @LastEditors: www.itab.link
 * @LastEditTime: 2022-01-12 22:53:47
 * @Description: file content
 */
import Vue from 'vue'
import App from './App.vue'




import directives from '@/utils/directives';
import filters from '@/utils/filters';
import local from '@/utils/localStrong';
import utils from '@/utils/utils';
import http from '@/api/index';
// import dModal from '@/components/public/d-modal';
import dTabs from '@/components/public/d-tabs';
import dIcon from '@/components/public/d-icon';

import '@/iconfont/iconfont.js'

import '@/style/index.less'
// store
import store from '@/store/index';

// fade/zoom 等
import {
  Button,
  Row,
  Col,
  Switch,
  Image,
  Slider,
  Tooltip,
  Carousel,
  CarouselItem,
  Message,
  Checkbox,
  MessageBox,
  Dialog,
  Tabs,
  TabPane,
  Input,
  Form,
  FormItem,
  Loading,
  InfiniteScroll
} from 'element-ui';

Dialog.props.closeOnPressEscape.default = false
Dialog.props.closeOnClickModal.default = false
Slider.props.showTooltip.default = false
Dialog.props.appendToBody.default = true
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Switch);
Vue.use(Image);
Vue.use(Slider);
Vue.use(Tooltip);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Loading);
Vue.use(InfiniteScroll);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
// 自定义组件
// Vue.component('dModal', dModal);
Vue.component('dIcon', dIcon);
Vue.component('dTabs', dTabs);


// 添加过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
// 添加自定义指令
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))
// 天气编码
const weatherIcon = {
  100: 'qing',
  101: 'yun',
  102: 'yun',
  103: 'yun',
  104: 'yin',
  150: 'qing-night',
  153: 'yun-night',
  154: 'yin',
  300: 'shower',
  301: 'shower',
  302: 'thunder-shower',
  303: 'thunder-shower',
  304: 'thund-shower-hail',
  305: 'rain1',
  306: 'rain2',
  307: 'rain3',
  308: 'rain3',
  309: 'rain1',
  310: 'xiaobaoyu',
  311: 'baoyu',
  312: 'baoyu',
  313: 'sleet',
  400: 'snow1',
  401: 'snow2',
  402: 'snow3',
  403: 'blizard',
  404: 'sleet',
  405: 'sleet',
  406: 'sleet',
  407: 'snow-shower',
  500: 'wu',
  501: 'wu',
  502: 'haze',
  503: 'sandstorm',
  504: 'sandstorm',
  507: 'sandstorm',
  508: 'sandstorm',
  509: 'wu',
  510: 'wu',
  511: 'haze',
  512: 'haze',
  513: 'haze',
  514: 'wu'
}
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$local = local
Vue.prototype.$util = utils
Vue.prototype.$weatherIcon = weatherIcon
new Vue({
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('initSetting')
  },
}).$mount('#app')