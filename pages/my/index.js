// pages/my/index.js
var api = require('../../apis/my/my')
var {request,showModal,showToast} = require('../../utils/request')
function getUserInfo(){
  console.log(1);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo1:{},
    isLoged:false,
    userInfo:{
      total_deal:0,
      total_pub:0
    }
  },

  login() {
    let that = this
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx7b33016892c1be05&secret=01917229859a5da8581f8adbdd480d74&js_code=${res.code}&grant_type=authorization_code`
          request(url,{},'GET').then(res=>{
            // console.log(res);
            let params1 = {openid:res.data.openid}
            wx.setStorage({
              key: 'openid',
              data: res.data.openid
            })
            request(api.userLog,params1,'GET').then(res1=>{
              // console.log(res1);
              if(res1.data.code === 201) {  
                showModal('没有注册，是否注册？').then(res=>{
                  wx.getStorage({
                    key: 'userInfo',
                    success: (result)=>{
                      // return result
                      that.setData({
                        userInfo1:result.data
                      })
                      console.log(that.data.userInfo1);
                      var params = {
                        name:that.data.userInfo1.nickName,
                        openid:params1.openid,
                        avatar_url:that.data.userInfo1.avatarUrl
                      }
                      request(api.userSign,params,'GET').then(
                        res=>{
    
                         if(res.data.code === 200) {
                           console.log(2222);
                          showToast('注册成功')
                          request(api.userSearch,params1,'GET').then(res=>{
                            console.log(res);
                            that.setData({
                              userInfo:res.data.data,
                              isLoged:true
                            })
                            wx.setStorage({
                              key: 'userInfo1',
                              data: res.data.data,
                            });
                          })
                          
                         }else {
                          showToast('注册失败')
    
                         }
                       }
                     )
                    }
                  });
                  
               })
              }else {
                showToast('登录成功')
                request(api.userSearch,params1,'GET').then(res=>{
                  console.log(res);
                  that.setData({
                    userInfo:res.data.data,
                    isLoged:true

                  })
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data.data,
                  });
                })
              }
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getUserInfo({
      withCredentials: 'false',
      lang: 'zh_CN',
      timeout:10000,
      success: (result)=>{
        console.log(result);
        wx.setStorage({
          key: 'userInfo',
          data: result.userInfo,
        });
      },
      fail: ()=>{},
      complete: ()=>{}
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