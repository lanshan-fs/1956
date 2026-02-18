// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // ⚠️ 务必填入你的环境ID，不要留空，也不要用默认的 'cloud1-xxx'
        env: 'cloud1-8g1hzp6aa3efb8f4', 
        traceUser: true,
      })
    }
    this.globalData = {}
  }
})
