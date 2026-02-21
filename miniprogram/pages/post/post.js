const app = getApp()

Page({
  data: {
    navHeaderHeight: 64,
    title: '',
    content: '',
    tempImages: [],
    locationName: '',
    selectedTopic: '',
    privacyOptions: ['公开', '仅自己可见', '校友可见'],
    privacyIndex: 0,
    hasVoice: false,
    hasVote: false,
    canPost: false,
    submitting: false
  },

  onNavHeightChange(e) {
    this.setData({ navHeaderHeight: e.detail.navHeaderHeight });
  },

  checkPostStatus() {
    const { title, content, tempImages, hasVoice } = this.data;
    this.setData({
      canPost: title.length > 0 || content.length > 0 || tempImages.length > 0 || hasVoice
    });
  },

  onTitleInput(e) { this.setData({ title: e.detail.value }, this.checkPostStatus); },
  onContentInput(e) { this.setData({ content: e.detail.value }, this.checkPostStatus); },

  chooseImage() {
    wx.chooseMedia({
      count: 9 - this.data.tempImages.length,
      mediaType: ['image'],
      success: (res) => {
        const paths = res.tempFiles.map(file => file.tempFilePath);
        this.setData({ tempImages: [...this.data.tempImages, ...paths] }, this.checkPostStatus);
      }
    });
  },

  deleteImage(e) {
    const { index } = e.currentTarget.dataset;
    const images = [...this.data.tempImages];
    images.splice(index, 1);
    this.setData({ tempImages: images }, this.checkPostStatus);
  },

  toggleVoiceRecord() {
    if (this.data.hasVoice) return;
    wx.showModal({
      title: '语音输入',
      content: '开始录制 60s 内的语音动态',
      confirmText: '开始录音',
      success: (res) => {
        if (res.confirm) {
          this.setData({ hasVoice: true }, this.checkPostStatus);
          wx.showToast({ title: '已录制 15"', icon: 'none' });
        }
      }
    });
  },

  clearVoice() {
    this.setData({ hasVoice: false }, this.checkPostStatus);
  },

  playVoice() {
    wx.showToast({ title: '正在播放...', icon: 'none' });
  },

  showVotePopup() {
    wx.showModal({
      title: '发起投票',
      content: '是否配置投票选项？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ hasVote: true });
          wx.showToast({ title: '投票已挂载', icon: 'none' });
        }
      }
    });
  },

  showTopicPicker() {
    wx.showActionSheet({
      itemList: ['#良乡校园', '#中医基础', '#1956社区', '#考研打卡', '#北中医美食'],
      success: (res) => {
        this.setData({ selectedTopic: ['良乡校园', '中医基础', '1956社区', '考研打卡', '北中医美食'][res.tapIndex] });
      }
    });
  },

  mentionUser() {
    wx.showToast({ title: '选择用户逻辑开发中', icon: 'none' });
  },

  chooseLocation() {
    wx.chooseLocation({
      success: (res) => this.setData({ locationName: res.name })
    });
  },

  showPrivacyPopup() {
    wx.showActionSheet({
      itemList: this.data.privacyOptions,
      success: (res) => this.setData({ privacyIndex: res.tapIndex })
    });
  },

  goToAdvanced() {
    wx.navigateTo({ url: '/pages/post-advanced/post-advanced' });
  },

  saveDraft() {
    wx.showToast({ title: '草稿已保存', icon: 'success' });
  },

  submitPost() {
    if (!this.data.canPost) return;
    this.setData({ submitting: true });
    setTimeout(() => {
      this.setData({ submitting: false });
      wx.showToast({ title: '发布成功' });
      setTimeout(() => wx.navigateBack(), 1000);
    }, 1500);
  }
})