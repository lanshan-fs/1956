Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },
    active: {
      type: Number,
      value: 0
    },
    // Optional: key to display if tabs are objects (e.g., 'name')
    rangeKey: {
      type: String,
      value: ''
    }
  },
  methods: {
    onTap(e) {
      const index = e.currentTarget.dataset.index;
      if (this.data.active === index) return;
      
      const item = this.data.tabs[index];
      this.triggerEvent('change', { 
        index: index, 
        item: item 
      });
    }
  }
})