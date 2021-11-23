// pages/me/me.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuitems: [
      { text: '我的树洞', url: '../my_post/my_post', tips: '' },
      { text: '我的点赞', url: '../my_dianzan/my_dianzan', tips: '' },
      { text: '我的评论', url: '../my_comment/my_comment',tips: '' },
      { text: '我的收藏', url: '../my_collect/my_collect', tips: '' },
      { text: '关于我们', url: '../../pages/our/our',tips: '' },
      { text: '设置', url: '../userinfo/userinfo',tips: '' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.userInfo!=null) {
      that.setUserInfo(app.globalData.userInfo);
    } 
  },
  ishaveuserInfo:function(){
    if (app.globalData.userInfo==null) {
      wx.reLaunch({
        url: '../login1/login1',
        })
    } 
  },
  setUserInfo: function (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
  },
 

})