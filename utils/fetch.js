import { Promise } from './bluebird'
/**
 * 验证返回的的code码问题
 * @param {*} resolve
 * @param {*} res 返回的data
 */
const checkCode = (resolve, res) => {
  console.log(+res.statusCode);
  if (+res.statusCode === 200) {
    resolve(res)
  } else if (+res.statusCode === 400) {
    wx.showToast({
      title: res.data.message,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  } else if (+res.statusCode === 500) {
    wx.showToast({
      title: res.data.message,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  } else if(+res.statusCode === 401) {
    wx.removeStorageSync('token');
    wx.showToast({
      title: '授权登录已失效,重新登录中',
      icon: 'none',
      duration: 2000,
      mask: true
    })
    wx.redirectTo({
      url: '/pages/home/home'
    })
  }else{
    resolve(res);
  }
}

/**
 * 网络请求API接口
 * @param  {String} api    api 根地址
 * @param  {String} path   请求路径
 * @param  {Object} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
module.exports = function (api, path, params,method='GET') {
  wx.showLoading({
    title: '加载中'
  })
  console.log(`${api}${path}`)
  params.is_sign = '1';
  console.log(params)
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}${path}`, 
      data: Object.assign({}, params),
      method:method,
      header: { 
        'Content-Type': 'application/json' ,
        'Accept':'application/vnd.mtan.w1.3.0+json'
        },
      success: function (res) {
        console.log(res)
        checkCode(resolve, res)
        // resolve(res)
        wx.hideLoading()
      },
      fail: function (err) {
        wx.hideLoading()
        reject(err)
      }
    })
  })
}
