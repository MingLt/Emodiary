var app = getApp()
Page({
  data:{
    pageNum:1,
    array:[],
    name:"匿名用户",
  }, 
  onLoad:function(){
    var that=this;
    wx.request({
      url: 'https://luckym.top/treeHole/getAll',
      method: 'get',
      data: {
        page: 1,
        per_page:5,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.data.msg=="没有数据")
            {
              that.setData({
              array:[],
            })
            } else {
              that.setData({
                array:res.data.tree_holes,
                // name: (Math.random() * 100000 + 200000).toFixed(0),
              })        
        }
        console.log(res.data)
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
  onShow:function(){
    // if(app.globalData.deleteDiary){
      
    //   that.data.array.splice(this.data.idkey,1);
    //   that.setData({
    //     array:that.data.array,
    //   })
    // }
    var da,cont,Yea, Mon,Timee,namee,arr=[];
    var that=this;

    if( app.globalData.release){
      app.globalData.release=false;
      // cont=wx.getStorageSync("s_content");
      // da=wx.getStorageSync("s_day");
      //   Yea=wx.getStorageSync("s_year");
      //   Mon=wx.getStorageSync("s_month");
      //   Timee=wx.getStorageSync("s_time");
      //   namee="用户" + (Math.random() * 100000 + 200000).toFixed(0)
      //   let temp={
      //   'time': Yea + '-' + Mon  + '-' + da + " " + Timee,
      //   'post_text':cont,
      //   'name':namee,
      //   };
      // console.log(temp);
      // arr=this.data.array;
      // arr.unshift(temp);
      // this.setData({
      //  array:arr,
      // }) 
      //  console.log(this.data.array)
      //  console.log(this.data.month)
      //  console.log(this.data.day)
      this.setData({
        pageNum:1
      })
  wx.request({
    url: 'https://luckym.top/treeHole/getAll',
    method: 'get',
    data: {
      page: 1,
      per_page:5,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      if(res.data.msg=="没有数据")
          {
            that.setData({
            array:[],
          })
          } else {
            that.setData({
              array:res.data.tree_holes,
              // name: (Math.random() * 100000 + 200000).toFixed(0),
            })        
      }
      console.log(res.data)
    },
    fail (){
      wx.showToast({
        title: '获取失败，请稍后重试',
        icon:'none',
        duration:2500,
      })
    }
  })
    }
   
  },
  
//触底响应函数，监听下拉加载----------------------------------->>>>>>>>>
onBottom(){
  (this.data.pageNum)++;
  this.getNoticeList();
},
//获取列表失败的回调函数
getNoticeList(){
  //请求
  var that=this
  wx.request({
    url: 'https://luckym.top/treeHole/getAll',
    method: 'get',
    data: {
      page: this.data.pageNum,
      per_page:5,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res)
      if (that.data.pageNum == 1) {
        that.setData({
          array: res.data.tree_holes,
          // name: (Math.random() * 100000 + 200000).toFixed(0),
         })
      } else {
        //获取原始列表
          let noticeList = that.data.array;
          //获取新列表
          let arr = res.data.tree_holes;
          //新列表数据与原列表数据合并
          let newArr = noticeList.concat(arr);
          console.log(arr)
          if(arr!=undefined)
          {
            that.setData({
                array: newArr,
                // name: (Math.random() * 100000 + 200000).toFixed(0),
            })
          }   
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
//页面上拉触底事件的处理函数
onReachBottom: function () {
  this.onBottom();
},
//触底响应函数，监听下拉加载-----------------------------------^^^^^^^^^^>>>>>>>


  // 编辑树洞帖子
  editDairy:function(){
    if (app.globalData.userInfo!=null) {
      // 已经授权
      wx.navigateTo({
        url: '../writes/writes',
      })
    }else{
       wx.reLaunch({
        url: '../login1/login1',
        })
    }
  },
  
  //点赞
  add_dianzan(e){
    var that=this
    var idkey=e.currentTarget.dataset.id;
    // console.log(e)
    idkey=idkey.substr(0,idkey.length-1)
    var addchange="array["+idkey+"].likes"
    // console.log(idkey)
    // console.log(this.data.array[idkey])
    // console.log("tree_hole_id： "+this.data.array[idkey].tree_hole_id)
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

  //存储搜索关键词
  search_in(e){
    // var st="data.search_text"
    this.setData({
      search_text :e.detail.value
    })
    // console.log(e.detail.value)
    // console.log(this.data.search_text)
  },

  //评论
  add_comment(e){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  // 搜索
  gosearch:function(){
    //  console.log(this.data.search_text)
      var sst=this.data.search_text
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权
            console.log('已经授权');
            wx.navigateTo({
              url: '../search_result/search_result?text='+sst
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

  
  treeContent:function(event){
    var idkey=event.currentTarget.dataset.id;
    this.setData({
      idkey:idkey
    })
    wx.setStorageSync('hole_id', this.data.array[idkey].tree_hole_id);
    wx.setStorageSync('u_id', this.data.array[idkey].user_id);
    wx.setStorageSync('like', this.data.array[idkey].user_id);
    wx.navigateTo({
      url: '../detail/detail?idkey='+idkey,
    })
  },
})
