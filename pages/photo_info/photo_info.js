// pages/photo_info/photo_info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:[],
      video:null,
      is_play:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let photo_id = options.photo_id;
    this.getPhotoInfo(photo_id);
    this.video = wx.createVideoContext('myvideo');
    this.is_play = 1;
  },

  parseVideo:function()
  { 
      if(this.data.is_play == 1){
        var is_play = 0
      }else{
        var is_play = 1;
      }
      this.setData({
        'is_play':is_play
      })
      if(this.data.is_play == 1){
        this.video.pause();
      }else{
        this.video.play();
      }
      

  },

  getPhotoInfo: function (photo_id=0) {
    let data = {
      photo_id:photo_id,
      token: app.globalData.token,
    }
    app.api.photoInfo(data).then(res => {
      this.setData({
        info: res.data.data
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})