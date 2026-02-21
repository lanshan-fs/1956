Page({
  data: {
    allowSave: true,
    allowRemix: false,
    isAnonymous: false,
    closeComment: false,
    allowDonate: true,
    copyrightText: '原创声明'
  },

  onToggleSave(e) { this.setData({ allowSave: e.detail.value }); },
  onToggleRemix(e) { this.setData({ allowRemix: e.detail.value }); },
  onToggleAnonymous(e) { this.setData({ isAnonymous: e.detail.value }); },
  onToggleComment(e) { this.setData({ closeComment: e.detail.value }); },
  onToggleDonate(e) { this.setData({ allowDonate: e.detail.value }); },

  showCopyright() {
    wx.showActionSheet({
      itemList: ['原创声明', '转载请注明出处', '谢绝转载'],
      success: (res) => {
        this.setData({ copyrightText: ['原创声明', '转载请注明出处', '谢绝转载'][res.tapIndex] });
      }
    });
  }
})