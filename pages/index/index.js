//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    list: [],
    page: 1,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.getRecommedsData(this.data.page)
  },

  onLoad: function() {
    //获取第一页数据
    this.getRecommedsData(1);
    // console.log(this.data)
  },

  loadImg:function(event){
    let index = event.currentTarget.dataset.index;
    console.log(index);
    let cover = 'list['+index+'].cover';
     this.setData({
       [cover]:'/pages/images/loading.png'
     })
      // event.currentTarget.dataset.src= '/pages/images/loading.png';
  },

  getRecommedsData: function(page) {
    var data = {
      page: page,
      user_share_id: app.globalData.usid,
      limit: 8,
      uid:app.globalData.uid,
      token: app.globalData.token
    }
    app.api.getRecommedsList(data).then(res => {
      this.setData({
        list: this.data.list.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
  },
  switchToHome: function () {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },

})