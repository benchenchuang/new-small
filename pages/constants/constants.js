// pages/constants/constants.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'page':1,
    'constants':[]
  },

  /** 
   * 获取场景数据
  */
  getConstants: function (page = 1) {
    var data = {
      'page': page,
      'limit': 8,
      'type': 1,
      'uid': app.globalData.uid,
      'cid': app.globalData.cid,
      'token': app.globalData.token

    };
    app.api.constants(data).then(res => {
      this.setData({
        constants: this.data.constants.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getConstants();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let now_page = this.data.page + 1
    this.setData({
      page: now_page
    })
    this.getConstants(now_page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})