const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44, 
    navHeaderHeight: 64,
    tabHeight: 40, // 调整标签栏高度更紧凑
    stickyTop: 0,
    
    currentTab: 0, // 当前选中的索引
    showChannelPopup: false,
    isEditMode: false, // 是否处于频道编辑模式

    // 数据源：我的频道 & 推荐频道
    myChannels: [
      { id: 0, name: '全部' }, { id: 1, name: '良乡' }, { id: 2, name: '和平街' }, 
      { id: 3, name: '望京' }, { id: 4, name: '课程' }, { id: 5, name: '兼职' },
      { id: 6, name: '科研' }, { id: 7, name: '竞赛' }, { id: 8, name: '食堂' }
    ],
    recommendChannels: [
      { id: 9, name: '生活' }, { id: 10, name: '分享' }, { id: 11, name: '穿搭' },
      { id: 12, name: '舞蹈' }, { id: 13, name: '活动' }, { id: 14, name: '美食' },
      { id: 15, name: '职场' }, { id: 16, name: '塑形' }, { id: 17, name: '旅行' },
      { id: 18, name: '音乐' }, { id: 19, name: '抽象' }, { id: 20, name: '情感' },
      { id: 21, name: '科普' }, { id: 22, name: '影视' }, { id: 23, name: '实习' }
    ],

    leftList: [],
    rightList: []
  },

  onLoad() {
    this.initWaterfall();
  },

  onNavHeightChange(e) {
    const { navHeaderHeight } = e.detail;
    this.setData({
      navHeaderHeight: navHeaderHeight,
      stickyTop: navHeaderHeight
    });
  },

  onPullDownRefresh() {
    // 模拟刷新逻辑
    setTimeout(() => {
      this.initWaterfall();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '已更新',
        icon: 'success',
        duration: 1000
      });
    }, 800);
  },
  
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  onSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // --- 频道管理逻辑 ---

  // 1. 点击 Tab (顶部滚动栏 或 弹窗内的非编辑状态)
  switchTab(e) {
    // 兼容组件事件与原生事件
    const index = (e.detail && e.detail.index !== undefined) ? e.detail.index : e.currentTarget.dataset.index;
    const isPopup = e.currentTarget ? (e.currentTarget.dataset.popup || false) : false;

    // 如果在编辑模式下点击“我的频道”，则是删除操作（“全部”除外）
    if (isPopup && this.data.isEditMode) {
      this.removeChannel(index);
      return;
    }

    this.setData({ 
      currentTab: index,
      showChannelPopup: false,
      isEditMode: false 
    });
    wx.vibrateShort({ type: 'light' });
  },

  // 2. 切换弹窗
  toggleChannelPopup() {
    const nextState = !this.data.showChannelPopup;
    this.setData({
      showChannelPopup: nextState,
      isEditMode: nextState ? this.data.isEditMode : false // 关闭时重置编辑模式
    });
  },

  // 3. 切换编辑模式
  toggleEditMode() {
    this.setData({ isEditMode: !this.data.isEditMode });
    wx.vibrateShort({ type: 'medium' });
  },

  // 4. 添加频道 (从推荐 -> 我的)
  addChannel(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.recommendChannels[index];
    
    const newMyChannels = [...this.data.myChannels, item];
    const newRecommend = [...this.data.recommendChannels];
    newRecommend.splice(index, 1);

    this.setData({
      myChannels: newMyChannels,
      recommendChannels: newRecommend
    });
    wx.vibrateShort({ type: 'light' });
  },

  // 5. 删除频道 (从我的 -> 推荐)
  removeChannel(index) {
    if (index === 0) return; // "全部" 不可删除

    const item = this.data.myChannels[index];
    const newMyChannels = [...this.data.myChannels];
    newMyChannels.splice(index, 1);

    const newRecommend = [item, ...this.data.recommendChannels];

    // 如果删除的是当前选中的，重置为 0
    let nextTab = this.data.currentTab;
    if (this.data.currentTab === index) {
      nextTab = 0;
    } else if (this.data.currentTab > index) {
      nextTab--;
    }

    this.setData({
      myChannels: newMyChannels,
      recommendChannels: newRecommend,
      currentTab: nextTab
    });
    wx.vibrateShort({ type: 'light' });
  },

  stopProp() {},

  // --- 瀑布流逻辑 (保持不变) ---
  initWaterfall() {
     const list = [
        { id: 1, title: '良乡校区秋天的银杏太美了', cover: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', nickname: '杏林学子', likes: 128, isLiked: true },
        { id: 2, title: '食堂二楼新开的麻辣烫测评', cover: 'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', nickname: '干饭人', likes: 230, isLiked: false },
        { id: 3, title: '中药鉴定课的显微镜图', cover: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', nickname: '本草纲目', likes: 88, isLiked: false },
        { id: 4, title: '闲置解剖学图谱，九成新', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', nickname: '吃土少女', likes: 45, isLiked: false },
     ];
     this.setData({
       leftList: list.filter((_,i)=>i%2===0),
       rightList: list.filter((_,i)=>i%2!==0)
     });
  },

  // 跳转到动态详情页
  onCardClick(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}`
    });
  }
})