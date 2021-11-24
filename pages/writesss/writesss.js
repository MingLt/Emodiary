// pages/writes/writes.js
let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()
let day = date.getDate()
var app = getApp()
Page({
  data: {
    info:0,
    _year: year,
    _month: month,
    day: day, 
    neirong:"",
  },

  textinput:function(e){
    var content = e.detail.value;
    var cnt = parseInt(content.length);
    this.setData({
      neirong:content,
      info:cnt
    })
  },
  commentsuccess:function()
  { 
    wx.request({
      url: 'https://luckym.top/treeHole/addComment',
      method: 'post',
      data: {
        user_id:app.globalData.userID,
	      tree_hole_id:wx.getStorageSync("hole_id"),
	      content:this.data.neirong,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        wx.showToast({
          title: '发布成功',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 1500     
        })
        app.globalData.release=true;
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          })  
        }.bind(this),1500)

      },
      fail (){
        console.log("保存日记数据失败")
        wx.showToast({
          title: '发布失败',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 1500     
        })
      }
    })
    
  }
})