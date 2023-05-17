// pages/index/index.js
const {ENUM} = require("../../utils/index")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{
      activeId:0,
      activeColor:"#2faffa",
      defaultColor:"#ccc",
      edit:false,
      type:[
        {
          id:0,
          text:"文件",
          edit:false
        },
        {
          id:1,
          text:"数码产品",
          edit:false
        },
        {
          id:2,
          text:"生活用品",
          edit:false
        },
        {
          id:3,
          text:"服饰",
          edit:false
        },
        {
          id:4,
          text:"食品",
          edit:false
        },{
          id:5,
          text:"其他",
          edit:true
        }
      ]
    },
    place:{
      sendKey:'',
      receiveKey:'',
      send:null,
      sendText:"",
      sendDetailText:"",
      receive:null,
      receiveText:'',
      receiveDetailText:'',
      select:null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      "place.sendKey":ENUM.SEND_KEY
    })
    this.setData({
      "place.receiveKey":ENUM.RECEIVE_KEY
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
    this.getTabBar().init();
    const send =  wx.getStorageSync(ENUM.SEND_KEY)||null
    const receive =  wx.getStorageSync(ENUM.RECEIVE_KEY)||null
    const select = wx.getStorageSync(ENUM.SELECT_ITEM)||null

    if(select){
      this.setData({
        "place.select":select
      })
    }
    console.log(send);
    if(send){
      this.setData({
        "place.sendDetailText":`${send.place.province.text}-${send.place.city.text}-${send.detailPlace}`
      })
      this.setData({
        "place.sendText":`${send.name}  ${send.phone}`
      })
      this.setData({
        "place.send":send
      })
    }
    if(receive){
      this.setData({
        "place.receiveDetailText":`${receive.place.province.text}-${receive.place.city.text}-${receive.detailPlace}`
      })
      this.setData({
        "place.receiveText":`${receive.name}  ${receive.phone}`
      })
      this.setData({
        "place.receive":receive
      })
    }
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
  /**
   * 点击类型按钮的回掉
   * @param {*} e 默认事件
   */
  handleClickTagItem({target}){
    const {edit,id} = target.dataset.item
    this.setData({
      "goods.edit":edit
    })
    this.setData({
      "goods.activeId":id
    })
  },
  /**
   * 跳转到附近的寄件点
   */
  toSelectSendPlace(){
    wx.navigateTo({
      url: '/pages/selectPlace/index',
    })
  },
  handleToEditPlace({target}){
    const data={
      url:"/pages/index/index",
      ...target.dataset
    }
    wx.navigateTo({
      url: "/pages/editPlace/index",
      success(e){
        e.eventChannel.emit("editInfo",data)
      }
    })
  }
})