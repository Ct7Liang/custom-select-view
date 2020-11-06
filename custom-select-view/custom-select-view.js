Component({

  properties: {
    data: {
      type: Array,
      value: []
    },
    showLabelKey: {
      type: String,
      value: ''
    },
    currentLabel: {
      type: String,
      value: '',
    },
  },

  lifetimes: {
    attached() {

    },
    detached: function () {

    },
  },

  data: {
    isShow: false,
    currentObject: null,
    tempObject: null,
    currentValue: [],
    labels: [],
  },

  methods: {

    /**
     * 显示
     */
    show() {
      this.initData()
      this.setData({
        isShow: true
      })
    },

    /**
     * 取消
     */
    hide() {
      this.setData({
        isShow: false
      })
      this.triggerEvent('onSelectCancel', {})
    },

    /**
     * 选中
     */
    commit() {
      if (this.properties.data.length != 0 && this.data.tempObject == null) {
        this.setData({
          tempObject: this.properties.data[0],
        })
      }
      this.setData({
        isShow: false,
        currentObject: this.data.tempObject
      })
      this.triggerEvent('onValueSelected', this.data.currentObject, {})
    },

    /**
     * 设置数据
     */
    initData() {
      this.data.labels = []
      for(let i = 0; i < this.properties.data.length; i++){
        this.data.labels.push(this.properties.data[i][this.properties.showLabelKey])
      }
      this.data.currentValue = [this.data.labels.indexOf(this.data.currentLabel)]
      this.setData({
        labels: this.data.labels,
        currentValue: this.data.currentValue,
      })
    },

    /**
     * 监听选择器发生滑动变化
     */
    bindChange(e) {
      // console.log(e)
      this.data.tempObject = this.properties.data[e.detail.value[0]]
    },

  },

});