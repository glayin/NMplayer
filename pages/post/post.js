// pages/post/post.js

import{postList} from "../../data/data.js"
 
//console.log(postList)
Page({

  /**
   * 页面的初始数据
   */
  data: {
   res:{
     text:"123"
   }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
     
    // wx.setStorageSync('flag', true)
    // wx.setStorageSync('flag', false)
    // wx.setStorageSync('flag1', 1)
    //wx.clearStorageSync()
    //wx.removeStorageSync('flag')
   // wx.clearStorageSync()
   // const flag = wx.getStorageSync('flag1')
    //console.log(flag)
    console.log("onload")
    wx.setStorageSync('flag', 2)
    const flag =await wx.getStorage({
      key : 'flag',
      // success(data){
      //   console.log(data.data)
      // }
    })
    // flag.then((value)=>{
    //   console.log(value)
    // })
    console.log(flag)

    this.setData({
       postList
    })
  },

  onGoToDetail(event){
    console.log(event)
    const pid = event.detail.pid | event.currentTarget.dataset.postId
    wx.navigateTo({
      url: '/pages/post-detail/post-detail?pid=' + pid
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onhide")
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