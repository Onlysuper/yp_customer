

//心跳包

//无刷新下载文件
function downloadFile(url) {
  if (typeof (downloadFile.iframe) == "undefined") {
    var iframe = document.createElement("iframe");
    downloadFile.iframe = iframe;
    document.body.appendChild(downloadFile.iframe);
  }
  downloadFile.iframe.src = url;
  downloadFile.iframe.style.display = "none";
}
const websocket = {
  data() {
    return {
      ws: ''
    }
  },
  methods: {

    websocketFn() {
      if ('WebSocket' in window) {
        var hostname = "tm.yeepiao.com/";
        this.ws = new WebSocket("ws://" + hostname + "/notify");
        // websocket = new WebSocket("ws://tm.yeepiao.com/notify");
      }
      else {
        alert('Not support websocket');
      }

      //连接发生错误的回调方法
      this.ws.onerror = (event) => {
        console.log("websocket连接发生错误");
        console.log(event);
      };

      this.ws.onopen = () => {
        console.log("链接成功")
        setInterval(() => {
          this.ws.send("heart");
        }, 5000)
      }

      //接收到消息的回调方法
      this.ws.onmessage = (event) => {
        console.log("websocket收到信息:" + event.data);
        var data = event.data;
        var json = $.parseJSON(data);
        var type = json.notifyType;
        var content = json.data;
        console.log('我来啦')
        // if ("EXCEL_CREATE_SUCCESS" == type) {
        //   //excel创建成功
        //   layer.alert('excel创建成功', {
        //     offset: 'rt',
        //     btn: ['下载']
        //   }, function (index) {
        //     console.log("download success");
        //     downloadFile("/billcountday/download?fileName=" + content);
        //     layer.close(index);
        //   });
        // } else {
        //   console.log("websocket处理消息type" + "-" + content);
        // }
      }

      //连接关闭的回调方法
      this.ws.onclose = () => {
        console.log("连接关闭");
      }

      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = () => {
        this.websocket.close();
      }


    }
  }
}
export {
  websocket
}