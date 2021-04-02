module.exports = {
  request (url,params,method) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    return new Promise((resolve,rej)=>{
      var reqTask = wx.request({
        url: url,
        data: params,
        header: {'content-type':'application/json'},
        method: method,
        dataType: 'json',
        responseType: 'text',
        success: (res)=>{
          wx.hideLoading()
          resolve(res)
        },
        fail: (err)=>{
          wx.hideLoading()
          rej(err)
        },
        complete: ()=>{}
      });
      
    })
  },

  showModal (title){
    return new Promise((resolve,rej)=>{
      wx.showModal({
        title: title,
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            resolve()
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    })
  },

  showToast(title) {
    return new Promise((resolve,rej)=>{
      wx.showToast({
        title: title,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    })
  },
  // 异步封装upload
  // async uploadFile(url,filePath,formdata) {
  //   let res = await new Promise((resolv,rejec)=>{
  //     wx.uploadFile({
  //       url: url,
  //       filePath: filePath,
  //       name: 'file',
  //       formData: formdata,
  //       success: (res)=>{
  //         resolv(res)
  //       },
  //       fail: ()=>{},
  //       complete: ()=>{}
  //     });
  //   })
  //   return res
  // }
}