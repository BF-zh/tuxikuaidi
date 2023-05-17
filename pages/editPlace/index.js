// pages/sendPlace/index.js
const {globalData} = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPhone:true,
    props:"",
    name:"",
    phone:"",
    place:"",
    placeFormat:"",
    detailPlace:"",
    isSaveComentPlace:false,
    treeSelect:{
      show:false,
      items:[],
      mainActiveIndex:0,
      activeId:null
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let event = this.getOpenerEventChannel();
    if(event){
      event.on('editInfo', (data)=> {
        wx.setNavigationBarTitle({
          title:data.title
        })
        this.setData({
          "props":data
        })
      })
    }
    this.setData({
      "treeSelect.items":globalData.province
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
  const key = this.data.props.key
   const {detailPlace,place,phone,name,placeFormat,activeId,mainActiveIndex}= wx.getStorageSync(key)||{}
   if(detailPlace) this.setData({detailPlace})
   if(phone) this.setData({phone})
   if(name) this.setData({name})
   if(placeFormat) this.setData({placeFormat})
   if(place) this.setData({place})
   if(activeId) this.setData({"treeSelect.activeId":activeId})
   if(mainActiveIndex) this.setData({"treeSelect.mainActiveIndex":mainActiveIndex})
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
   * 输入框事件
   */
  handleInputEdit(e){
    const key=e.target.dataset.key
    this.setData({
      [key]:e.detail
    })
  },
  /**
   * 验证手机号
   */
  verifyPhone(){
    const isPhone= /^1[3456789]\d{9}$/.test(this.data.phone)
    this.setData({isPhone})
  },
  Toast(title){
    wx.showToast({
      title: title,
      icon:"none"
    })
  },
  /**
   * 点击保存
   */
  handleSubmit(){
    const {phone,place,name,isSaveComentPlace,detailPlace,treeSelect,placeFormat} = this.data
    if(!name) return this.Toast("姓名不能为空")
    if(!placeFormat) return this.Toast("地址不能为空")
    if(!detailPlace) return this.Toast("详细地址不能为空")
    if(!detailPlace.length>4) return this.Toast("详细不能小于4个字符")
    const key = this.data.props.key
    wx.setStorageSync(key, {
      phone,
      place,
      name,
      placeFormat,
      detailPlace,
      activeId:treeSelect.activeId,
      mainActiveIndex:treeSelect.mainActiveIndex
    })
    wx.navigateBack()
  },
  /**
   * 点击选择地区
   */
  handleSlectPlace({target}){
    const flag = target.dataset.key
    const {items,activeId,mainActiveIndex} = this.data.treeSelect
    this.setData({
      "treeSelect.show":flag
    })
    if(!flag){
      const main = (items[mainActiveIndex])
      const city = main.children.find(v=>v.id===activeId)
      const {children,...province} = main
      if(!city) return
      this.setData({
        placeFormat:`${province.text}-${city.text}`
      })
      this.setData({
        "place":{city,province}
      })
    }
   
  },
  handleClicktreeSelectNav({ detail = {} }) {
    this.setData({
      "treeSelect.mainActiveIndex": detail.index || 0,
    });
  },

  handleClicktreeSelectItem({ detail = {} }) {
    const activeId = this.data.activeId === detail.id ? null : detail.id;
    this.setData({"treeSelect.activeId": activeId });
  },
})