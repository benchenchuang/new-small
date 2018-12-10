// pages/photo/photo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getPhotoList(1);
  },

  getPhotoList:function(page=1){
    let data={
      page:page,
      limit:10,
      token:app.globalData.token,
      uid:app.globalData.uid,
      cid:app.globalData.cid
    }
    app.api.photoList(data).then(res => {
      this.setData({
        list: this.data.list.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
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
    this.setData({
      page: this.data.page + 1
    })
    this.getPhotoList(this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})