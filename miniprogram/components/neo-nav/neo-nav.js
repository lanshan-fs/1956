Component({
  options: {
    multipleSlots: true
  },
  properties: {
    mode: {
      type: String,
      value: 'default'
    },
    title: {
      type: String,
      value: '1956 | BUCM'
    }
  },

  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    navHeaderHeight: 64,
    menuButtonInfo: {},
    navPaddingRight: 94 // 默认值
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync();
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      
      // 导航栏内容高度对齐胶囊
      const navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height;
      
      // 精确计算右边距：屏幕宽度 - 胶囊左边缘 + 额外间距(15px)
      const navPaddingRight = (systemInfo.windowWidth - menuButtonInfo.left) + 15;

      this.setData({
        statusBarHeight: systemInfo.statusBarHeight,
        navBarHeight: navBarHeight,
        navHeaderHeight: systemInfo.statusBarHeight + navBarHeight,
        menuButtonInfo: menuButtonInfo,
        navPaddingRight: navPaddingRight
      });

      this.triggerEvent('heightchange', {
        statusBarHeight: systemInfo.statusBarHeight,
        navBarHeight: navBarHeight,
        navHeaderHeight: systemInfo.statusBarHeight + navBarHeight
      });
    }
  },

  methods: {
    onSearch() {
      this.triggerEvent('search');
    },
    onTitleTap() {
      this.triggerEvent('titletap');
    }
  }
})