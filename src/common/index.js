; (function () {

     var t = {};

     t.setBodyHieght = function () {
          document.body.style.height = document.documentElement.clientHeight + "px";
     }
     t.getElementTop = function (elem) {
          var elemTop = elem.offsetTop;//获得elem元素距相对定位的父元素的top
          elem = elem.offsetParent;//将elem换成起相对定位的父元素
          while (elem != null) {//只要还有相对定位的父元素 
               //获得父元素 距他父元素的top值,累加到结果中
               elemTop += elem.offsetTop;
               //再次将elem换成他相对定位的父元素上;
               elem = elem.offsetParent;
          }
          return elemTop;
     }

     window.onresize = function () {
          t.setBodyHieght();
     }
     window.onload = function () {
          t.setBodyHieght();
          // var inputs = document.querySelectorAll("input")

          // for(var i=0;i<inputs.length;i++){
          //   inputs[i].onfocus = function(e){

          //     setTimeout(()=>{
          //       // document.body.scrollTop = getElementTop(e.target);
          //       // alert(window.innerHeight)
          //       console.dir(getElementTop(e.target));
          //     },300)
          //   }
          // }
     }
})()