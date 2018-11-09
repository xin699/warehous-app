<template>
 <div class="content">
     <div class="list">
         <div class="table-head">
            <table>
                <thead>
                    <tr>
                        <th>货品编码</th>
                        <th>货品名称</th>
                        <th>计划数量</th>
                    </tr>
                </thead>
            </table>
            </div>
            <div class="table-body" id="goods" ref="good">
                <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
                <table>
                    <tbody>
                    <tr v-for="(item, index) in goodsList" :key="index">
                        <td>{{item['barCode']}}</td>
                        <td>{{item['materielName']}}</td>
                        <td>{{item['amount']}}</td>
                    </tr>
                    </tbody>
                </table>
                </mt-loadmore>
                <div class="over-loading" v-if="ifLoadingOver">
                  <span>{{overtext}}</span>
                </div>
            </div>
     </div>
 </div>
</template>

<script>
import { storMaterielInOutD } from '@/api/comapi'
import { Loadmore } from 'mint-ui'

export default {
  data () {
    return {
      headerParams: Object.assign({}, {id: JSON.parse(localStorage.getItem('workingId')) || '', mode: JSON.parse(localStorage.getItem('mode')) || ''}), // 作业id， mode号
      goodsList: [],
      allLoaded: false,
      autoFill: true, // 若为真，loadmore 会自动检测并撑满其容器
      currentpageNum: 1, // 当前页数
      limit: 20, // 每页条数
      totalNum: null, // 总数
      nowStatus: '',
      bottomPullText: '上拉加载更多...',
      bottomDropText: '释放更新...',
      ifLoadingOver: false,
      overtext: '已加载完全部'
    }
  },
  components: {
    'v-loadmore': Loadmore
  },
  mounted () {
    this.getconH()
  },
  methods: {
    getList () {
      const param = Object.assign({}, this.headerParams, { pageNum: this.currentpageNum, pageSize: this.limit })
      storMaterielInOutD(param).then(res => {
        this.goodsList = res.data.data
        this.totalNum = res.data.totals
      })
    },
    getconH () {
      const elementList = document.querySelectorAll('#header')[0].scrollHeight
      const content = document.querySelectorAll('.content')[0].scrollHeight
      this.$refs.good.style.height = ((content - elementList - 50) / 37.5) + 'rem'
      console.log(content)
    },
    // loadTop () {
    //   const param = Object.assign({}, this.headerParams, { pageNum: this.currentpageNum, pageSize: this.limit })
    //   setTimeout(() => {
    //     storMaterielInOutD(param).then(res => {
    //       if (res.data.data.length > 0) {
    //         this.currentpageNum = 1
    //         this.goodsList = res.data.data
    //       }
    //     })
    //     this.$refs.loadmore.onTopLoaded()
    //   }, 1500)
    // },
    loadBottom () {
      setTimeout(() => {
        if (this.totalNum - this.currentpageNum * this.limit > 0) {
          this.ifLoadingOver = false
          this.currentpageNum++
          const param = Object.assign({}, this.headerParams, { pageNum: this.currentpageNum, pageSize: this.limit })
          storMaterielInOutD(param).then(res => {
            if (res.data.data.length > 0) {
              this.goodsList = this.goodsList.concat(res.data.data)
            } else {
              this.overtext = '数据为空'
            }
          })
        } else {
          this.ifLoadingOver = true
          this.allLoaded = true
        }
        this.$refs.loadmore.onBottomLoaded()
      }, 1500)
    },
    handleBottomChange (status) {
      this.nowStatus = status
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang="less">
    @rem: 37.5rem;
    table {
        width: 100%;
        border-collapse: collapse;
        padding: 0 10px;
    }
    table th {
        font-weight: 600;
    }
    .table-header table td {
        vertical-align: middle;
        padding: 10px 10px;
        border: 1px solid #ccc;
    }
    .scan-img {
        width: 24px;
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
    .table-body {
      // height: 285/@rem;
      overflow: auto;
      box-sizing:border-box;
    -webkit-overflow-scrolling: touch;
    }
    .table-body table {
        table-layout: fixed;
    }
    .table-body table td {
        padding: 5/@rem;
        word-wrap: break-word
    }
</style>
