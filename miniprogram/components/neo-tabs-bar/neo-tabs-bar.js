Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    recommendTabs: {
      type: Array,
      value: []
    },
    active: {
      type: Number,
      value: 0
    },
    top: {
      type: Number,
      value: 0
    },
    showMore: {
      type: Boolean,
      value: true
    }
  },

  data: {
    showPopup: false,
    isEditMode: false
  },

  methods: {
    onTabTap(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('change', { index });
      if (this.data.showPopup) {
        this.setData({ showPopup: false });
      }
    },

    togglePopup() {
      this.setData({
        showPopup: !this.data.showPopup,
        isEditMode: false // 每次打开/关闭重置编辑模式
      });
    },

    toggleEditMode() {
      this.setData({
        isEditMode: !this.data.isEditMode
      });
    },

    onRemoveTab(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('remove', { index });
    },

    onAddTab(e) {
      const { index } = e.currentTarget.dataset;
      this.triggerEvent('add', { index });
    },

    stopProp() {}
  }
})