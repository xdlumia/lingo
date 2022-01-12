/*
 * @Author: web.王晓冬
 * @Date: 2020-10-27 09:19:18
 * @LastEditors: web.王晓冬
 * @LastEditTime: 2020-10-30 17:47:15
 * @Description: file content
 */
import dayjs from 'dayjs'
export default {
  /**
   * @desc 时间戳转字符串 使用的是mement.js
   * @default YYYY-MM-DD #
   */
  timeToStr(value, formatString = 'YYYY-MM-DD') {
    if (typeof value !== 'number') {
      return '';
    }
    return dayjs(value).format(formatString);
  }, //end
}