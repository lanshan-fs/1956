const app = getApp()

Page({
  data: {
    // 导航栏适配
    statusBarHeight: 20,
    navContentTop: 24,
    navContentHeight: 32,
    navTotalHeight: 64,
    searchBarRight: 0, // 搜索框右侧留白（胶囊宽度）

    keyword: '',
    showResult: false, // 是否显示搜索结果
    historyList: [],
    
    // 热门搜索 (Mock)
    hotList: [
      { id: 1, text: '良乡校区', tag: 'new' },
      { id: 2, text: '期末考试', tag: 'hot' },
      { id: 3, text: '二手交易', tag: '' },
      { id: 4, text: '选课攻略', tag: '' },
      { id: 5, text: '考研经验', tag: '' },
      { id: 6, text: '食堂测评', tag: '' }
    ],

    // 搜索结果 (Mock)
    resultLeft: [],
    resultRight: []
  },

  onLoad() {
    this.initNavBar();
    this.loadHistory();
  },

  initNavBar() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButton = wx.getMenuButtonBoundingClientRect();

    const statusBarHeight = systemInfo.statusBarHeight;
    const navContentTop = menuButton.top;
    const navContentHeight = menuButton.height;
    const navTotalHeight = menuButton.bottom + 8;
    // 搜索框右侧留白 = 胶囊宽度 + 胶囊右边距 + 额外间隙
    const searchBarRight = systemInfo.windowWidth - menuButton.left + 12;

    this.setData({
      statusBarHeight,
      navContentTop,
      navContentHeight,
      navTotalHeight,
      searchBarRight
    });
  },

  loadHistory() {
    const history = wx.getStorageSync('searchHistory') || [];
    this.setData({ historyList: history });
  },

  // 输入监听
  onInput(e) {
    const val = e.detail.value;
    this.setData({ keyword: val });
    if (!val.trim()) {
      this.setData({ showResult: false });
    }
  },

  // 清空输入框
  onClearInput() {
    this.setData({ 
      keyword: '',
      showResult: false
    });
  },

  // 执行搜索
  onSearch() {
    const keyword = this.data.keyword.trim();
    if (!keyword) return;

    this.saveHistory(keyword);
    this.doSearchQuery(keyword);
  },

  // 点击标签搜索
  onTagSearch(e) {
    const keyword = e.currentTarget.dataset.text;
    this.setData({ keyword });
    this.onSearch();
  },

  // 保存历史记录
  saveHistory(keyword) {
    let history = this.data.historyList;
    // 移除旧的相同记录
    history = history.filter(item => item !== keyword);
    // 插入头部
    history.unshift(keyword);
    // 限制长度
    if (history.length > 10) history.pop();

    this.setData({ historyList: history });
    wx.setStorageSync('searchHistory', history);
  },

  // 清除历史记录
  onClearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定清空历史记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ historyList: [] });
          wx.removeStorageSync('searchHistory');
        }
      }
    });
  },

  // 模拟搜索请求
  doSearchQuery(keyword) {
    wx.showLoading({ title: '搜索中...' });
    
    setTimeout(() => {
      // 模拟一些结果
      const mockResults = [
        { id: 101, title: `关于“${keyword}”的讨论`, cover: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', nickname: '学术君', likes: 56, isLiked: false },
        { id: 102, title: `${keyword}相关资料整理`, cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', nickname: '资料库', likes: 120, isLiked: true },
        { id: 103, title: `谁了解${keyword}吗？`, cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80', nickname: '求助者', likes: 8, isLiked: false }
      ];

      this.setData({
        showResult: true,
        resultLeft: mockResults.filter((_,i)=>i%2===0),
        resultRight: mockResults.filter((_,i)=>i%2!==0)
      });
      wx.hideLoading();
    }, 500);
  },

  onNavBack() {
    wx.navigateBack();
  },
  
  // 结果点击跳转
  onCardClick(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}`
    });
  }
})