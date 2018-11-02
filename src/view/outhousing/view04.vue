<template>
 <div>
     <div class="content" id="header" v-if="!isScan">
         <div class="table-header">
            <table>
                <tr>
                    <td>托盘标签</td>
                    <td class="borderN paddingr-0 text-left">
                        <input type="text" placeholder="请扫描" class="scan-input amout-input" v-model.lazy="scanData['param1']" @blur="getHeadList">
                    </td>
                    <td class="borderN" @click="getScan('param1')">
                        <img src="../../assets/scan.png" alt="" class="scan-img">
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
                    <td>数量</td>
                    <td colspan="2" class="text-left">{{headList['amount']}}</td>
                </tr>
                <tr>
                    <td>区储位</td>
                    <td class="borderN paddingr-0 text-left">
                        <input type="text" placeholder="请扫描" class="scan-input amout-input" v-model.lazy="scanData['param2']">
                    </td>
                    <td class="borderN" @click="getScan('param2')">
                        <img src="../../assets/scan.png" alt="" class="scan-img">
                    </td>
                </tr>
            </table>
            <div class="save-result" v-if="ifSaveBt">
                <mt-button type="primary" size="small" @click="saveResult">确认搬运</mt-button>
            </div>
        </div>
         <v-gooods ref="c2"></v-gooods>
     </div>
    <div v-else>
        <v-scan @childScan="closeScan" :scanParam="scanParam"></v-scan>
    </div>
 </div>
</template>

<script>
import goods from './good04'
import scan from '@/view/scan'
import { storMaterielInfoForOut, storMaterielOutPlain } from '@/api/comapi'
var params = Object.assign({}, {id: JSON.parse(localStorage.getItem('workingId')) || ''})
export default {
  data () {
    return {
      barCode: '',
      isScan: false, // 扫码控件显示
      headList: {}, // 顶部信息
      scanParam: '', // 传递扫码具体索引
      scanData: JSON.parse(localStorage.getItem('result')) || {}, // 获取扫码结果
      ifSaveBt: false, // 保存结果按钮是否显示
      listId: '' // 扫码返回id
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
        this.$nextTick(() => {
          this.$refs.c2.getconH()
        })
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
      const obj = Object.assign({mode: this.$route.query.mode, id: this.listId}, this.scanData)
      storMaterielOutPlain(obj).then(res => {
        if (res.data.code === 200) {
          this.$nextTick(() => {
            this.$refs.c2.getList()
          })
          this.scanData = {}
          this.headList = {}
          localStorage.removeItem('result')
          this.ifSaveBt = false
        }
      })
    },
    getHeadList () { // 扫码货品条码后获取顶部信息
      const obj = Object.assign({mode: this.$route.query.mode}, {param1: this.scanData['param1']}, params)
      storMaterielInfoForOut(obj).then(res => {
        if (res.data.code === 200) {
          this.headList = res.data.data
          this.listId = res.data.data['id']
        }
      })
    }
  },
  beforeDestroy () { // 组件销毁时清除操作
    localStorage.removeItem('result') // 离开组件时清楚扫码所得信息
    this.isScan = false
    this.scanData = {}
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
