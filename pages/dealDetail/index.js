// pages/dealDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false
  },
  showPopup(){
   wx.showModal({
     title: '联系方式',
     content: '21312323123',
     showCancel: true,
     cancelText: '取消',
     cancelColor: '#000000',
     confirmText: '确定',
     confirmColor: '#3CC51F',
     success: (result) => {
       if(result.confirm){
         
       }
     },
     fail: ()=>{},
     complete: ()=>{}
   });
  },
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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