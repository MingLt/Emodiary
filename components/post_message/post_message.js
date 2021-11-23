Component({
  // properties: {
  //   post_id:Number,
  //   user_id:Number,
  //   name:String,
  //   post_text:String,
  //   time:String,
  //   zan:Number,
  //   comment:Number,
  //   collect:Number
  // },
  data: {
    name:"小明",
    post_text:"我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习我爱学习",
    time:"刚刚",
    focus: false,
    zan:23,
    comment:5,
    collect:3
    
  },
  methods:{
    handletap(e){
    console.log(e)
    this.setData({
      zan:this.zan + 1
      })
    },
    add_dianzan(e) {
      this.triggerEvent('add_dianzan', {
        zan: this.properties.zan + 1
      })
      console.log(e)
    }
  }
  
})