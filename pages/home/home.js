 // pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   page:1,
   show:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        show: app.getShowAuth()
      });
      let cid = options.cid;
      let uid = options.uid;
      let identify_id = options.identify_id;
      console.log(cid,uid,identify_id);
  
      app.globalData.token = wx.getStorageSync('token');
      console.log(app.globalData.token);
    if (app.globalData.token == null || app.globalData.token == ''){
        app.weappLogin().then(res => {
          wx.setStorageSync('token', res)
          app.globalData.token = res;
          if (cid != undefined && uid != undefined && identify_id != undefined) {
            let data = {
              cid: cid,
              uid: uid,
              identify_id: identify_id,
              token: app.globalData.token
            }
            app.api.userShare(data).then(res => {
              //获取列表数据
              this.getShareUsers(1);
            }).catch(e => {
              console.error(e)
            })
          } else {
            this.getShareUsers(1);
          }
        })
      }else{
        if (cid != undefined && uid != undefined && identify_id != undefined) {
          let data = {
            cid: cid,
            uid: uid,
            identify_id: identify_id,
            token: app.globalData.token
          }
          app.api.userShare(data).then(res => {
            //获取列表数据
            this.getShareUsers(1);
          }).catch(e => {
            console.error(e)
          })
        } else {
          this.getShareUsers(1);
        }
      }
        
  },
  //跳转到重点推荐，选择公司
  changeCid:function(event){
    app.globalData.uid = event.currentTarget.dataset.uid;
    app.globalData.cid = event.currentTarget.dataset.cid;
    app.globalData.usid = event.currentTarget.dataset.usid;
    // console.log(event.currentTarget.dataset);
    console.log(app.globalData);

    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  setShow:function(val){
      this.setData({
        show:val
      })
  },
  onClose:function(){
    //关闭弹窗
    app.setShowAuth(0);
    this.setShow(0);
    console.log('close_aut')
  },
  onCancel:function(){
    //取消授权
    // console.log('cancel_auth')

  },
  getUserInfo(res){
    console.log(res.detail.userInfo);
    //确认授权
    if(res.detail.userInfo == undefined){
      //拒绝
      // console.log('拒绝')

    }else{
      //确认
      // console.log('确认')
      let result = res.detail.userInfo
      this.updateUserInfo(result.nickName, result.avatarUrl)

    }
    
  },
  updateUserInfo:function(nickname='',headImgUrl=''){
    let data={
      nickname:nickname,
      headImgUrl:headImgUrl,
      token:app.globalData.token
    }
    app.api.updateUserInfo(data);
  },
  getShareUsers:function(page=1){
      let data = {
        page:page,
        token: app.globalData.token
      }
      app.api.shareUsers(data).then(res=>{
         this.setData({
           list:this.data.list.concat(res.data.data)
         })
        //  if(app.globalData.uid == 0){
        //    app.globalData.uid = this.data.list[0].uid;
        //  }
        //  if(app.globalData.cid == 0){
        //    app.globalData.cid = this.data.list[0].cid;
        //  }
      }).catch(e=>{
        console.error(e)
      })

  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
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
    this.getShareUsers(now_page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})