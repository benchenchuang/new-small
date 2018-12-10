//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    list: [],
    page: 1,
    tag_id:null,
    show_tag_select: false,
    filterTags:[],
    tag_name:'标签筛选'
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.getTagArticles(this.data.page)
  },

  onLoad: function(option) {
    //获取第一页数据
    this.setData({
      tag_id:option.tag_id,
      tag_name:option.tag_name
    });
    this.getTagArticles(1);
    this.getTags();
    // console.log(this.data)
  },

  getTagArticles: function(page) {
    var data = {
      page: page,
      tag_id:this.data.tag_id,
      cid:app.globalData.cid,
      limit: 8,
      token: app.globalData.token
    }
    app.api.tagArticles(data).then(res => {
      this.setData({
        list: this.data.list.concat(res.data.data)
      })
    }).catch(e => {
      console.error(e)
    })
  },
  searchClick:function(){
      this.setData({
        show_tag_select:true
      });
  },
  onClose: function () {
    this.setData({ show_tag_select: false })
  },
  tagClick: function (event) {
    let tag_id = event.currentTarget.dataset.tag_id;
    let tag_name = event.currentTarget.dataset.tag_name;
    this.setData({
      list:[],
      page:1,
      tag_id:tag_id,
      tag_name:tag_name
    })
    this.getTagArticles(1);
    this.setData({
      show_tag_select: false
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