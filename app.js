//app.js
const wechat = require('./utils/wechat.js')
const api = require('./utils/api.js')

App({
  weappLogin: function() {
    var that = this;
    return new Promise(function(resolve, reject) {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          let data = {
            code: res.code
          };
          that.api.weappLogin(data).then(res => {
            console.log(res.data.data.token)
            that.globalData.token = res.data.data.token;
            resolve(that.globalData.token);
          }).catch(e => {
            reject(e);
          })
        }
      })
    })
  },
  onLaunch: function() {
    // wx.getSetting({
    //   success:res=>{
    //     if (res.authSetting['scope.userInfo']) {

    //     }else{
    //       wx.showModal({
    //         title: '用户授权',
    //         content: '121212',
    //       })
    //     }

    //   }
    // })
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // this.weappLogin();
    // this.weappLogin();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.setStorageSync('showAuth', 0)
        }
      }
    })
  },
  getShowAuth:function(){
      let showAuth =  wx.getStorageSync('showAuth');
      if(showAuth == '' && showAuth !== 0){
        wx.setStorageSync('showAuth', 1);
        showAuth = 1;
      }
      console.log(showAuth);
      return showAuth;
  },
  setShowAuth:function(val){
      wx.setStorageSync('showAuth',val);
  },
  globalData: {
    userInfo: null,
    token: null,
    uid: 193,
    cid:17,
    usid:243
    // admin_domain:"http://admin.mtan.com/company/intro/"
  },
  wechat: wechat,
  api: api
})