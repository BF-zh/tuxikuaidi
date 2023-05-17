// app.js
const {getProvince} = require("./utils/index")
App({
  onLaunch() {
    this.globalData.province=getProvince()
  },
  globalData: {
    province:null
  }
})
