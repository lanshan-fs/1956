// miniprogram/pages/cert/cert.js
Page({
  data: {
    departments: ['中医学院', '中药学院', '生命科学学院', '针灸推拿学院', '管理学院', '护理学院', '人文学院', '第一临床医学院', '第二临床医学院', '第三临床医学院'],
    selectedDept: '',
    formData: {
      name: '',
      studentId: '',
      dept: ''
    }
  },

  onDeptChange(e) {
    this.setData({
      selectedDept: this.data.departments[e.detail.value]
    });
  },

  onSubmit() {
    // 简单校验
    if (!this.data.selectedDept) {
      wx.showToast({
        title: '请选择院系',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '正在提交',
    });

    // 模拟提交过程
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '信息确认',
        content: '即将跳转学校认证系统，是否继续？',
        confirmColor: '#FF4D4D',
        success(res) {
          if (res.confirm) {
            wx.showToast({
              title: '验证接口开发中',
              icon: 'none'
            });
          }
        }
      });
    }, 1000);
  }
})