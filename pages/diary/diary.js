const date = new Date()
const years = []
const months = []
const days = []
var app = getApp()
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    pageNum:1,
    setInter: '', 
    idkey:-1,
    tags:'治愈',
    flag1:true,
    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth()+1,
    days,
    day: date.getDate(),
    value: [date.getMonth(), date.getFullYear()],
    isDaytime: true,  //
    array:[],
    current:[],
  },
  bindChange(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[1]],
      month: this.data.months[val[0]],
    })
  },
  diaryContent:function(event){
    var idkey=event.currentTarget.dataset.id;
    this.setData({
      idkey:idkey
    })
    wx.setStorageSync('d_content', this.data.array[idkey].diary_content);
    wx.setStorageSync('d_mood', this.data.array[idkey].tips);
    wx.setStorageSync('d_id', this.data.array[idkey].diary_id);
    wx.setStorageSync('d_time', this.data.array[idkey].write_down_time);
    wx.navigateTo({
      url: '../diaryCon/diarycon?idkey='+idkey,
    })
  },
  editDairy:function(){
    if (app.globalData.userInfo!=null) {
      // 已经授权
      wx.navigateTo({
        url: '../write/write',
      })
    }else{
       wx.reLaunch({
        url: '../login1/login1',
        })
    }
  },

  onLoad: function () {
    //定时器用来请求日记数据
    this.startSetInter();
  },
  //启用定时器
  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        that.queryRemindCount()
      }, 1000);
  },
  //定时器后续，请求数据
queryRemindCount: function () {
  if (app.globalData.userID == null) {
    return
  }
  var that = this;
  wx.request({
        url: 'https://luckym.top/diary/getAll',
        method: 'get',
        data: {
          page: 1,
          per_page:7,
          user_id:app.globalData.userID,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          that.setData({
            array:res.data.all_diary,
          })
          clearInterval(that.data.setInter) // 关闭定时器
        },
        fail (){
          wx.showToast({
            title: '获取日记失败，请稍后重试',
            icon:'none',
            duration:2500,
          })
        }
      })
},

  onShow:function(){
    var that=this;
    if(app.globalData.deleteDiary){
      this.setData({
        pageNum:1
      })
      wx.request({
        url: 'https://luckym.top/diary/getAll',
        method: 'get',
        data: {
          page: 1,
          per_page:7,
          user_id:app.globalData.userID,
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
          }
          else{
             that.setData({
            array:res.data.all_diary,
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
      // that.data.array.splice(this.data.idkey,1);
      // that.setData({
      //   array:that.data.array,
      // })
    }
  //   var dayy,contentt,Yearr, Monthh,Timee1,moodd,arr=[];
  //   if( app.globalData.diasucc){
  //     // app.globalData.diasucc=false;
  //     this.setData({
  //    day:wx.getStorageSync("w_day"),
  //    month:wx.getStorageSync("w_month"),
  //    year:wx.getStorageSync("w_year"),
  //  });
  //  contentt=wx.getStorageSync("w_content");
  //  dayy=wx.getStorageSync("w_day");
  //    Yearr=wx.getStorageSync("w_year");
  //    Monthh=wx.getStorageSync("w_month");
  //    Timee1=wx.getStorageSync("w_time");
  //    moodd=wx.getStorageSync("w_mood");
  //    let temp={'year':Yearr,
  //    'month':Monthh,
  //    'day':dayy,
  //    'time':Timee1,
  //    'content':contentt,
  //    'mood':moodd,};
  //  arr=this.data.array;
  //  arr.unshift(temp);
  //  this.setData({
  //   array:arr,
  //  })
    this.eat = this.selectComponent("#eat"); //组件的id
    if( app.globalData.diasucc)//保存成功
    {
      this.setData({
        pageNum:1
      })
      wx.request({
        url: 'https://luckym.top/diary/getAll',
        method: 'get',
        data: {
          page: this.data.pageNum,
          per_page:7,
          user_id:app.globalData.userID,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          that.setData({
            array:res.data.all_diary,
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
      app.globalData.deleteDiary=false;
      this.eat.showEat();
      setTimeout(function(){
        this.eat.hideEat();
      }.bind(this),3000)
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
    url: 'https://luckym.top/diary/getAll',
    method: 'get',
    data: {
      page: this.data.pageNum,
      per_page:7,
      user_id:app.globalData.userID,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      if (that.data.pageNum == 1) {
        that.setData({
          array: res.data.all_diary,
         })
      } else {
        //获取原始列表
          let noticeList = that.data.array;
          //获取新列表
          let arr = res.data.all_diary;
          //新列表数据与原列表数据合并
          let newArr = noticeList.concat(arr);
          console.log(arr)
          if(arr!=undefined)
          {
            that.setData({
                array: newArr,
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
})
