const app = getApp()

Page({
  data: {
    statusBarHeight: 20, // 默认值
    navBarHeight: 44,    // 胶囊按钮高度通常是44px
    currentTab: 0,
    // showChannelModal: false, // 控制下拉窗
    tabs: [
      { id: 0, name: '良乡' },
      { id: 1, name: '和平街' },
      { id: 2, name: '望京' },
      { id: 3, name: '中药园' },
      { id: 4, name: '考研' }
    ],
    // 模拟数据列表
    allList: [
      { id: 1, title: '良乡校区秋天的银杏太美了，随手一拍都是壁纸！', cover: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', avatar: '', nickname: '杏林学子', likes: 128, isLiked: true },
      { id: 2, title: '【出】闲置解剖学图谱，九成新，附赠笔记', cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', avatar: '', nickname: '吃土少女', likes: 45, isLiked: false },
      { id: 3, title: '食堂二楼新开的麻辣烫测评，避雷！', cover: 'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', avatar: '', nickname: '干饭人1956', likes: 230, isLiked: false },
      { id: 4, title: '有没有一起练八段锦的？明早操场约！', cover: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', avatar: '', nickname: '养生朋克', likes: 12, isLiked: true },
      { id: 5, title: '中药鉴定课的显微镜图，太治愈了', cover: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', avatar: '', nickname: '本草纲目', likes: 88, isLiked: false },
    ],
    leftList: [],
    rightList: []
  },

  onLoad() {
    // 1. 获取系统信息，计算顶部高度
    const systemInfo = wx.getSystemInfoSync();
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    });

    // 2. 初始化瀑布流
    this.initWaterfall();
  },

  onShow() {
    // 激活自定义底部导航栏的“首页”状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.currentTab === index) {
      // 如果是在下拉窗里点击了当前 Tab，也关闭窗口
      this.setData({ showChannelModal: false });
      return;
    }
    
    this.setData({ 
      currentTab: index,
      showChannelModal: false // 切换后自动关闭下拉窗
    });
    
    wx.vibrateShort();
    // TODO: 重新请求数据
  },

  onPost() {
    wx.showActionSheet({
      itemList: ['发布图文', '发布闲置', '发起活动'],
      success (res) {
        console.log(res.tapIndex)
      }
    })
  },

// 打开/关闭下拉窗
  toggleChannelModal() {
    this.setData({
      showChannelModal: !this.data.showChannelModal
    });
  },

  // 防止点击弹窗内部时关闭弹窗
  stopProp() {},

  // 简单的左右分栏逻辑，模拟瀑布流
  initWaterfall() {
    const list = this.data.allList;
    const left = [];
    const right = [];
    
    list.forEach((item, index) => {
      if (index % 2 === 0) {
        left.push(item);
      } else {
        right.push(item);
      }
    });

    this.setData({
      leftList: left,
      rightList: right
    });
  },

  // 点击搜索 Icon
  onSearch() {
    wx.showToast({
      title: '打开搜索页...',
      icon: 'none'
    });
    // 实际逻辑：跳转到搜索页
    // wx.navigateTo({ url: '/pages/search/search' })
  },

  // ... onLoad, switchTab 等 ...
})