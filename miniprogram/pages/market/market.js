// pages/market/market.js
const app = getApp();

Page({
  data: {
    // Navigation Bar Layout Data
    navBarHeight: 0,
    menuButtonTop: 0,
    menuButtonHeight: 0,
    menuButtonRight: 0, // Distance from right edge
    
    campuses: ['良乡', '和平街', '望京'],
    campusIndex: 0,
    categories: ['全部', '教材教辅', '数码电子', '生活用品', '美妆护肤', '票务', '其他'],
    activeCategory: 0,
    
    leftList: [],
    rightList: [],
  },

  onLoad(options) {
    this.generateMockData();
  },

  onNavHeightChange(e) {
    const { navBarHeight, navHeaderHeight } = e.detail;
    this.setData({
      navBarHeight: navBarHeight,
      navHeaderHeight: navHeaderHeight,
      tabsHeight: 44 // 统一调整为 44px
    });
  },

  generateMockData() {
    const mockImages = [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=400', 
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400', 
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 
      'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400', 
    ];

    const conditions = ['全新', '99新', '95新', '9成新', '8成新'];

    const newItems = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      title: this.getRandomTitle(i),
      cover: mockImages[i % mockImages.length],
      avatar: '', 
      nickname: `同学${Math.floor(Math.random() * 100)}`,
      likes: Math.floor(Math.random() * 50),
      wants: Math.floor(Math.random() * 20),
      price: Math.floor(Math.random() * 200) + 10,
      campus: this.data.campuses[Math.floor(Math.random() * 3)],
      condition: conditions[Math.floor(Math.random() * conditions.length)]
    }));

    this.distributeItems(newItems);
  },

  getRandomTitle(index) {
    const titles = [
      '出闲置，九成新，良乡自取',
      '考研结束出资料，包含真题和笔记',
      'Ipad Air 5，带笔，无磕碰',
      '宿舍神器，懒人支架',
      '未拆封的护肤品，低价出',
      '中医内科学教材，重点已划',
      '针灸铜人模型，平时练习用'
    ];
    return titles[index % titles.length];
  },

  distributeItems(items) {
    let left = this.data.leftList;
    let right = this.data.rightList;

    items.forEach((item, index) => {
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

  onCampusChange(e) {
    this.setData({ campusIndex: e.detail.value });
    this.resetData();
  },

  onCategoryChange(e) {
    // Event from neo-tabs
    const index = e.detail.index;
    this.setData({ activeCategory: index });
    this.resetData();
  },

  resetData() {
    this.setData({
      leftList: [],
      rightList: []
    });
    setTimeout(() => {
        this.generateMockData();
    }, 300);
  },

  onSearchTap() {
    wx.navigateTo({ url: '/pages/search/search' });
  },

  onItemTap(e) {
    // Event from neo-goods-card
    const id = e.detail.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}&type=market`,
    });
  },

  onPostTap() {
    wx.navigateTo({ url: '/pages/post/post?type=market' });
  }
});