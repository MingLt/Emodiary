var app = getApp()
Component({
  properties: {
    url: {
      type: String,
      value: "http://m.qpic.cn/psc?/V513EChq0TBwUB2Wzg9r2UtSsk4U2iiH/45NBuzDIW489QBoVep5mcXCPpXYHtUtgAohcBOAc43twxAbl.6zv805Jw4GXqnsn7Nq4lXMAcRN8CVve5z.otR6JTEkOFlemROe1UDgkL.s!/b&bo=4QpVAQAAAAADN60!&rf=viewer_4",
    },
    count: {
      type: String,
      value: 5,  //图片数量
    },
    width: {
      type: String,
      value: 397,
    },
    height: {
      type: String,
      value: 270,
    },
    duration: {  //播放一次时间
      type: String,
      value: 1.5,
    },
    playNumber: {   //播放次数
      type: String,
      value:1,
    },
    left: {
      type: String,
      value: 0,
    },
    top: {
      type: String,
      value: 0,
    },
    //日记标签值与推送列表
    tags:{
      type: String,
      value:"治愈"
    },
    pushList:{
      type:Object,
      value:{},
    },
    //popup
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '叮~开心一下!'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '哗啦啦啦啦啦啦啦啦啦啦哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或哗啦啦啦啦啦啦啦啦啦啦哈哈哈哈哈哈哈哈哈哈哈'
    },
    // 弹窗取消按钮文字
    btn_no: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: '查看更多>'
    } 
  },
  data: {
    flag1:false,
    flag: true,
  },
  attached() {
   
    if (this.data.playNumber > 0) {
      setTimeout(() => {
        this.triggerEvent("end");
      }, this.data.playNumber * this.data.duration * 1000);
    }
    //在这里请求数据
  },
  methods: {
    hideEat: function () {
      app.globalData.diasucc=false;
      this.setData({
        flag1: !this.data.flag1
      })
    },
    showEat: function () {
      //请求推送数据
      var that=this;
      console.log(this.data.tags)
      wx.request({
        url: 'https://luckym.top/pushMsg',
        method: 'post',
        header:{
          'content-type': 'application/json' // 默认值
        },
        data: {
          diary_tip:that.data.tags,
        },
        success:function(res){
          // that.data.content=res.data.content;
          that.setData({
            content:res.data.data.content
          })
          //that.data.pushList=res.data
          // console.log(res.data)
        },
        fail:function(res){
          console.log("请求推送失败")
        }
      })
      //  //请求到数据后保存在推送列表
      this.setData({
        flag1: !this.data.flag1
      })
      setTimeout(function(){
        this.showPopup();
      }.bind(this),3000)
    },
    //popup
    //隐藏弹框
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示弹框
    showPopup () {
      this.setData({
        flag: !this.data.flag
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error () {
      //触发取消回调
      this.hidePopup();
      // this.triggerEvent("error")
    },

    //这里暂时不用》》》》》》》》》
    _success () {
      //触发成功回调
      // this.triggerEvent("success");
      this.hidePopup();
      
    wx.navigateTo({
      url: '../../pages/morePush/morepush',
    })
    }
  }
  
});
