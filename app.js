// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    client: "21312312312fdsfd",//mqtt连接对象
    host: "broker.emqx.io:8084",//连接的服务器域名地址
    username: "",//连接的用户名
    password: "",//连接的密码
    subTopic: "mqttx_defc709a001/001/smarthome",//订阅的Topic 
    pubTopic: "mqttx_defc709a001/001/smarthome",//发布信息的Topic
    pubMsg: "Hello World",//发布的信息
    receivedMsg: "",//收到的信息
    currMsg: "",//当前信息
    mqttStatus: 0,//判断mqtt的连接状态
    reconnectPeriod: 1000, // 1000毫秒，设置为 0 禁用自动重连，两次重新连接之间的间隔时间
    connectTimeout: 30 * 1000, // 30秒，连接超时时间
  }
})
