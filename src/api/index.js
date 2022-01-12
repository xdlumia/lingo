/*
 * @Author: web.王晓冬
 * @Date: 2020-10-13 08:52:34
 * @LastEditors: www.itab.link
 * @LastEditTime: 2022-01-13 00:12:54
 * @Description: file content
 */
import axios from 'axios'
import store from '@/store'

import {
  Message
} from 'element-ui'
import local from '@/utils/localStrong';
import QS from 'querystring';
axios.defaults.paramsSerializer = function (params) {
  return QS.stringify(params);
};

axios.interceptors.request.use(config => {
  // config.headers.token = (local.get('userInfo') || {}).token || ''
  return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
  let res = response.data
  if (res.code == 500) {
    Message.error(res.msg)
  } else if (res.code == 400) {
    Message.error('登陆已过期,请重新登陆')
    // 清空用户信息
    store.commit('setUserInfo', null)
    // 调用登陆的弹出框
    store.commit("setLoginInfo", {
      visible: true,
      type: 'login',
    });
  }
  return response.data
})

let baseUrl = 'http://localhost:8081' //振兴
let dreamwqApi = 'http://localhost:8081' //api
// let dreamwqApi = 'http://localhost:8081' //api
// let baseUrl = 'apis/'

export default {
  // 登陆
  login(params) {
    return axios.post(`${baseUrl}/index/login`, params);
  },
  // 注册
  register(params) {
    return axios.post(`${baseUrl}/index/register`, params);
  },
  // 保存配置
  configInfoSave(params) {
    return axios.post(`${baseUrl}/configInfo/saveOrUpdate`,
      params, {
        headers: {
          token: (local.get('userInfo') || {}).token || ''
        }
      });
  },
  // 获取配置
  configInfoCurInfo(params) {
    return axios.get(`${baseUrl}/configInfo/curInfo`, {
      params: params,
      headers: {
        token: (local.get('userInfo') || {}).token || ''
      }
    });
  },
  //获取根据用户ip获取位置信息
  getCityLocal() {
    return axios.get(`${dreamwqApi}/api/getLocation`);
  },

  //获取实况天气
  getWeather(cid) {
    return axios.get(`https://widget-api.heweather.net/s6/plugin/h5?key=db9bb478dfb943949c821628a67011e9&location=${cid}&lang=cn`);
  },

  //获取一言
  getYiyan(params) {
    return axios.get('https://v1.hitokoto.cn/?c=d&c=i&encode=json', params);
  },

  //百度搜索
  baiduSugrec(params) {
    return axios.get(`${dreamwqApi}/api/baidu_sugrec/${params}`);
  },
  //获取豆瓣fm
  getDoubanFm(params) {
    return axios.get(`${dreamwqApi}/api/fm/playlist`, {
      params
    });
  },
  //获取网站站点
  getWebsiteList(params) {
    return axios.get(`${dreamwqApi}/website/list`, {
      params
    });
  },
};