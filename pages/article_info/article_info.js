// pages/article_info/article_info.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:[],
    articlesList:[],
    article_videl:null,
    aid:0,
    page:1,
    like_name:'like-o',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.article_videl = wx.createVideoContext('myvideo');
    let aid = options.aid;
    let cid = options.cid;
    let uid = options.uid;
    let identify_id = options.identify_id;
    this.setData({
      aid: aid
    })
    console.log(cid, uid, identify_id);
    app.globalData.token = wx.getStorageSync('token');
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

        this.articleInfo(aid);
        this.articlesList(1);
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

      this.articleInfo(aid);
      this.articlesList(1);
    }
    
  },

  articleInfo:function(aid){
    var data = {
      aid:aid,
      token: app.globalData.token
    }
    app.api.articleInfo(data).then(res => {
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

  likeClick:function(){
    //调用 点赞接口
      console.log('点赞接口')
      this.praise(this.data.aid);
  },

  //标签推荐文章列表
  articlesList:function(page=1){
    var data = {
      aid:this.data.aid,
      page:page,
      limit:10,
      uid:app.globalData.uid,
      cid:app.globalData.cid,
      token: app.globalData.token
    }
    app.api.tagList(data).then(res => {
      this.setData({
        articlesList: this.data.articlesList.concat(res.data.data)
      })
      console.log(this.data.result);
    }).catch(e => {
      console.error(e)
    })
  },
  //点赞方法
  praise:function(aid){
    var data = {
      aid: aid,
      token:app.globalData.token
    }
    app.api.praise(data).then(res => {
      // this.setData({
      //   result: res.data.data
      // })
      let now_parise_counts = parseInt(this.data.result.praise_counts)
      if (this.data.result.is_praise == 1) {
        this.setData({
          "result.praise_counts": now_parise_counts - 1,
          "result.is_praise": 0,
          "like_name": 'like-o'
        })
      } else {
        this.setData({
          "result.praise_counts": now_parise_counts + 1,
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
    if (this.article_videl != null){
      this.article_videl.pause();
    }
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
    let now_page = this.data.page+1
      this.setData({
        page:now_page
      })
    this.articlesList(now_page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})