<template>
 <div class="page">
     <v-header></v-header>
    <div class="main">
        <table style="width: 100%">
            <tr>
                <td @click="warehouseing">入库作业</td>
                <td>出库作业</td>
                <td>补货作业</td>
            </tr>
            <tr>
                <td>移库作业</td>
                <td>流通加工作业</td>
                <td>盘点作业</td>
            </tr>
            <tr>
                <td>移库作业</td>
            </tr>
        </table>
    </div>
     <v-footer>
     </v-footer>
 </div>
</template>

<script>
import header from '@/components/header/header'
import footer from '@/components/footer/footer'
export default {
  name: 'Home',
  components: {
    'v-header': header,
    'v-footer': footer
  },
  data () {
    return {

    }
  },
  methods: {
    warehouseing () {
      this.$router.push({ path: 'warehousing' })
    }
  }
}
</script>

<style lang="less" scoped>
    .page {
        height: 100%;
        display: flex;
        flex-direction: column;
        table {
            border-collapse: collapse;
            table-layout: fixed;
            padding: 0 10px;
        }
        table, td, th {
            border: 1px solid black;
            width: 124px;
            height: 130px;
            vertical-align: middle;
        }
        .main{
            overflow:auto;
            -webkit-overflow-scrolling:touch;
            flex:1;
        }
    }
</style>
