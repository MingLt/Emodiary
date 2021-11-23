var app = getApp()
// pages/detail/detail.js
Page({
  data: {
    idkey:-1,
    hole_id:"",
    u_id:"",
    //帖子详情
    post_id:3,
    name:"匿名用户",
    post_text:"我不爱学习爱学习爱学习爱学习爱学习爱学习爱学习爱学习",
    time:"刚刚",
    is_like:false,
    is_collect:false,
    collects:Number,
    comments:Number,
    focus: false,
    content_wrap:{},
    //评论列表
    array:[]
  },
  
  //评论编辑函数
  editDairy:function(){
    if (app.globalData.userInfo!=null) {
      // 已经授权
      wx.navigateTo({
        url: '../writesss/writesss',
      })
    }else{
       wx.reLaunch({
        url: '../login1/login1',
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var idkey=options.idkey;
    this.setData({
      idkey:idkey,
      hole_id:wx.getStorageSync("hole_id"),
      u_id:wx.getStorageSync("u_id"),
    });
    var that=this
    wx.request({
      url: 'https://luckym.top//treeHole/detail/',
      method: 'get',
      data: {
        tree_hole_id:this.data.hole_id,
        user_id:this.data.u_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        that.setData({
          array: res.data.data.all_comment,
          content_wrap:res.data.data.hole,
          is_like:      res.data.data.is_like,
          is_collect:   res.data.data.is_collect
         })
      },
      fail (){
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon:'none',
          duration:2500,
        })
      }
    })
  },
  onShow: function () {
    // var idkey=options.idkey;
    this.setData({
      hole_id:wx.getStorageSync("hole_id"),
      u_id:wx.getStorageSync("u_id"),
    });
    var that=this
    wx.request({
      url: 'https://luckym.top//treeHole/detail/',
      method: 'get',
      data: {
        tree_hole_id:this.data.hole_id,
        user_id:this.data.u_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        that.setData({
          array: res.data.data.all_comment,
          content_wrap:res.data.data.hole,
         })
      },
      fail (){
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon:'none',
          duration:2500,
        })
      }
    })
  },


  //点赞
  add_dianzan(){
    var that=this
    var addchange="content_wrap.likes"  
    wx.request({
      url: 'https://luckym.top/treeHole/GiveALike/',
      method: 'post',
      data: {
        user_id: app.globalData.userID,
        tree_hole_id: this.data.content_wrap.tree_hole_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        var is_like=res.data.data.is_like
        console.log("is_like: "+is_like)
        if(is_like){
          that.setData({
            [addchange]: that.data.content_wrap.likes + 1
          })
        }
        else{
          that.setData({
             [addchange]: that.data.content_wrap.likes - 1
          })
        }
      },
      fail (){
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon:'none',
          duration:2500,
        })
      }
    })


  },

  //收藏
  add_collect(){
    var that=this
    var addchange="content_wrap.collects"  
    wx.request({
      url: 'https://luckym.top/treeHole/collect',
      method: 'post',
      data: {
        user_id: app.globalData.userID,
        tree_hole_id: this.data.content_wrap.tree_hole_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        var is_collect=res.data.data.is_collect
        console.log("is_like: "+is_collect)
        if(is_collect){
          that.setData({
            [addchange]: that.data.content_wrap.collects + 1
          })
        }
        else{
          that.setData({
             [addchange]: that.data.content_wrap.collects - 1
          })
        }
      },
      fail (){
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon:'none',
          duration:2500,
        })
      }
    })


  },

  
})