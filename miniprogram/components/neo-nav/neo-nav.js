Component({
  options: {
    multipleSlots: true
  },
  properties: {
    mode: {
      type: String,
      value: 'default' // 'default' 或 'custom'
    },
    title: {
      type: String,
      value: '1956 | BUCM'
    },
    leftIcon: {
      type: String,
      value: 'search' // 'search' 或 'back'
    }
  },

  data: {
    statusBarHeight: 20,
    navBarHeight: 44,
    navHeaderHeight: 64,
    menuButtonInfo: {},
    navPaddingRight: 94
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync();
      const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      const navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height;
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
    onLeftTap() {
      if (this.properties.leftIcon === 'back') {
        wx.navigateBack({
          fail: () => {
            wx.switchTab({ url: '/pages/index/index' });
          }
        });
      } else {
        this.triggerEvent('search');
      }
    },
    onTitleTap() {
      this.triggerEvent('titletap');
    }
  }
})