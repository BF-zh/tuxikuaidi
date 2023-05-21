// app.js
import {getProvince} from "./utils/index"
import {ENUM} from "./utils/index"
App({
  onLaunch() {
    wx.onAppRoute((Option)=>{
      const isLogin = wx.getStorageSync(ENUM.AUTH)||false
      const {path} = Option
      if(!isLogin&&path!==ENUM.AUTH_PATH){
        wx.navigateTo({
          url: '/pages/auth/index'
        })
      }else{
        console.log("你登陆了哦");
      }
    })
    this.globalData.province=getProvince()
  },
  globalData: {
    province:null
  }
})
