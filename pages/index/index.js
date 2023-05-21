// pages/index/index.js
import {ENUM} from '../../utils/index'
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';
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
      ],
      weight:{
        show:false,
        _default:[
          {
            id:1,
            text:"1KG",
            isCustom:false
          },
          {
            id:2,
            text:"2KG",
            isCustom:false
          },
          {
            id:3,
            text:"3KG",
            isCustom:false
          },
          {
            id:4,
            text:"自定义",
            isCustom:true
          }
        ],
        activeId:null,
        isCustom:false,
      },
      agree:false
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
    },
    prohibitGoods:"各种枪支弹药、易燃物品、化学危险物品、毒品、各类生化制品、传染性感染性物质、各类非法伪造/侵权物品……",
    customGoodsType:'',
    tellContent:"",
    _tellContent:"",
    showTellBox:false,
    inputAutoSize:{maxHeight: 100,minHeight: 50},
    goodsCustomWeight:'',
    _goodsCustomWeight:""
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
    console.log(ENUM  );
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
  },
  handleShowProhibitGoods(){
    Dialog.alert({
      title: '禁寄物品',
      message: this.data.prohibitGoods,
    }).then(() => {
    });
  },
  handleSelectShowGoodsWeigthBox({currentTarget}){
    const flag = currentTarget.dataset.key
    this.setData({
      "goods.weight.show":flag
    })
  },
  handleClickSelectGoodsWigth({currentTarget}){
    const item = currentTarget.dataset.item
    this.setData({"goods.weight.activeId":item.id})
    this.setData({"goods.weight.isCustom":item.isCustom})
  },
  handleSelectShowTellBox({currentTarget}){
    const showTellBox = currentTarget.dataset.key
    if(showTellBox){
      this.setData({
        _tellContent:this.data.tellContent
      })
    }
    this.setData({showTellBox})
  },
  handleSaveTellContext(){
    this.setData({
      "tellContent":this.data._tellContent
    })
  },
  handleSaveWeight(){
    const {_default,activeId} = this.data.goods.weight
    const {isCustom,...item} = _default.find(({id})=>id===activeId)
    this.setData({
      "goods.weight.show":false
    })
    if(isCustom){
      this.setData({goodsCustomWeight:this.data._goodsCustomWeight })
      return
    }
    this.setData({
      goodsCustomWeight:item.text
    })
  },
  handleChangeAgree(){
    const agree = !this.data.agree
    this.setData({agree})
  },
  handleSubmitOrder(){
    const place = this.data.place.select?.place// 寄件点
    const sendUserInfo=this.data.place.send// 寄件人
    const receiveUserInfo=this.data.place.receive// 收件人
    const goodsType = this.data.goods.type.find(item=>item.id===this.data.goods.activeId&&!item.edit)?.text||this.data.customGoodsType
    const weight = this.data.goodsCustomWeight
    if(!place) return Toast("寄件点不能为空")
    if(!sendUserInfo) return Toast("请填写寄件人信息")
    if(!receiveUserInfo) return Toast("请填写收件人信息")
    if(!goodsType) return Toast("请选择物品类型")
    if(!weight) return Toast("请预估商品重量")
  }
})