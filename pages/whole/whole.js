// pages/whole/whole.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'active':0,
    'company_url':null,
    'show_tag_select':false,
    'case_page':1,
    "scenes_page":1,
    'demand_page':1,
    'product_page':1,
    'company_video':null,
    'cases':[],
    'scenes':[],
    'demands':[],
    'products':[],
    'userCard':[],
    'companyInfo':[],
    'filterTags':[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取初使用场景列表
    this.getScenes();
    this.getTags();
    // this.getProducts();
    // this.getDemands();
    // this.getCases();
    // this.getCompanyUrl();
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
    this.pauseVideo();
  },

  pauseVideo:function()
  {
      if(this.company_video != null){
        this.company_video.pause();
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
      if(this.data.active == 0){
         this.setData({
           scenes_page: this.data.scenes_page + 1
         });
         this.getScenes(this.data.scenes_page);
      }else if(this.data.active ==1){
        this.setData({
          case_page: this.data.case_page + 1
        });
        this.getCases(this.data.case_page);
      }else if(this.data.active ==2){
        this.setData({
          demand_page: this.data.demand_page + 1
        });
        this.getDemands(this.data.demand_page);
      }else if (this.data.active == 3){
        this.setData({
          product_page: this.data.product_page + 1
        });
        this.getProducts(this.data.product_page);
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 标签更改事件
   */
  onChange(event) {
    this.setData({
      active: event.detail.index
    })
    this.pauseVideo();
    if(this.data.active == 1 && this.data.cases.length == 0){
      this.getCases();
    }else if (this.data.active == 2 && this.data.demands.length == 0) {
      this.getDemands();
    }else if (this.data.active == 3 && this.data.products.length == 0) {
      this.getProducts();
    }else if(this.data.active == 4 && this.data.companyInfo.length ==0){
      this.company_video = wx.createVideoContext('myvideo');
      this.getCompanyInfo();
    }else if(this.data.active == 5 && this.data.userCard.length == 0){
      this.getUserCard();
    } else if (this.data.active == 4){
      this.company_video.play();
    }
  },
  onClose:function(){
    this.setData({ show_tag_select: false })
  },
  tagSelect:function(){
    this.setData({ show_tag_select: true })
  },
  tagClick:function(event){
    let tag_id = event.currentTarget.dataset.tag_id;
   let tag_name = event.currentTarget.dataset.tag_name;
    this.setData({ show_tag_select: false })
    wx.navigateTo({
      url: '/pages/tag_articles/tag_articles?tag_id='+tag_id+'&tag_name='+tag_name
    })
  },
  /** 
   * 获取场景数据
  */
  getScenes: function(page=1){
    var data = {
      'page': page,
      'limit': 8,
      'type': 1,
      'uid':app.globalData.uid,
      'cid': app.globalData.cid,
      'token':app.globalData.token

    };
    app.api.articles(data).then(res => {
      this.setData({
        scenes: this.data.scenes.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
  },

  /** 
   * 获取案例
  */
  getCases: function (page = 1) {
    var data = {
      'page': page,
      'limit': 10,
      'type': 2,
      'uid': app.globalData.uid,
      'cid':app.globalData.cid,
      'token': app.globalData.token
    };
    app.api.articles(data).then(res => {
      this.setData({
        cases: this.data.cases.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
  },

  /** 
   * 获取需求
  */
  getDemands: function (page = 1) {
    var data = {
      'page': page,
      'limit': 10,
      'type': 3,
      'uid': app.globalData.uid,
      'cid': app.globalData.cid,
      'token': app.globalData.token
    };
    app.api.articles(data).then(res => {
      this.setData({
        demands: this.data.demands.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
  },
  /** 
   * 获取产品说明
  */
  getProducts: function (page = 1) {
    var data = {
      'page': page,
      'limit': 10,
      'type': 4,
      'uid': app.globalData.uid,
      'cid': app.globalData.cid,
      'token': app.globalData.token
    };
    app.api.articles(data).then(res => {
      this.setData({
        products: this.data.products.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
  },
/**
 *  获取我的名片数据
 */
  getUserCard:function(){
    let data={
      'uid': app.globalData.uid,
      'token': app.globalData.token,
      'cid':app.globalData.cid
    }
    app.api.userCard(data).then(res => {
      this.setData({
        userCard: res.data.data
      })
    }).catch(e => {
      console.error(e)
    })
  },
  /**
   * 获取公司介绍
   */
  getCompanyInfo:function(){
    let data={
      token:app.globalData.token,
      cid:app.globalData.cid
    }
    app.api.companyInfo(data).then(res=>{
      this.setData({
        companyInfo: res.data.data
      })
    }).catch(e => {
      console.error(e)
    })
  },
  /**
  * 获取所有标签
  */
  getTags: function () {
    let data = {
      token: app.globalData.token,
      cid: app.globalData.cid
    }
    app.api.tags(data).then(res => {
      this.setData({
        filterTags: res.data.data
      })
    }).catch(e => {
      console.error(e)
    })
  }
})