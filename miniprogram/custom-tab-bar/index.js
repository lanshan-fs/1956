Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    // 确保你的 list 顺序如下，中间第3个（索引为2）是发布按钮
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/images/tab_home.png",
        selectedIconPath: "/images/tab_home_active.png",
        text: "首页"
      },
      {
        pagePath: "/pages/market/market",
        iconPath: "/images/tab_market.png",
        selectedIconPath: "/images/tab_market_active.png",
        text: "集市"
      },
      {
        // 这里的 path 写什么不重要，因为我们会拦截它，但不能为空，防止报错
        pagePath: "/pages/post/post", 
        iconPath: "/images/tab_add.png",
        selectedIconPath: "/images/tab_add.png",
        text: "+"
      },
      {
        pagePath: "/pages/notice/notice",
        iconPath: "/images/tab_notice.png",
        selectedIconPath: "/images/tab_notice_active.png",
        text: "消息"
      },
      {
        pagePath: "/pages/profile/profile",
        iconPath: "/images/tab_profile.png",
        selectedIconPath: "/images/tab_profile_active.png",
        text: "我的"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const index = data.index

      // === 核心修复代码开始 ===
      
      // 判断点击的是中间的 "+" 按钮（索引为 2）
      if (index === 2) {
        wx.navigateTo({
          url: '/pages/post/post',
          fail: (err) => {
            console.error('跳转失败:', err)
            wx.showToast({ title: '跳转失败，请检查路径', icon: 'none' })
          }
        })
        return // ！！！关键：阻止代码继续往下执行 switchTab
      }

      // === 核心修复代码结束 ===

      // 正常的 Tab 切换逻辑
      wx.switchTab({
        url,
        success: () => {
          this.setData({ selected: index })
        }
      })
    }
  }
})