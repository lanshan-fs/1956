Component({
  externalClasses: ['custom-class'],
  properties: {
    title: String,
    cover: String,
    avatar: String, // 默认为空，WXML 中处理默认头像
    nickname: String,
    likes: {
      type: Number,
      value: 0
    },
    isLiked: {
      type: Boolean,
      value: false
    },
    price: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap() {
      // 触发整个卡片的点击事件
      this.triggerEvent('click');
    },

    onLike(e) {
      // 阻止冒泡，单独处理点赞
      // 可以在此处直接修改 data 进行乐观更新，也可以等待父组件反馈
      const newVal = !this.data.isLiked;
      const newCount = newVal ? this.data.likes + 1 : this.data.likes - 1;
      
      this.setData({
        isLiked: newVal,
        likes: newCount
      });
      
      // 触发点赞事件，传递最新的状态
      this.triggerEvent('like', { isLiked: newVal, likes: newCount });
      
      // 震动反馈
      wx.vibrateShort({ type: 'light' });
    }
  }
})