<template>
 <div>
     <div class="content">
         <div class="table-header" id="header">
            <table>
                <tr>
                    <td class="table-th">货品条码</td>
                    <td colspan="2" class="text-left">{{headList['barCode']}}</td>
                </tr>
                <tr>
                    <td class="table-th">货品名称</td>
                    <td colspan="2" class="text-left">{{headList['materielName']}}</td>
                </tr>
                <tr>
                    <td class="table-th">规格</td>
                    <td colspan="2" class="text-left">{{headList['standard']}}</td>
                </tr>
                <tr>
                    <td class="table-th">数量</td>
                    <td colspan="2" class="text-left">{{headList['amount']}}</td>
                </tr>
                <tr>
                    <td class="table-th">区储位</td>
                    <td colspan="2" class="text-left">{{headList['placeNo']}}</td>
                </tr>
            </table>
            <div class="save-result" v-if="ifSaveBt">
                <mt-button type="primary" size="small" @click="saveResult">保存结果</mt-button>
            </div>
        </div>
         <v-gooods ref="c2" @fromChild="getChildList"></v-gooods>
     </div>
 </div>
</template>

<script>
import goods from './good05'
import { storMakeUpPlain } from '@/api/comapi'
export default {
  data () {
    return {
      headList: {}, // 顶部信息
      ifSaveBt: false // 保存结果按钮是否显示
    }
  },
  components: {
    'v-gooods': goods
  },
  methods: {
    saveResult () { // 保存结果
      storMakeUpPlain({id: this.headList['id'], mode: this.$route.query.mode}).then(res => {
        if (res.data.code === 200) {
          this.ifSaveBt = false
          this.headList = {}
          this.$nextTick(() => {
            this.$refs.c2.getList()
          })
        }
      })
    },
    getChildList (data) { //  获取子元素传递的值
      this.headList = data
      if (data['id']) {
        this.ifSaveBt = true
      }
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
    .table-th {
        width: 86/@rem;
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
