/*
 * @Author: web.王晓冬
 * @Date: 2019-10-15 10:28:51
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-12-07 18:08:09
 * @Description: 公共方法
 * @axample
//深度拷贝对象
let obj = {a:{a:1}}
let newObj = this.$util.deepClone(obj)
 */

const utils = {
  // 判断是否是空对象 {Object}#
  isEmptyObject(obj) {
    for (const name in obj) {
      return false;
    }
    return true;
  }, //end
  // 判断是否是window对象 {ele}#
  isWindow(obj) {
    return obj != null && obj === obj.window;
  }, //end
  // 判断数据类型{x} #
  type(obj) {
    const class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').map((item,
      index) => {
      class2type[`[object ${item}]`] = item.toLowerCase();
    });
    if (obj == null) {
      return `${obj}`;
    }
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype
      .toString.call(obj)] || 'object' : typeof obj;
  }, //end
  // 判断是不是 DOM 元素  {Dom}#
  isElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }, //end
  // 对象/数组数据深拷贝  {Object}#
  deepClone(source) {
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = utils.deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    })
    return targetObj
  }, //end

  //  HTML格式转换成文本  {Html}# 
  html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
  }, //end

  // 数组去重 {Array}#
  uniqueArr(arr) {
    return Array.from(new Set(arr))
  }, //end

  // 创建唯一字符串 {String} #
  createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  }, //end
  // 事件防抖 {fn} {Number =1000} #
  debounce(fn, delay = 1000) {
    let timer = null
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay) // 简化写法
    }
  },

};


export default utils;