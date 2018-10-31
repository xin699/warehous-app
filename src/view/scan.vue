<template>
<div>
<div class="mui-content">
<div class="scan">
<div id="bcid">
<div class="content"></div>
<p class="tip">...载入中...</p>
</div>
<footer>
<!-- <button @click="startScan" v-show="isShow">点击扫描</button> -->
<button @click="cancelScan">取消</button>
</footer>
</div>
</div>
</div>
</template>

<script type='text/ecmascript-6'>
// import store from '../store'
let scan = null
// 点手机虚拟返回键
document.addEventListener('plusready', function () {
// 注册返回按键事件
  plus.key.addEventListener('backbutton', function () { // eslint-disable-line no-undef
    // 事件处理
    scan.cancel()// 关闭扫描
    scan.close()// 关闭条码识别控件
    window.history.back()
  }, false)
})
export default{
  data () {
    return {
      codeUrl: '',
      result: JSON.parse(localStorage.getItem('result')) || {}
    }
  },
  props: ['scanParam'],
  mounted () {
    this.startScan()// 进入页面就调取扫一扫
  },
  created () {
    this.startRecognize()
  },
  // watch: {
  //   codeUrl: function (val, oldVal) {
  //     this.cancelScan()
  //     console.log('chnage')
  //   }
  // },
  // beforeDestroy () {
  //   console.log('beforeDestroy')
  //   this.cancelScan()
  // },
  methods: {
    // 创建扫描控件
    startRecognize () {
      let that = this
      if (!window.plus) return
      // 创建条码扫描识别控件
      scan = new plus.barcode.Barcode('bcid', [plus.barcode.QR, plus.barcode.CODE128], {frameColor: '#00FF00', scanbarColor: '#00FF00'}) // eslint-disable-line no-undef
      // scan = new plus.barcode.Barcode('bcid')
      // 条码识别成功
      scan.onmarked = onmarked
      function onmarked (type, result, file) {
        switch (type) {
          case plus.barcode.QR: // eslint-disable-line no-undef
            type = 'QR'
            break
          case plus.barcode.EAN13: // eslint-disable-line no-undef
            type = 'EAN13'
            break
          case plus.barcode.EAN8: // eslint-disable-line no-undef
            type = 'EAN8'
            break
          default:
            type = '其它' + type
            break
        }
        result = result.replace(/\n/g, '')
        that.codeUrl = result// 扫描后返回值
        that.result[that.scanParam] = result
        scan.cancel()// 关闭扫描
        scan.close()// 关闭条码识别控件
        localStorage.setItem('result', JSON.stringify(that.result))
        that.cancelScan()
      }
    },
    // 开始扫描
    startScan () {
      if (!window.plus) return
      this.startRecognize()// 创建控件
      scan.start()
    },
    cancelScan () {
      this.$emit('childScan')
      scan.cancel()// 关闭扫描
      scan.close()// 关闭条码识别控件
    }
  },
  beforeDestroy () {
    this.cancelScan()
  }
}
</script>
<style scoped>
.mui-content{
padding: 44px 0 60px 0;/*px*/
box-sizing: border-box;
margin-top: 60px;/*px*/
}
.scan {
height: 100%;
}
.scan #bcid {
width: 100%;
position: absolute;
left: 0;
right: 0;
top: 50px;/*px*/
bottom:3rem;
text-align: center;
color: #fff;
background: #fff;
}
.scan footer {
position: absolute;
left: 50%;
transform: translate(-50%);
bottom: 62px;
width: 100%;
height: 1rem;
/*line-height: 2rem;*/
z-index: 2;
display: flex;
justify-content: center;
}
.scan footer button{
width: 30%;
font-size: 24px;/*px*/
}
.clickBtn,.cancelBtn{
margin-top:20px;/*px*/
width: 150px;/*px*/
height: 60px;/*px*/
text-align: center;;
}
.cancelBtn{
margin-left: 20px;/*px*/
}
</style>
