Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'goods-collect-o',
				text: '到店寄件',
				url: '/pages/index/index'
			},
			{
				icon: 'logistics',
				text: "我的快递",
				url: '/pages/goods/index'
			},
			{
				icon: 'user-circle-o',
				text: "个人中心",
				url: '/pages/me/index'
			},
		]
	},

	methods: {
		onChange(event) {
      this.setData({ active: event.detail });
			wx.switchTab({
        url: this.data.list[event.detail].url
			});
		},

		init() {
      const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
