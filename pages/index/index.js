const app = getApp()

Page({
  data: {
    currentTab: 0,
    tabs: [
      { id: 0, name: '推荐' },
      { id: 1, name: '集市' },
      { id: 2, name: '针灸推拿' },
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
    this.initWaterfall();
  },

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ currentTab: index });
    // TODO: 切换 Tab 时重新请求数据
    wx.showToast({
      title: `切换到 ${this.data.tabs[index].name}`,
      icon: 'none'
    });
  },

  onPost() {
    wx.showActionSheet({
      itemList: ['发布图文', '发布闲置', '发起活动'],
      success (res) {
        console.log(res.tapIndex)
      }
    })
  },

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