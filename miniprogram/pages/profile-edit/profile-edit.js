// miniprogram/pages/profile-edit/profile-edit.js
Page({
  data: {
    genders: ['男', '女', '保密'],
    campuses: ['良乡校区', '和平街校区', '望京校区'],
    userInfo: {
      avatarUrl: '../../images/tab_profile_active.png',
      nickname: '北中医小郎中',
      gender: '男',
      campus: '良乡校区',
      bio: `一名热爱针灸的 1956 级学子。🌿
志向：传承神农遗风，弘扬大医精诚。`
    }
  },

  onNicknameInput(e) {
    this.setData({ 'userInfo.nickname': e.detail.value });
  },

  onGenderChange(e) {
    this.setData({ 'userInfo.gender': this.data.genders[e.detail.value] });
  },

  onCampusChange(e) {
    this.setData({ 'userInfo.campus': this.data.campuses[e.detail.value] });
  },

  onBioInput(e) {
    this.setData({ 'userInfo.bio': e.detail.value });
  },

  onChooseAvatar() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({ 'userInfo.avatarUrl': res.tempFilePaths[0] });
      }
    });
  },

  onSave() {
    wx.showLoading({ title: '正在保存' });
    
    // 模拟保存接口调用
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '修改已保存',
        icon: 'success'
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1000);
    }, 800);
  }
})