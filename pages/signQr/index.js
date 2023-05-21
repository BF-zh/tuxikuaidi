// pages/signQr/index.js
import wxbarcode from 'wxbarcode'
import {ENUM,getRandomString} from "../../utils/index"
let timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide:false,
    fail:false,
    signLiveTime:1,
    signInfo:{
      endTime:0,
      content:"13456"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.drow()
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
    clearInterval(timer)
    console.log("我卸载了");
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
  drow(){
    timer = setInterval(()=>{
      const signInfo = wx.getStorageSync(ENUM.SIGN_INFO)
      this.setData({signInfo})
      const now = Date.now()
      if(!(signInfo)){
        const endTime =  now + this.data.signLiveTime * 60 * 1000
        const content = getRandomString(10)
        this.setData({signInfo:{endTime,content}})
        wx.setStorageSync(ENUM.SIGN_INFO, {endTime,content})
        console.log("我需要重画了哦");
        this.setData({fail:false})
        wxbarcode.barcode('line-qr', content, 680, 200);
      }else{
        wxbarcode.barcode('line-qr', signInfo.content, 680, 200);
      }
      if(signInfo.endTime<now){
        this.setData({fail:true})
        clearInterval(timer)
      }
    },100)
  }
  ,redraw(){
    wx.removeStorage({key: ENUM.SIGN_INFO})
    this.drow()
  }
})