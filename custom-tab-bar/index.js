Component({
  data: {
    selected: 0,
    list: [
      { pagePath: "/pages/index/index", text: "首页", iconPath: "/images/tab_home.png", selectedIconPath: "/images/tab_home_active.png" },
      { pagePath: "/pages/market/market", text: "集市", iconPath: "/images/tab_market.png", selectedIconPath: "/images/tab_market_active.png" },
      { pagePath: "/pages/post/post", text: "" }, // 中间按钮，文字为空
      { pagePath: "/pages/notice/notice", text: "公告", iconPath: "/images/tab_notice.png", selectedIconPath: "/images/tab_notice_active.png" },
      { pagePath: "/pages/profile/profile", text: "个人", iconPath: "/images/tab_profile.png", selectedIconPath: "/images/tab_profile_active.png" }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      
      // 如果点击的是中间按钮 (index 2)
      if (data.index === 2) {
        wx.showToast({ title: '发布功能开发中', icon: 'none' });
        // 或者跳转/弹窗逻辑
        return; 
      }

      wx.switchTab({ url });
      this.setData({ selected: data.index });
    }
  }
})