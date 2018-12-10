import fetch from './fetch'
const API_DOMAIN = 'https://apimt.xiaoshouhui.cn/'
// const API_DOMAIN = 'http://api.mtan.com/'

/*
 * @param  {String} api 接口地址
 * @param  {Objece} params 接口参数参数
 */
function fetchApi (api, params,method="GET") {
  return fetch(API_DOMAIN, api, params,method)
}

// 首页推荐列表
function getRecommedsList (params) {
  // return fetchApi('weAppRecommends', params).then(res => res)
  return fetchApi('weAppRecommends', params).then(res => res)
}
//文章详情
function articleInfo(params) {
  return fetchApi('weAppArticleInfo', params).then(res => res)
}
//全部文章列表
function articles(params){
  return fetchApi('weAppArticles', params).then(res => res)
}
//点赞接口
function praise(params){
  return fetchApi('weAppPraises', params, 'POST').then(res => res)
}
//文章详情推荐文章列表
function tagList(params) {
  return fetchApi('weAppTagList', params).then(res => res)
}

function weappLogin(params){
  return fetchApi('weAppLogin',params,'POST').then(res=>res)
}

function userShare(params){
  return fetchApi('weAppUserShare', params, 'POST').then(res => res)
}
function shareUsers(params){
  return fetchApi('weAppShareUsers',params,'GET').then(res => res)
}
function userCard(params){
  return fetchApi('weAppUserInfo', params, 'GET').then(res => res)
}
function updateUserInfo(params){
  return fetchApi('weAppUpdateUserInfo', params, 'POST').then(res => res);
}
function companyInfo(params){
  return fetchApi('weAppCompanyInfo',params).then(res=>res);
}

function tags(params) {
  return fetchApi('weAppTags', params).then(res => res);
}

function tagArticles(params) {
  return fetchApi('weAppTagArticles', params).then(res => res);
}

function questionInfo(params){
  return fetchApi('weAppQuestionInfo',params).then(res=>res);
}
function photoList(params)
{
  return fetchApi('weAppPhotoList',params).then(res=>res);
}

function photoInfo(params){
  return fetchApi('weAppPhotoInfo',params).then(res=>res);
}

function constants(params) {
  return fetchApi('weAppConstants', params).then(res => res);
}

function constantInfo(params) {
  return fetchApi('weAppConstantInfo', params).then(res => res);
}

function tagConstants(params) {
  return fetchApi('weAppTagConstants', params).then(res => res);
}

//点赞接口
function constantPraise(params) {
  return fetchApi('weAppConstantPraise', params, 'POST').then(res => res)
}

module.exports = {
  getRecommedsList,
  articleInfo,
  articles,
  praise,
  tagList,
  weappLogin,
  userShare,
  shareUsers,
  userCard,
  updateUserInfo,
  companyInfo,
  tags,
  tagArticles,
  questionInfo,
  photoList,
  photoInfo,
  constants,
  constantInfo,
  tagConstants,
  constantPraise
}
