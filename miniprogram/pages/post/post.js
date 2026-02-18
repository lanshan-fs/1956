const app = getApp()

Page({
  data: {
    content: '',
    tempImages: [],
    availableTags: [
      { name: '日常', color: '#fffbeb' }, // 柔和黄
      { name: '集市', color: '#fee2e2' }, // 柔和红
      { name: '岐黄问答', color: '#e0f2fe' }, // 柔和蓝 (中医药特色)
      { name: '草药园', color: '#dcfce7' }, // 绿色 (中医药特色)
      { name: '吐槽', color: '#f3e8ff' }  // 紫色
    ],
    selectedTag: '日常',
    submitting: false
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value })
  },

  chooseImage() {
    wx.chooseMedia({
      count: 9 - this.data.tempImages.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFiles.map(file => file.tempFilePath)
        this.setData({
          tempImages: this.data.tempImages.concat(newImages)
        })
      }
    })
  },

  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.tempImages
    images.splice(index, 1)
    this.setData({ tempImages: images })
  },

  selectTag(e) {
    this.setData({ selectedTag: e.currentTarget.dataset.tag })
  },

  async submitPost() {
    if (!this.data.content.trim() && this.data.tempImages.length === 0) {
      wx.showToast({ title: '写点什么吧~', icon: 'none' })
      return
    }

    this.setData({ submitting: true })
    wx.showLoading({ title: '发布中...' })

    try {
      // 1. 上传图片到云存储
      const imageUploadTasks = this.data.tempImages.map((filePath, index) => {
        const cloudPath = `posts/${Date.now()}-${index}-${Math.floor(Math.random()*1000)}.png`
        return wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath
        })
      })

      const uploadResults = await Promise.all(imageUploadTasks)
      const fileIDs = uploadResults.map(res => res.fileID)

      // 2. 调用云函数存储数据
      const { result } = await wx.cloud.callFunction({
        name: 'createPost',
        data: {
          content: this.data.content,
          images: fileIDs,
          tags: [this.data.selectedTag],
          type: 'standard' // 可扩展
        }
      })

      wx.hideLoading()

      if (result.code === 200) {
        wx.showToast({ title: '发布成功', icon: 'success' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      } else {
        wx.showToast({ title: result.msg || '发布失败', icon: 'none' })
      }

    } catch (err) {
      console.error(err)
      wx.hideLoading()
      wx.showToast({ title: '网络开小差了', icon: 'none' })
    } finally {
      this.setData({ submitting: false })
    }
  }
})