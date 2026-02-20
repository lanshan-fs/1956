// pages/chat/chat.js
const app = getApp()

Page({
  data: {
    navTotalHeight: 64,
    navContentTop: 24,
    navContentHeight: 32,
    menuButtonWidth: 80,
    
    keyboardHeight: 0,
    showTools: false,
    
    userInfo: {
      nickname: '正在获取...',
      avatar: ''
    },
    
    inputValue: '',
    messages: [],
    lastMessageId: '',
  },

  onLoad(options) {
    this.initNavigation();
    
    // 获取传递的用户信息
    if (options.id) {
      // 模拟根据 ID 获取卖家/用户昵称
      this.setData({
        'userInfo.nickname': options.nickname || '中医药小锦鲤',
        'userInfo.avatar': options.avatar || ''
      });
    }

    this.initMockMessages();
  },

  initNavigation() {
    const sysInfo = wx.getSystemInfoSync();
    const menuButton = wx.getMenuButtonBoundingClientRect();
    
    this.setData({
      navTotalHeight: menuButton.bottom + 8,
      navContentTop: menuButton.top,
      navContentHeight: menuButton.height,
      menuButtonWidth: sysInfo.windowWidth - menuButton.left
    });
  },

  initMockMessages() {
    const mock = [
      { id: 1, type: 'text', content: '同学你好，请问内科学教材还在吗？', isMe: true, time: '14:20', showTime: true },
      { id: 2, type: 'text', content: '还在的，你是良乡校区的吗？', isMe: false, time: '14:21', avatar: '' },
      { id: 3, type: 'text', content: '是的，我是在西院这边', isMe: true, time: '14:22' },
      { id: 4, type: 'text', content: '好的，下午5点在图书馆门口交易可以吗？', isMe: false, time: '14:23' },
    ];
    
    this.setData({
      messages: mock,
      lastMessageId: `msg-${mock[mock.length - 1].id}`
    });
  },

  onNavBack() {
    wx.navigateBack();
  },

  onMoreOptions() {
    wx.showActionSheet({
      itemList: ['举报该用户', '清空聊天记录', '拉黑'],
      success(res) {
        console.log(res.tapIndex)
      }
    });
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  onFocus(e) {
    this.setData({ 
      keyboardHeight: e.detail.height || 0,
      showTools: false
    });
    this.scrollToBottom();
  },

  onBlur() {
    this.setData({ keyboardHeight: 0 });
  },

  onSend() {
    if (!this.data.inputValue.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      type: 'text',
      content: this.data.inputValue,
      isMe: true,
      time: this.getCurrentTime()
    };
    
    this.addMessage(newMsg);
    
    this.setData({ inputValue: '' });
    
    // 模拟自动回复
    setTimeout(() => {
      this.mockReply();
    }, 1000);
  },

  addMessage(msg) {
    const messages = [...this.data.messages, msg];
    this.setData({
      messages,
      lastMessageId: `msg-${msg.id}`
    });
    this.scrollToBottom();
  },

  mockReply() {
    const reply = {
      id: Date.now(),
      type: 'text',
      content: 'OK，我看到了。稍后联系你~',
      isMe: false,
      time: this.getCurrentTime()
    };
    this.addMessage(reply);
    wx.vibrateShort({ type: 'light' });
  },

  scrollToBottom() {
    setTimeout(() => {
      this.setData({
        lastMessageId: 'bottom-pad'
      });
    }, 100);
  },

  getCurrentTime() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
  },

  onToggleTools() {
    this.setData({
      showTools: !this.data.showTools,
      keyboardHeight: 0
    });
    this.scrollToBottom();
  },

  onChooseImage() {
    const that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        const path = res.tempFilePaths[0];
        that.sendImageMessage(path);
      }
    });
  },

  sendImageMessage(path) {
    const newMsg = {
      id: Date.now(),
      type: 'image',
      content: path,
      isMe: true,
      time: this.getCurrentTime()
    };
    this.addMessage(newMsg);
  },

  onPreviewImage(e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src,
      urls: [src]
    });
  },
  
  // 其他功能入口暂不实现具体逻辑
  onTakePhoto() { wx.showToast({ title: '暂未开放', icon: 'none' }); },
  onSendLocation() { wx.showToast({ title: '暂未开放', icon: 'none' }); }
});