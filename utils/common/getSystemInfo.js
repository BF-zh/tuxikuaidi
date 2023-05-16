module.exports = function getSystemInfo(){
  const {
    statusBarHeight,
    platform,
    screenWidth,
  } = wx.getSystemInfoSync()
  const {
    top:menuButtonTop,
    height:menuButtonHeight,
    left:menuButtonLeft,
    width:menuButtonWidth,
    right:menuButtonRight
  } = wx.getMenuButtonBoundingClientRect()
 const height =( menuButtonTop && menuButtonTop !== 0 && menuButtonHeight && menuButtonHeight !== 0)?((menuButtonTop - statusBarHeight) * 2 + menuButtonHeight):(platform === 'android' ? 48 : 40)

  return {
    height,// 导航栏的高度 px
    width:screenWidth,// 导航栏的宽度 单位 px
    statusBarHeight,// 状态栏的高度 单位 px
    menuButton:{ // 菜单按钮的坐标信息
      top:menuButtonTop,
      height:menuButtonHeight,
      left:menuButtonLeft,
      width:menuButtonWidth,
      right:menuButtonRight
    },
  }
}
