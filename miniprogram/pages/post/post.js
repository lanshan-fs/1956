Page({
  data: {
    content: '',
    tempImages: [], // 本地临时图片路径
    // 北中医特色标签
    availableTags: [
      { name: '日常', color: '#fffbeb' },
      { name: '集市', color: '#fee2e2' },
      { name: '岐黄问答', color: '#e0f2fe' },
      { name: '草药园', color: '#dcfce7' },
      { name: '吐槽', color: '#f3e8ff' }
    ],
    selectedTag: '日常',
    submitting: false
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value })
  },

  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 9 - this.data.tempImages.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const newImages = res.tempFiles.map(f => f.tempFilePath)
        this.setData({
          tempImages: this.data.tempImages.concat(newImages)
        })
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const idx = e.currentTarget.dataset.index
    const imgs = this.data.tempImages
    imgs.splice(idx, 1)
    this.setData({ tempImages: imgs })
  },

  // 选择标签
  selectTag(e) {
    this.setData({ selectedTag: e.currentTarget.dataset.tag })
  },

  // 核心：发布逻辑
  async submitPost() {
    if (!this.data.content.trim() && this.data.tempImages.length === 0) {
      wx.showToast({ title: '写点什么吧~', icon: 'none' })
      return
    }

    this.setData({ submitting: true })
    wx.showLoading({ title: '上传中...', mask: true })

    try {
      // 1. 并发上传图片到云存储
      const uploadTasks = this.data.tempImages.map((filePath, index) => {
        const cloudPath = `posts/${Date.now()}-${Math.floor(Math.random()*10000)}.png`
        return wx.cloud.uploadFile({
          cloudPath: cloudPath,
          filePath: filePath
        })
      })

      const uploadResults = await Promise.all(uploadTasks)
      const fileIDs = uploadResults.map(res => res.fileID)

      // 2. 调用云函数写入数据库
      const { result } = await wx.cloud.callFunction({
        name: 'createPost',
        data: {
          content: this.data.content,
          images: fileIDs,
          tags: [this.data.selectedTag],
          type: 'daily'
        }
      })

      wx.hideLoading()

      if (result.code === 200) {
        wx.showToast({ title: '发布成功', icon: 'success' })
        setTimeout(() => {
          wx.navigateBack() // 返回上一页
        }, 1500)
      } else {
        throw new Error(result.msg || '发布失败')
      }

    } catch (err) {
      console.error(err)
      wx.hideLoading()
      wx.showToast({ title: '发布出错了', icon: 'none' })
    } finally {
      this.setData({ submitting: false })
    }
  }
})