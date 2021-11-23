Component({
  properties: {
    /*帖子和发帖人的id */
    post_id:Number,
    user_id:Number,
    /*评论的信息 */
    com_id:Number,
    com_name:String,
    com_text:String,
    com_time:String,
  },

  data: {
    com_name:"路人",
    com_text:"加油呀加油呀加油呀加油呀加油呀加油呀加油呀加油呀加油呀加油呀加油呀加油呀",
    com_time:"刚刚",
    focus: false,
    zan:0
  }
})