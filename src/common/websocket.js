

//心跳包
import $ from "jquery"
// import oaIp from "@/src/apis"
// console.log(oaIp)
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
      ws: 'eeeee'
    }
  },
  methods: {
    websocketFn() {
      if ('WebSocket' in window) {
        var hostname = "tm.yeepiao.com";
        if (process.env.NODE_ENV == "productionTest") {
          hostname = "tm.yeepiao.com";
        } else if (process.env.NODE_ENV == "production") {
          hostname = "m.yeepiao.com";
        }
        if (location.protocol == "https:") {
          this.ws = new WebSocket("wss://" + hostname + "/notify");
        } else {
          this.ws = new WebSocket("ws://" + hostname + "/notify");
        }
        console.log("myws:" + this.ws);
      }
      else {
        eachOf.log('Not support websocket');
      }

      //连接发生错误的回调方法
      this.ws.onerror = (event) => {
        console.log("websocket连接发生错误");
        // console.log(event);
      };

      this.ws.onopen = () => {
        console.log("websockt链接成功")
        setInterval(() => {
          console.log("heart")
          this.ws.send("heart");
        }, 5000)
      }

      //接收到消息的回调方法
      this.ws.onmessage = (event) => {
        let data = JSON.parse(event.data)
        let content = JSON.parse(data.content);
        this.$confirm('excel已为您创建成功, 继续下载吗？', '提示', {
          confirmButtonText: '开始下载',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          // console.log("/billcountday/download?fileName=" + content);
          let downloadUrl = this.oaIp + content.downloadUrl
          downloadFile(downloadUrl);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下载'
          });
        });
      }
      //连接关闭的回调方法
      this.ws.onclose = () => {
        console.log("连接关闭");
      }
    }
  },
  beforeDestroy() {
    //销毁之前，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    console.log('已断开websocket链接')
    // this.websocket.close();
  }
}
export {
  websocket
}