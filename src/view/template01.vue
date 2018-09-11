<template>
 <div>
     <div class="list">
         <table>
             <tr>
                 <th>单据号</th>
                 <th>操作类型</th>
                 <th>操作状态</th>
             </tr>
             <tr>
                 <td>336010</td>
                 <td>入库</td>
                 <td><span>开始</span></td>
             </tr>
         </table>
     </div>
     <div class="precess">
         <div class="precess-item">
             入库理货
        </div>
        <div class="precess-item">
             入库理货
        </div>
        <div class="precess-item">
             入库理货
        </div>
        <div class="precess-item">
             入库理货
        </div>
     </div>
 </div>
</template>

<script>
import footer from '@/components/footer/footer'
export default {
  data () {
    return {

    }
  },
  components: {
    'v-footer': footer
  }
}
</script>

<style scoped>
    .title {
        background-color: #26a2ff;
        color: #fff;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
    .list {
        margin-top: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
        min-height: 200px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        padding: 0 10px;
    }
    table th {
        font-weight: 600;
    }
    table, td, th {
        vertical-align: middle;
        padding: 5px;
    }
    .precess {
        margin-top: 10px;
        padding: 20px 40px;
    }
    .precess-item {
        width: 80px;
        height: 80px;
        line-height: 80px;
        border-radius: 5px;
        border: 1px solid #ccc;
        float: left;
        margin: 20px 33px;
        box-sizing: border-box;
    }
</style>
