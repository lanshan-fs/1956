Component({
  externalClasses: ['custom-class'],
  properties: {
    title: String,
    cover: String,
    avatar: String,
    nickname: String,
    likes: {
      type: Number,
      value: 0
    },
    isLiked: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('click');
    }
  }
})