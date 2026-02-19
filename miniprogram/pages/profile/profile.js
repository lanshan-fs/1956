// miniprogram/pages/profile/profile.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 0, // 当前选中的 Tab 索引
    userInfo: {
      nickname: '北中医小郎中',
      id: '1956001',
      isCertified: false,
      bio: '一名热爱针灸的 1956 级学子。🌿\n志向：传承神农遗风，弘扬大医精诚。'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 可以在这里获取用户的真实信息
  },

  /**
   * 切换内容 Tab
   */
  switchTab(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    if (this.data.activeTab === index) return;
    
    this.setData({
      activeTab: index
    });
    
    // 可以在这里根据 index 加载对应的动态/收藏/点赞列表
    wx.vibrateShort({
      type: 'light'
    });
  },

  /**
   * 点击设置按钮
   */
  onTapSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings',
    });
  },

  /**
   * 点击认证 Banner
   */
  onTapCert() {
    wx.navigateTo({
      url: '/pages/cert/cert',
    });
  },

  /**
   * 点击联系我们
   */
  onTapContact() {
    wx.showActionSheet({
      itemList: ['在线客服', '意见反馈', '关于我们'],
      success(res) {
        switch (res.tapIndex) {
          case 0:
            console.log('打开客服');
            break;
          case 1:
            console.log('打开反馈');
            break;
          case 2:
            console.log('打开关于');
            break;
        }
      }
    });
  },

  /**
   * 点击编辑资料
   */
  onTapEdit() {
    wx.navigateTo({
      url: '/pages/profile-edit/profile-edit',
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '快来加入 1956 北中医社区',
      path: '/pages/index/index'
    };
  }
})