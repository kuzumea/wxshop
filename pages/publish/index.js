const {request, showToast} = require("../../utils/request")
const apis = require("../../apis/pub/pub")
// pages/publish/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList:[],
    fileList2:[],
    columns:['生活用品', '二手书籍', '电子产品', '跑腿订单', '化妆护肤','代课','其他'],
    index:0,
    comodity:{
      title:'',
      number:0,
      prize_origin:0,
      prize_now:0,
      content:'23',
      cid:'生活用品'
    },
    isUpload:false,
    openid:''
  },
  onChangeNum(e){
    var obj = "comodity.number"
    this.setData({
      [obj]:e.detail
    })
    
  },

  onChangePrizeO(e){
    var obj = "comodity.prize_origin"
    this.setData({
      [obj]:e.detail
    })
    
  },
  onChangePrizeN(e){
    var obj = "comodity.prize_now"
    this.setData({
      [obj]:e.detail
    })
    
  },
  onChangeTitle(e){
    var obj = "comodity.title"
    this.setData({
      [obj]:e.detail
    })
    
  },
  afterRead(e) {
    console.log(e.detail);
    this.data.fileList.push({url:e.detail.file.url})
    console.log(this.data.fileList);

    this.setData({
      fileList:this.data.fileList
    })
  },
  afterRead1(e) {
    // console.log(e.detail);
    this.data.fileList2.push({url:e.detail.file.url})
    // this.data.fileList.push({url:e.detail.file.url})
    // console.log(this.data.fileList2);

    this.setData({
      fileList2:this.data.fileList2
    })

    // wx.uploadFile({
    //   url: apis.upload,
    //   filePath: e.detail.file.url,
    //   name: 'file',
    //   header:{'content-type':'multipart/form-data'},
    //   formData: {swoper_url:'true',openid:this.data.openid},
    //   success: (result)=>{
    //     console.log(this.data.fileList[0].url);
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
  },
  onchangeContent(e){
    var obj = "comodity.content"

    this.setData({
      [obj]:e.detail.value
    })
  },
  bindPickerChange(e){
    var obj = "comodity.cid"

    this.setData({
      [obj]:this.data.columns[e.detail.value],
      index:e.detail.value
    })
  },
  upload() {
    if(this.data.openid === '') {
      return showToast('请先登录!')
    }
    let flagArray = []
     Object.keys(this.data.comodity).forEach(v=>{
     if(this.data.comodity[v] === 0 ||this.data.comodity[v] === '') {
      flagArray.push(false)
     }
    })

    // console.log(this.data.fileList);
    // console.log(this.data.fileList2);
    if(this.data.fileList.length === 0 || this.data.fileList2.length === 0) {
      flagArray.push(false)
      // console.log(1);
    }

    var obj = "comodity.openid"
    this.setData({
      [obj]:this.data.openid
    })
    if(flagArray.every(v=>v===true) === true) {
        wx.uploadFile({
          url: apis.upload,
          filePath: this.data.fileList[0].url,
          name: 'file',
          header:{'content-type':'multipart/form-data'},
          formData: this.data.comodity,
          success: (result)=>{
            showToast('上传成功！')
          },
          fail: ()=>{},
          complete: ()=>{}
        });
        this.data.fileList2.map(v=>{
          wx.uploadFile({
            url: apis.upload,
            filePath: v.url,
            name: 'file',
            header:{'content-type':'multipart/form-data'},
            formData: {swoper_url:'true',openid:this.data.openid},
            success: (result)=>{
              // console.log(this.data.fileList[0].url);
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        })
    }else{
      showToast('请填写完成！')
    }
    
  },
  reset() {
    // console.log(1);
    this.setData({
      fileList:[],
      fileList2:[],
      comodity:{}
    })
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
    wx.getStorage({
      key: 'openid',
      success: (result)=>{
        console.log(result);
        this.setData({
          openid:result.data
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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