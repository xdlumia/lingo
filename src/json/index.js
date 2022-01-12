/*
 * @Author: web.王晓冬
 * @Date: 2020-10-14 19:37:19
 * @LastEditors: itab.link
 * @LastEditTime: 2022-01-12 20:52:45
 * @Description: file content
 */
const videoList = [
  {
    title: "格里姆瑟尔山口Totesee山地湖中倒映出的星星",
    local: "欧洲 瑞士 伯尔尼",
    src: "https://az3.sfo2.cdn.digitaloceanspaces.com/bingdesktop/3455b6778764415593fb5e688218fb89.mp4",
  },
]
const imgList = [{
  title: "Loughrigg Tarn的日出",
  local: "欧洲 英国 英格兰湖区安布尔塞德",
  src: "https://tvax1.sinaimg.cn/large/007Tv3Vmly1gd0yldnd9ej31hc0u047i.jpg",
}, {
  title: "黑暗中为你照明",
  local: "欧洲 波兰 希维诺乌伊希切",
  src: "https://tvax1.sinaimg.cn/large/bfe05ea9ly1fxgv3f6vjyj21hc0u07df.jpg",
},
{
  title: "残阳夕照 落日余晖",
  local: "亚洲 越南 下龙湾",
  src: "https://tvax1.sinaimg.cn/large/bfe05ea9ly1fxgumr0a7mj21hc0u0k0j.jpg",
},

{
  title: "",
  local: "",
  src: "https://wallpaper.infinitynewtab.com/wallpaper/3036.jpg",
},
{
  title: "圣托里尼岛鸟瞰图",
  local: "欧洲 希腊",
  src: "https://tvax1.sinaimg.cn/large/007Tv3Vmly1gdlv1ubltej31hc0u0n67.jpg",
},
{
  title: "南奥索峰的Lac d'Ayous小屋",
  local: "欧洲 法国",
  src: "https://tvax1.sinaimg.cn/large/007Tv3Vmly1getlalfp0hj31hc0u0dov.jpg",
},
{
  title: "克林格尔农场的Mazezilla玉米田迷宫",
  local: "宾夕法尼亚州",
  src: "https://cn.bing.com//th?id=OHR.Mazezilla_ZH-CN8502282112_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
},
]


// 0应用 1内置链接 2自定义链接
const navList = [{
  type: 1,
  url: "",
  title: "天气",
  key: "weather",
  color: "#ffc303"
},
{
  type: 1,
  url: "",
  title: "待办事项",
  key: "todo",
  color: "#409eff"
},
{
  type: 1,
  url: "",
  title: "便笺",
  key: "note",
  color: "#fa8511"
},
{
  type: 1,
  url: "",
  title: "设置",
  key: "setting",
  color: "#408ef0"
},
// { type: 1, url: "", title: "快递查询", key: "kuaidi", color: "#e74c3c" },
{
  type: 0,
  url: "https://www.tmall.com",
  title: "天猫",
  key: "tmall",
  color: "#ff0030",
},
{
  type: 0,
  url: "https://www.jd.com",
  title: "京东商城",
  key: "jd",
  color: "#d71912",
},
{
  type: 0,
  url: "https://music.163.com/",
  title: "网易云音乐",
  key: "music163",
  color: "#f24452",
},
{
  type: 0,
  url: "https://www.bilibili.com/",
  title: "bilibili",
  key: "bilibili",
  color: "#00b1ff",
},
{
  type: 0,
  url: "http://iqiyi.com/",
  title: "爱奇艺",
  key: "iqiyi",
  color: "#08db02",
},
{
  type: 0,
  url: "http://v.qq.com/",
  title: "腾讯视频",
  key: "vqq",
  color: "#ff8903",
},
{
  type: 0,
  url: "https://weibo.com/",
  title: "微博",
  key: "weibo",
  color: "#e6162d",
},
{
  type: 0,
  url: "https://www.zhihu.com/",
  title: "知乎",
  key: "zhihu",
  color: "#0084ff",
},
{
  type: 0,
  url: "https://www.ctrip.com/",
  title: "携程",
  key: "ctrip",
  color: "#2377e2",
},
{
  type: 0,
  url: "https://mail.qq.com/",
  title: "豆瓣",
  key: "douban",
  color: "#00b51d",
},
{
  type: 0,
  url: "https://mail.qq.com/",
  title: "QQ邮箱",
  key: "email",
  color: "#f57f4f",
},

{
  type: 1,
  url: '',
  title: "添加",
  key: "add",
  color: "#fa8511",
}
].map((item, index) => {
  item.id = index
  return item
})
export {
  videoList,
  imgList,

  navList
}