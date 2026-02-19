const app = getApp()

Page({
  data: {
    statusBarHeight: 20,
    navBarHeight: 44, // 胶囊按钮标准高度
    currentTab: 0,
    showChannelPopup: false,
    tabs: [
      { id: 0, name: '全部' }, { id: 1, name: '良乡' }, { id: 2, name: '和平街' }, 
      { id: 3, name: '望京' }, { id: 4, name: '课程' }, { id: 5, name: '兼职' },
      { id: 6, name: '科研' }, { id: 7, name: '竞赛' }, { id: 8, name: '食堂' },
      { id: 9, name: '生活' }, { id: 10, name: '分享' }
    ],
    leftList: [],
    rightList: []
  },

  onLoad() {
    // 获取系统状态栏高度，适配刘海屏
    const systemInfo = wx.getSystemInfoSync();
    const navBarHeight = 44; // 胶囊高度
    const tabHeight = 44;    // 标签栏高度固定为 44px
    const navHeaderHeight = systemInfo.statusBarHeight + navBarHeight;
    
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      navBarHeight: navBarHeight,
      tabHeight: tabHeight,
      navHeaderHeight: navHeaderHeight,
      // 吸附位置 = 导航栏总高度 - 标签栏高度
      stickyTop: navHeaderHeight - tabHeight
    });
    this.initWaterfall();
  },
  
  onShow() {
    // 激活自定义底部导航栏的选中态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  onSearch() {
    wx.showToast({ title: '搜索功能开发中', icon: 'none' });
  },

  // 切换 Tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ 
      currentTab: index,
      showChannelPopup: false // 选中后自动关闭下拉窗
    });
    // 增加轻微震动反馈
    wx.vibrateShort({ type: 'light' });
  },

  // 切换下拉窗显示/隐藏
  toggleChannelPopup() {
    this.setData({
      showChannelPopup: !this.data.showChannelPopup
    });
  },

  // 防止点击弹窗内部内容时关闭弹窗
  stopProp() {},

  // 模拟瀑布流数据
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
  }
})