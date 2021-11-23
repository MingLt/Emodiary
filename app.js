// app.js

App({
  globalData: {
    deleteDiary:false,
    diasucc:false,
    release:false,
    deletetree:false,
    code:'',
    userInfo: null,
    userID:'',
    encryptedData:'',
    iv:'',
    openId:'',
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    try {
      var value = wx.getStorageSync('myuserInfo')
      var value1 = wx.getStorageSync('myuserID')
      if (value && value1) {
        that.globalData.userInfo=value
        that.globalData.userID=value1
        // console.log(value)
          // Do something with return value
      }
      else{
        wx.reLaunch({
          url: '/pages/login1/login1',
          })
      }
    } catch (e) {
      wx.showToast({
        title: '获取本地缓存失败',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 1500     
      })
    }
  }
})