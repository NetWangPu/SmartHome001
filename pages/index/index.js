// pages/index/index.js

var mqtt = require("../../utils/mqtt.min.js"); //根据自己存放的路径修改

const app = getApp();
const { username } = app.globalData; //mqtt连接的用户名
const { password } = app.globalData; //mqtt连接的密码
const { reconnectPeriod } = app.globalData; //接收到的信息
const { connectTimeout } = app.globalData; //重连时间
const { host } = app.globalData; //连接地址

Page({
  /**
   * 页面的初始数据
   */
  data: {
    R: 0,
    temperature: "获取中..",
    weight: "获取中..",
    mode: "获取中..",
    frequency: "获取中..",
    amount: "获取中..",
    disinfection: "获取中..",
  },

  publish() {
    var pubMsg = "#" + this.data.R + "#";
    var pubTopic = "testtopic/QBXOISO3MD3/FFDKR342";
    if (app.globalData.client) {
      app.globalData.client.publish(pubTopic, pubMsg);
      console.log("发送消息" + pubMsg);
      return;
    }
  },

  sliderRchange(e) {
    console.log(e.detail.value);
    if (e.detail.value == this.data.R) return;
    this.setData({
      R: e.detail.value,
    });
    this.publish();
    //输出弹窗提示设置成功
    wx.showToast({
      title: "设置成功",
      icon: "success",
      duration: 1000,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      console.log("开始链接");
      const clientId = new Date().getTime(); //mqtt的连接ID
      app.globalData.client = mqtt.connect(`wxs://${host}/mqtt`, {
        username,
        password,
        reconnectPeriod,
        connectTimeout,
        clientId,
      });
    } catch (error) {
      console.log("mqtt.connect error", error);
    }
    if (app.globalData.client) {
      console.log("mqttconnect ok");
      app.globalData.client.subscribe("testtopic/QBXOISO3MD3/FFDKR342");
    }
    app.globalData.client.on("message", (topic, payload) => {
      console.log(`收到消息 - Topic: ${topic}，Payload: ${payload}`);
      //尝试解析json 出错则不更新 打印错误
      try {
        var data = JSON.parse(payload);
        this.setData({
          temperature: data.temperature + "℃",
          weight: data.weight + "g",
          mode: data.mode == 1 ? "休眠" : "活动",
          frequency: data.frequency + "次/天",
          amount: data.amount + "g",
          disinfection: data.disinfection == 1 ? "开启" : "关闭",
        });
      } catch (error) {
        console.log("json解析错误");
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
