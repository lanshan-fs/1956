// miniprogram/pages/settings/settings.js
Page({
  data: {
    cacheSize: '24.5 MB'
  },

  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url });
    }
  },

  onClearCache() {
    const that = this;
    wx.showModal({
      title: '清理缓存',
      content: '确定要清理本地缓存吗？',
      confirmColor: '#FF4D4D',
      success(res) {
        if (res.confirm) {
          wx.showLoading({ title: '清理中' });
          setTimeout(() => {
            wx.hideLoading();
            that.setData({ cacheSize: '0.0 MB' });
            wx.showToast({ title: '清理成功', icon: 'success' });
          }, 1000);
        }
      }
    });
  },

  onTapAbout() {
    wx.showModal({
      title: '1956',
      content: `北京中医药大学非官方学生社区
传承神农遗风，弘扬大医精诚。`,
      showCancel: false,
      confirmColor: '#FF4D4D'
    });
  },

  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      confirmText: '退出',
      confirmColor: '#FF4D4D',
      success(res) {
        if (res.confirm) {
          // 实际开发中这里会清除 storage 中的 token 等
          wx.reLaunch({
            url: '/pages/index/index'
          });
        }
      }
    });
  }
})