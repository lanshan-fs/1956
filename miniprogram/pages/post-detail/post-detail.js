const app = getApp()

Page({
  data: {
    // 导航栏适配数据
    statusBarHeight: 20,
    navContentTop: 24, // 胶囊按钮的 top 值，用于对齐
    navContentHeight: 32, // 胶囊按钮的高度
    navTotalHeight: 64, // 整个自定义导航栏的高度 (status + content + padding)

    swiperCurrent: 0,
    
    // 模拟动态详情数据
    post: {
      id: '123',
      userInfo: {
        avatar: '', 
        nickname: '杏林学子',
        isFollowed: false,
        id: 'u001'
      },
      title: '良乡校区秋天的银杏太美了',
      content: '今天路过图书馆，发现银杏叶全黄了！🍂\n随手拍了几张，真的很有氛围感。\n大家快去打卡呀！\n\n#北中医 #秋天 #银杏 #摄影',
      images: [
        'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      createTime: '2023-10-24 15:30',
      location: '北京中医药大学良乡校区',
      stats: {
        likes: 128,
        isLiked: true,
        stars: 45,
        isStarred: false,
        comments: 12
      }
    },

    comments: [
      { id: 1, nickname: '路人甲', content: '这也太好看了吧！想去拍！', time: '10-24 16:00', avatar: '' },
      { id: 2, nickname: '摄影爱好者', content: '请问这是用什么相机拍的呀？色调很棒！', time: '10-24 16:30', avatar: '' },
      { id: 3, nickname: '干饭人', content: '看完饿了...不对，这是银杏不是吃的', time: '10-24 17:00', avatar: '' }
    ],
    
    inputValue: '',
    focusInput: false
  },

  onLoad(options) {
    // 核心：适配胶囊按钮
    const systemInfo = wx.getSystemInfoSync();
    const menuButton = wx.getMenuButtonBoundingClientRect();

    // 状态栏高度
    const statusBarHeight = systemInfo.statusBarHeight;
    // 导航内容（胶囊）的顶部位置
    const navContentTop = menuButton.top;
    // 导航内容（胶囊）的高度
    const navContentHeight = menuButton.height;
    // 导航栏总高度：胶囊底部 + 留白 (或者直接用 menuButton.bottom + (menuButton.top - statusBarHeight))
    // 为了美观，我们通常让导航栏高度延伸到胶囊底部再加一点 padding
    const navTotalHeight = menuButton.bottom + 8;

    this.setData({
      statusBarHeight,
      navContentTop,
      navContentHeight,
      navTotalHeight
    });

    if (options.id) {
      console.log('Post ID:', options.id);
    }
  },

  onNavBack() {
    wx.navigateBack();
  },

  onSwiperChange(e) {
    this.setData({ swiperCurrent: e.detail.current });
  },

  onPreviewImage(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.post.images
    });
  },

  toggleFollow() {
    const isFollowed = !this.data.post.userInfo.isFollowed;
    this.setData({
      'post.userInfo.isFollowed': isFollowed
    });
    wx.showToast({
      title: isFollowed ? '已关注' : '已取消关注',
      icon: 'none'
    });
    wx.vibrateShort({ type: 'light' });
  },

  toggleLike() {
    const isLiked = !this.data.post.stats.isLiked;
    const likes = this.data.post.stats.likes + (isLiked ? 1 : -1);
    this.setData({
      'post.stats.isLiked': isLiked,
      'post.stats.likes': likes
    });
    wx.vibrateShort({ type: 'light' });
  },

  toggleStar() {
    const isStarred = !this.data.post.stats.isStarred;
    const stars = this.data.post.stats.stars + (isStarred ? 1 : -1);
    this.setData({
      'post.stats.isStarred': isStarred,
      'post.stats.stars': stars
    });
    wx.vibrateShort({ type: 'light' });
  },

  onFocusComment() {
    this.setData({ focusInput: true });
  },
  
  closeInput() {
    this.setData({ focusInput: false });
  },

  onSendComment() {
    if (!this.data.inputValue.trim()) return;
    
    wx.showLoading({ title: '发送中' });
    
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        nickname: '我',
        avatar: '',
        content: this.data.inputValue,
        time: '刚刚'
      };
      
      this.setData({
        comments: [newComment, ...this.data.comments],
        inputValue: '',
        focusInput: false,
        'post.stats.comments': this.data.post.stats.comments + 1
      });
      
      wx.hideLoading();
      wx.showToast({ title: '评论成功', icon: 'none' });
    }, 500);
  },
  
  onInputChange(e) {
    this.setData({ inputValue: e.detail.value });
  }
})