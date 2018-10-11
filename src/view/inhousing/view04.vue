<template>
 <div>
     <div class="content" v-if="!isScan">
         <div class="table-header">
            <table>
                <tr>
                    <td>托盘标签</td>
                    <td class="borderN paddingr-0 text-left">
                        <input type="text" placeholder="请扫描" class="scan-input" v-model="scanData['param1']" @blur="getHeadList">
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
                    <td>批号</td>
                    <td colspan="2" class="text-left">{{headList['grouporder']}}</td>
                </tr>
                <tr>
                    <td>数量</td>
                    <td colspan="2" class="text-left">{{headList['tuoamount']}}</td>
                </tr>
                <tr>
                    <td>托盘标签</td>
                    <td class="borderN paddingr-0 text-left">
                        <input type="text" placeholder="请扫描" class="scan-input" disabled v-model="scanData['param2']">
                    </td>
                    <td class="borderN" @click="getScan('param2')">
                        <img src="../../assets/scan.png" alt="" class="scan-img">
                    </td>
                </tr>
            </table>
            <div class="save-result" v-if="ifSaveBt">
                <mt-button type="primary" size="small" @click="saveResult">保存结果</mt-button>
            </div>
        </div>
     </div>
 </div>
</template>

<script>
import { StorMaterielInPlain } from '@/api/comapi'
export default {
  data () {
    return {
      id: JSON.parse(localStorage.getItem('workingId'))['id'] // 作业id
    }
  },

  methods: {
    saveResult () { // 保存结果
      const obj = Object.assign({}, this.scanData, {id: this.id, mode: this.$route.query.mode})
      StorMaterielInPlain(obj).then(res => {
        if (res.data.code === 200) {
          this.getGoods()
          this.scanData = {}
          this.headList = {}
          localStorage.removeItem('result')
          this.ifSaveBt = false
        }
      })
    }
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
