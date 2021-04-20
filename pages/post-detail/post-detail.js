// pages/post-detail/post-detail.js
import{postList} from "../../data/data.js"
 
const app = getApp()
console.log(app.test)
Page({

  /**
   * 页面的初始数据
   */
  data: {
      postData:{},
      collected:false,
      isPlaying:false,
      _pid:null,
      _postCollected:{},
      _mgr: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    console.log(options)
    this.data._pid = options.pid
    const postsCollected = wx.getStorageSync('posts_collected')
    this.data._postCollected = postsCollected
    const postData = postList[options.pid]
    const collected = postsCollected[this.data._pid]
    console.log(collected)
    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    console.log(postData)
    this.setData({
      postData,
      collected,
      isPlaying:this.currentMusicIsPlaying()
    })
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicStop)
  },

  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid){
       
        return true
      }
      return false
    },
    
   

  onMusicStart(event){

      const mgr = this.data._mgr
       
      const music = postList[this.data._pid].music
      mgr.src = music.url
      mgr.title = music.title
      mgr.coverImgUrl = music.coverImg

      app.gIsPlayingMusic = true
      app.gIsPlayingPostId = this.data._pid
      this.setData({
        isPlaying:true
      })
    //const mgr = wx.getBackgroundAudioManager()
    
     
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicStop)
  }, 

  onMusicStop(event){
    const mgr = this.data._mgr
    mgr.pause()
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
  },
  async onShare(event){
    const result = await wx.showActionSheet({
      itemList:['分享到QQ','分享到微信','分享到']
    })
  },
  async onCollect(event){
    //if it is not collected
    const result = await wx.showModal({
      title:'是否收藏文字'
    })
    if(result.confirm){
     const postsCollected = this.data._postCollected
     
    postsCollected[this.data._pid] = !this.data.collected
     
    //this.data.collected = true
    this.setData({
      collected : !this.data.collected
    })
    wx.setStorageSync('posts_collected', postsCollected) 
    }
    
    // wx.showModal({
    //   title: this.data.collected?'收藏成功':'取消收藏',
    //   duration : 3000,
    //   cancelText: 'A',
    //   confirmText: 'B'
    // })
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