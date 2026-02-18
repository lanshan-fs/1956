Component({
  data: {
    selected: 0,
    list: [
      { pagePath: "/pages/index/index", text: "首页", iconPath: "/images/tab_home.png", selectedIconPath: "/images/tab_home_active.png" },
      { pagePath: "/pages/market/market", text: "集市", iconPath: "/images/tab_market.png", selectedIconPath: "/images/tab_market_active.png" },
      { pagePath: "/pages/post/post", text: "" }, 
      { pagePath: "/pages/notice/notice", text: "公告", iconPath: "/images/tab_notice.png", selectedIconPath: "/images/tab_notice_active.png" },
      { pagePath: "/pages/profile/profile", text: "个人", iconPath: "/images/tab_profile.png", selectedIconPath: "/images/tab_profile_active.png" }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index

      // 假设第 2 个索引 (index === 2) 是发布按钮
      // 或者判断 url 是否为空/特定标识
      if (index === 2) { 
        // 核心：点击“+”时，使用 navigateTo 跳转，而不是 switchTab
        wx.navigateTo({
          url: '/pages/post/post'
        })
      } else {
        // 普通 Tab 切换
        wx.switchTab({ url })
        this.setData({ selected: index })
      }
    }
  }
})