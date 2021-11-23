//仅用于授权登录
const app = getApp()

Page({
  data: {
    motto: 'Emo 日记',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: false // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../diary/diary'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile () {
    var p1 = new Promise((resolve, reject) => {
      wx.login({
        success (res) {
          app.globalData.code=res.code;
          if (res.code) { 
            var code=res.code
            wx.request({
             url: 'https://luckym.top/getOpenid',
              method:'get', 
              header:{  
              'content-type':'json'
              },
              data:{ code: code},
              success: function (res_2) {
                console.log(res_2.data.res.openid)
                app.globalData.userID=res_2.data.res.openid;
                app.globalData.openId=res_2.data.res.openid;
              },
              fail: function (res_2) {//调用接口失败之后
                    wx.showToast({
                    title: '失败',
                    icon: 'none',
                  });
                  console.log('.........fail..........');
              }
           })
            } else {
              console.log('失败！')
            }
          }
      })
    })
    var p2 = new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: res => {
          // 这里也可以选择性返回需要的字段
          app.globalData.userInfo=res.userInfo,
          this.setData({
            hasUserInfo: true
          }),
            wx.reLaunch({
            url: '../diary/diary'
          }),
          resolve(res)
        }
      })
    })
    // 同时执行p1和p2，并在它们都完成后执行then
    Promise.all([p1, p2]).then((results) => {
      // results是一个长度为2的数组，放置着p1、p2的resolve
      this.handleUserInfo({
          // 这里也可以选择性返回需要的字段
          ...results[0],
          ...results[1]
      })
    })
  },
  // 组织好后端需要的字段，并调用接口
  handleUserInfo (data) {
    const { code, encryptedData, userInfo, iv, rawData, signature, cloudID } = data
    const params = {
      userInfo,
      // ....
    }
    // 调用接口维护本地登录态
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    app.globalData.userInfo=e.detail.userInfo;
    this.setData({
      hasUserInfo: true
    })
  }
  
})
