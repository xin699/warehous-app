<template>
 <div>
     <div class="content" v-if="!isScan">
         <div class="table-header">
            <table>
                <tr>
                    <td>货品条码</td>
                    <td class="borderN paddingr-0 text-left">
                        <input type="text" placeholder="请扫描" v-model="scanData['param1']" disabled class="scan-input">
                    </td>
                    <td class="borderN" @click="getScan('param1')">
                        <img src="../assets/scan.png" alt="" class="scan-img">
                    </td>
                </tr>
                <tr>
                    <td>托盘标签</td>
                    <td class="borderN paddingr-0 text-left">
                        <input type="text" placeholder="请扫描" class="scan-input" disabled v-model="scanData['param2']">
                    </td>
                    <td class="borderN" @click="getScan('param2')">
                        <img src="../assets/scan.png" alt="" class="scan-img">
                    </td>
                </tr>
                <tr>
                    <td>货品名称</td>
                    <td colspan="2" class="text-left">{{headList['materielName']}}</td>
                </tr>
                <tr>
                    <td>规格</td>
                    <td colspan="2" class="text-left">{{headList['standard']}}</td>
                </tr>
                <tr>
                    <td>批号</td>
                    <td colspan="2" class="text-left">{{headList['grouporder']}}</td>
                </tr>
                <tr>
                    <td>实收数量</td>
                    <td>
                        <input type="text" placeholder="请填实收数量" v-model="param3" class="amout-input"/>
                    </td>
                    <td>余/{{headList['amount'] - param3 || 0}}</td>
                </tr>
                <tr>
                    <td>建议数量</td>
                    <td colspan="2" class="text-left">{{headList['tuoamount']}}</td>
                </tr>
            </table>
            <div class="save-result" v-if="ifSaveBt">
                <mt-button type="primary" size="small" @click="saveResult">保存结果</mt-button>
            </div>
        </div>
        <v-gooods :goodsList='goodsList'></v-gooods>
     </div>
    <div v-else>
        <v-scan @childScan="closeScan" :scanParam="scanParam"></v-scan>
    </div>
 </div>
</template>

<script>
import goods from '@/view/goods'
import scan from '@/view/scan'
import { storMaterielInfoForIn, storMaterielInOutD, StorMaterielInPlain } from '@/api/comapi'
export default {
  data () {
    return {
      barCode: '',
      mode: this.$router.history.current['query']['mode'], // 当前mode
      isScan: false, // 扫码控件显示
      headerParams: JSON.parse(localStorage.getItem('workingId')), // 作业id
      headList: {}, // 顶部信息
      goodsList: [], // 底部货品信息
      scanParam: '', // 传递扫码具体索引
      scanData: JSON.parse(localStorage.getItem('result')) || {}, // 获取扫码结果
      param3: 0, // 第三个提交参数
      ifSaveBt: false // 保存结果按钮是否显示
    }
  },
  components: {
    'v-gooods': goods,
    'v-scan': scan
  },
  computed: {
    param1 () { // 中间件处理监控对象具体属性
      return this.scanData['param1']
    }
  },
  watch: {
    param1 (newValue, oldVlue) { // 监控货品条码获取参数
      //   this.param1 = newValue
      if (newValue) {
        this.getHeadList()
        this.ifSaveBt = true
      } else {
        return false
      }
    }
  },
  methods: {
    getScan (param) { // 扫码传参
      this.scanParam = param
      this.isScan = true
    },
    clearSave () { // 子组件扫码取消操作
      this.scanData = JSON.parse(localStorage.getItem('result')) || {}
    },
    closeScan () {
      this.isScan = false
      this.clearSave()
    },
    saveResult () { // 保存结果
      const obj = Object.assign(this.scanData, this.headerParams, {param3: this.param3})
      StorMaterielInPlain(obj).then(res => {
        if (res.data.code === 200) {
          this.getGoods()
          this.scanData = {}
          this.param3 = 0
          this.headList = {}
          localStorage.removeItem('result')
          this.ifSaveBt = false
        }
      })
    },
    getHeadList () { // 扫码货品条码后获取顶部信息
      const obj = Object.assign({param1: this.scanData['param1']}, this.headerParams)
      storMaterielInfoForIn(obj).then(res => {
        if (res.data.code === 200) {
          this.headList = res.data.data
        }
      })
    },
    getGoods () { // 获取底部货品
      storMaterielInOutD(this.headerParams).then(res => {
        if (res.data.code === 200) {
          this.goodsList = res.data.data
        }
      })
    }
  },
  created () {
    this.getGoods()
  },
  beforeDestroy () { // 组件销毁时清除操作
    localStorage.removeItem('result') // 离开组件时清楚扫码所得信息
    this.isScan = false
    this.scanData = {}
    this.param3 = 0
  }
}
</script>

<style scoped lang="less">
    @rem: 37.5rem;
    .title {
        background-color: #26a2ff;
        color: #fff;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
    .table-header {
        padding: 20/@rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
    }
    .borderN {
        border: none;
    }
    .scan-input {
        border: none;
        background-color: #fff;
        color: #2c3e50;
    }
    .amout-input {
        border: 1px solid #CCC
    }
    table {
        width: 100%;
        border-collapse: collapse;
        padding: 0 10/@rem;
    }
    table th {
        font-weight: 600;
    }
    .table-header table td {
        vertical-align: middle;
        padding: 8/@rem 10/@rem;
        border: 1px solid #DDD;
    }
    .scan-img {
        width: 24/@rem;
    }
    .paddingr-0 {
        padding-right: 0;
    }
    .text-left {
        text-align: left;
    }
    .table-head table {
        margin: 10/@rem 0 5/@rem 0;
    }
    .table-head table th {
        font-weight: bold;
    }
    .table-body table {
        table-layout: fixed;
    }
    .table-body table td {
        padding: 5/@rem;
    }
    .save-result {
        margin-top: 10/@rem;
        text-align: right;
    }
</style>
