var app = getApp()
Page({
  data:{
    text:String,
    array:[],
    count:0,
    name:"匿名用户",
    pageNum:1,
  }, 
  onShow:function(){
    var that=this
    wx.request({
      url: 'https://luckym.top/treeHole/search',
      method: 'get',
      data: {
        text:this.data.text
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log("res.data："+res.data)
        console.log(res)
        if(res.data.msg=="没有数据"){
            that.setData({
            array:[],
            count:0,
          })
        } 
        else {
          that.setData({
            array:res.data.data.tree_holes,
            count:res.data.data.count
          })        
         }
      },
      fail (){
        wx.showToast({
          title: '获取失败，请稍后重试',
          icon:'none',
          duration:2500,
        })
      },
    })
    console.log("数组数据为："+this.data.array)
  },

  // 编辑树洞帖子
  editDairy:function(){
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          console.log('已经授权');
          wx.navigateTo({
            url: '../writes/writes',
          })
        }else{
          console.log('未授权');
          wx.navigateTo({
            url: '../login2/login2',
          })
        }
      }
    })
  },

  //点赞
  add_dianzan(e){
    var that=this
    var idkey=e.currentTarget.dataset.id;
    // console.log(e)
    idkey=idkey.substr(0,idkey.length-1)
    var addchange="array["+idkey+"].likes"
    wx.request({
      url: 'https://luckym.top/treeHole/GiveALike/',
      method: 'post',
      data: {
        user_id: app.globalData.userID,
        tree_hole_id: this.data.array[idkey].tree_hole_id,
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
            [addchange]:that.data.array[idkey].likes+1
          })
        }
        else{
          that.setData({
            [addchange]:that.data.array[idkey].likes-1
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
  add_collect(e){
    var that=this
    var idkey=e.currentTarget.dataset.id;
    // console.log(e)
    idkey=idkey.substr(0,idkey.length-1)
    var addchange="array["+idkey+"].collects"
    wx.request({
      url: 'https://luckym.top/treeHole/collect',
      method: 'post',
      data: {
        user_id: app.globalData.userID,
        tree_hole_id: this.data.array[idkey].tree_hole_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        var is_collect=res.data.data.is_collect
        console.log("is_collect: "+is_collect)
        if(is_collect){
          that.setData({
            [addchange]:that.data.array[idkey].collects+1
          })
        }
        else{
          that.setData({
            [addchange]:that.data.array[idkey].collects-1
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
  //评论
  add_comment(e){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  // 搜索
  gosearch:function(){
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          console.log('已经授权');
          wx.navigateTo({
            url: '../search_result/search_result',
          })
        }else{
          console.log('未授权');
          wx.navigateTo({
            url: '../login2/login2',
          })
        }
      }
    })
  },
 
 
  onLoad: function () {

     //接受搜索文本
    console.log("receive: "+this.options.text);
    this.setData({
      text :this.options.text
    })
    console.log("设置搜索文本"+this.data.text)
    // this.get_result()

  },
  searchContent:function(event){
    var idkey=event.currentTarget.dataset.id;
    this.setData({
      idkey:idkey
    })
    wx.setStorageSync('hole_id', this.data.array[idkey].tree_hole_id);
    wx.setStorageSync('u_id', this.data.array[idkey].user_id);
    wx.navigateTo({
      url: '../detail/detail?idkey='+idkey,
    })
  },


})