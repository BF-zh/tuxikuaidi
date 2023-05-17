// pages/sendPlace/index.js
const {ENUM} = require("../../utils/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId:null,
    vicinityPlace: [{
      id: 0,
      place: "上锦顾源34号自取点",
      detailPlace: "上锦顾源34号自取点",
      phone: "18888888888",
      distance: "690m"
    }, {
      id: 1,
      place: "成都郫都绿地三期店",
      detailPlace: "绿地三期一号橡树屋幼儿园对面中通快递",
      phone: "17777777777",
      distance: "690m"
    }, {
      id: 2,
      place: "成都天府新谷物流中心",
      detailPlace: "成都市双流区西航港经济开发区青霞路138号",
      phone: "16666666666",
      distance: "1.3km"
    }, {
      id: 3,
      place: "菁蓉国际配送服务站",
      detailPlace: "成都市成华区东风路四段77-87号附31号",
      phone: "15555555555",
      distance: "2.5km"
    }, {
      id: 4,
      place: "中通快递成都双流新时代广场网点",
      detailPlace: "成都市双流区华阳街新时代广场1楼1-13号",
      phone: "14444444444",
      distance: "3.6km"
    }, {
      id: 5,
      place: "韵达快递双流洛带物流园区",
      detailPlace: "成都市双流区洛带街道物流园区",
      phone: "13333333333",
      distance: "4.2km"
    }, {
      id: 6,
      place: "申通快递成都分部",
      detailPlace: "成都市武侯区肖家河正街29号",
      phone: "12222222222",
      distance: "5.4km"
    }, {
      id: 7,
      place: "邮政速递物流成都市通达分公司",
      detailPlace: "成都市高新区高朋大道中段888号",
      phone: "11111111111",
      distance: "6.7km"
    }, {
      id: 8,
      place: "德邦物流成都南沙中心",
      detailPlace: "成都市武侯区南沙滨江路1256号",
      phone: "19999999999",
      distance: "7.9km"
    }, {
      id: 9,
      place: "京东快递成都分公司",
      detailPlace: "成都市金牛区一环路北二段31号",
      phone: "18888888887",
      distance: "8.3km"
    }, {
      id: 10,
      place: "顺丰速运成都分部",
      detailPlace: "成都市锦江区水碾河路靠近书院街80号",
      phone: "18888888886",
      distance: "9.2km"
    }, {
      id: 11,
      place: "UPS成都分部",
      detailPlace: "成都市双流区新航路东段17号附12号",
      phone: "18888888885",
      distance: "10.1km"
    }, {
      id: 12,
      place: "FedEx成都分部",
      detailPlace: "成都市锦江区东大街215号阳光商场1楼",
      phone: "18888888884",
      distance: "12.5km"
    }, {
      id: 13,
      place: "EMS成都分公司",
      detailPlace: "成都市金牛区一环路北二段31号",
      phone: "18888888883",
      distance: "13.8km"
    }, {
      id: 14,
      place: "DHL成都分公司",
      detailPlace: "成都市锦江区东大街215号阳光商场1楼",
      phone: "18888888882",
      distance: "15.6km"
    }, {
      id: 15,
      place: "圆通快递成都分公司",
      detailPlace: "成都市武侯区科华北路96号",
      phone: "18888888881",
      distance: "18.3km"
    }, {
      id: 16,
      place: "优速快递成都分部",
      detailPlace: "成都市成华区万科城K8西区",
      phone: "18888888880",
      distance: "20.1km"
    }, {
      id: 17,
      place: "天天快递成都分公司",
      detailPlace: "成都市金牛区一环路北二段31号",
      phone: "18888888889",
      distance: "22.8km"
    }, {
      id: 18,
      place: "中铁快运成都分部",
      detailPlace: "成都市锦江区滨江东路8号1号楼1层9号铺位",
      phone: "17777777770",
      distance: "24.5km"
    }, {
      id: 19,
      place: "百世快递成都分公司",
      detailPlace: "成都市武侯区航天路10号百世广场3号楼",
      phone: "17777777771",
      distance: "27.3km"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   const item = wx.getStorageSync(ENUM.SELECT_ITEM)
   this.setData({
     activeId:item.id
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleSelectPlace({currentTarget}){
    const item = currentTarget.dataset.item
    wx.setStorageSync(ENUM.SELECT_ITEM, item)
    this.setData({
      "activeId":item.id
    })
    wx.navigateBack()
  }
})