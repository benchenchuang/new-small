// pages/constant_info/constant_info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    lists: [],
    constant_id: 0,
    constant_video: null,
    page: 1,
    like_name: 'like-o',
  },

  constantInfo: function(constant_id) {
    var data = {
      constant_id: constant_id,
      token: app.globalData.token
    }
    app.api.constantInfo(data).then(res => {
      this.setData({
        result: res.data.data
      })
      if (this.data.result.is_praise == 1) {
        this.setData({
          like_name: 'like'
        })
      }
      console.log(this.data.result);
    }).catch(e => {
      console.error(e)
    })
  },

  likeClick: function() {
    //调用 点赞接口
    console.log('点赞接口')
    this.praise(this.data.constant_id);
  },

  //标签推荐文章列表
  tagConstants: function(page = 1) {
    var data = {
      constant_id: this.data.constant_id,
      page: page,
      limit: 10,
      uid: app.globalData.uid,
      cid: app.globalData.cid,
      token: app.globalData.token
    }
    app.api.tagConstants(data).then(res => {
      this.setData({
        lists: this.data.lists.concat(res.data.data)
      })
      console.log(this.data.result);
    }).catch(e => {
      console.error(e)
    })
  },
  //点赞方法
  praise: function(constant_id) {
    var data = {
      constant_id: constant_id,
      token: app.globalData.token
    }
    app.api.constantPraise(data).then(res => {
      // this.setData({
      //   result: res.data.data
      // })
      let now_parise_counts = parseInt(this.data.result.praises_count)
      if (this.data.result.is_praise == 1) {
        this.setData({
          "result.praises_count": now_parise_counts - 1,
          "result.is_praise": 0,
          "like_name": 'like-o'
        })
      } else {
        this.setData({
          "result.praises_count": now_parise_counts + 1,
          "result.is_praise": 1,
          "like_name": 'like'
        })
      }
      console.log(this.data.result);
    }).catch(e => {
      console.error(e)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.constant_id;
    let cid = options.cid;
    let uid = options.uid;
    let identify_id = options.identify_id;
    console.log(cid, uid, identify_id);
    this.setData({
      constant_id: id
    })
    app.globalData.token = wx.getStorageSync('token');
    console.log(app.globalData.token);
    if (app.globalData.token == null || app.globalData.token == '') {
      app.weappLogin().then(res => {
        wx.setStorageSync('token', res)
        app.globalData.token = res;
        if (cid != undefined && uid != undefined && identify_id != undefined) {
          app.globalData.cid = cid;
          app.globalData.uid = uid;
          app.globalData.identify_id = identify_id;
          let data = {
            cid: cid,
            uid: uid,
            identify_id: identify_id,
            token: app.globalData.token
          }
          app.api.userShare(data);
        }

        this.constantInfo(id);
        this.tagConstants();
      })
    } else {
      if (cid != undefined && uid != undefined && identify_id != undefined) {
        app.globalData.cid = cid;
        app.globalData.uid = uid;
        app.globalData.identify_id = identify_id;
        let data = {
          cid: cid,
          uid: uid,
          identify_id: identify_id,
          token: app.globalData.token
        }
        app.api.userShare(data);
      }

      this.constantInfo(id);
      this.tagConstants();
    }

    this.constant_video = wx.createVideoContext('constantVideo');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    if (this.constant_video != null) {
      this.constant_video.pause();
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let now_page = this.data.page + 1
    this.setData({
      page: now_page
    })
    this.tagConstants(now_page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})