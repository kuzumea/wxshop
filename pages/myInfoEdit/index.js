const { request, showModal, showToast } = require("../../utils/request");
const apis = require("../../apis/my/my")
// pages/myInfoEdit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo1: {  }
  },
  onChangeName (e) {
    var obj = "userinfo1.name"
    this.setData({
      [obj]: e.detail
    })
    // console.log(this.data.userinfo1);
  },

  onChangeqq (e) {
    var obj = "userinfo1.contact_qq"
    this.setData({
      [obj]: e.detail
    })

  },
  onChangewx (e) {
    var obj = "userinfo1.contact_wx"
    this.setData({
      [obj]: e.detail
    })

  },
  back () {
    wx.navigateBack({
      delta: 1
    });
  },
  saveUserInfo () {
    let that = this
    // console.log(this.data.userinfo1);
    request(apis.saveInfo, this.data.userinfo1, 'GET').then(res => {
      if(res.code===200) {
        showToast('修改成功!')
        console.log(that.data.userinfo1);
        // request(apis.userSearch,this.data.userinfo1.openid,'GET').then(res=>{
        //   if(res.code === 200) {
        //     console.log(res);
        //     // this.setData({
        //     //   userinfo1:res.data.data
        //     // })
        //     wx.setStorage({
        //       key: 'userInfo',
        //       data: res.data.data,
        //     });
        //     wx.navigateBack({
        //       delta: 2
        //     });
        //   }
        //   else {

        //   }
        // })
      }else {
        showToast('修改失败！')
      }
    })
    

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userInfo',
      success: (result) => {
        this.setData({
          userinfo1: result.data
        })
      },
      fail: () => { },
      complete: () => { }
    });
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