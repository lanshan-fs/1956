const app = getApp()

Page({
  data: {
    // 导航栏适配数据
    statusBarHeight: 20,
    navContentTop: 24, 
    navContentHeight: 32, 
    navTotalHeight: 64, 
    menuButtonLeft: 0, // 用于搜索按钮定位

    type: 'post', // 'post' or 'market'
    swiperCurrent: 0,
    
    // 统一的数据结构，根据 type 渲染不同组件
    post: null,
    comments: [],
    
    inputValue: '',
    focusInput: false
  },

  onLoad(options) {
    this.initNavigation();
    
    const type = options.type || 'post';
    const id = options.id;
    
    this.setData({ type });
    
    if (type === 'market') {
      this.loadMarketData(id);
    } else {
      this.loadPostData(id);
    }
  },

  initNavigation() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButton = wx.getMenuButtonBoundingClientRect();

    const statusBarHeight = systemInfo.statusBarHeight;
    const navContentTop = menuButton.top;
    const navContentHeight = menuButton.height;
    const navTotalHeight = menuButton.bottom + 8;
    const menuButtonLeft = menuButton.left;

    this.setData({
      statusBarHeight,
      navContentTop,
      navContentHeight,
      navTotalHeight,
      menuButtonLeft
    });
  },

  loadPostData(id) {
    // 模拟动态详情数据
    this.setData({
      post: {
        id: id || '123',
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
      ]
    });
  },

  loadMarketData(id) {
    // 模拟集市物品详情数据
    this.setData({
      post: {
        id: id || 'm001',
        userInfo: {
          avatar: '', 
          nickname: '中医药小锦鲤',
          lastSeen: '2小时前来过',
          isFollowed: false,
          id: 'u002'
        },
        title: '出九成新中医内科学教材',
        price: '35.00',
        content: '考研结束了，回血出一波教材。这本中内保存得很好，里面有少量重点笔记，不影响阅读。良乡校区可自取，外地不包邮哈。',
        images: [
          'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
          'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800'
        ],
        createTime: '2023-10-25 09:12',
        location: '北京中医药大学良乡校区',
        stats: {
          likes: 12,
          isLiked: false,
          stars: 8,
          isStarred: false,
          comments: 5,
          views: 156
        }
      },
      comments: [
        { id: 1, nickname: '学霸1号', content: '学姐，请问笔记全吗？', time: '10-25 10:00', avatar: '' },
        { id: 2, nickname: '求书心切', content: '想要，怎么联系？', time: '10-25 10:30', avatar: '' }
      ]
    });
  },

  onNavBack() {
    wx.navigateBack();
  },

  onSearch() {
    wx.navigateTo({ url: '/pages/search/search' });
  },

  onShare() {
    // 原生分享触发
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

  onSellerHome() {
    wx.navigateTo({ url: `/pages/profile/profile?id=${this.data.post.userInfo.id}` });
  },

  onContact() {
    const { id, userInfo } = this.data.post;
    wx.navigateTo({ 
      url: `/pages/chat/chat?id=${id}&nickname=${userInfo.nickname}&avatar=${userInfo.avatar}` 
    });
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