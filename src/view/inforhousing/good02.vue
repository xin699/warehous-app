<template>
 <div>
     <div class="list">
         <div class="table-head">
            <table>
                <thead>
                    <tr>
                        <th>托盘标签</th>
                        <th>货品名称</th>
                    </tr>
                </thead>
            </table>
            </div>
            <div class="table-body" id="goods" ref="good">
                <mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
                <table>
                    <tbody>
                    <tr v-for="(item, index) in goodsList" :key="index">
                        <td>{{item['boxNo']}}</td>
                        <td>{{item['materielName']}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="over-loading" v-if="ifLoadingOver">
                  <span>{{overtext}}</span>
                </div>
                </mt-loadmore>
            </div>
     </div>
 </div>
</template>

<script>
import { storMakeUpD } from '@/api/comapi'
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
    const elementList = document.querySelectorAll('#header')[0].scrollHeight
    const content = document.querySelectorAll('.content')[0].scrollHeight
    this.$refs.good.style.height = ((content - elementList - 80) / 37.5) + 'rem'
  },
  methods: {
    getList () {
      console.log(this.headerParams)
      const param = Object.assign({}, this.headerParams, { pageNum: this.currentpageNum, pageSize: this.limit })
      storMakeUpD(param).then(res => {
        this.goodsList = res.data.data
        this.totalNum = res.data.totals
      })
    },
    loadTop () {
      setTimeout(() => {
        storMakeUpD(this.headerParams).then(res => {
          if (res.data.data.length > 0) {
            this.currentpageNum = 1
            this.goodsList = res.data.data
            this.ifLoadingOver = false
            this.allLoaded = false
          }
        })
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    loadBottom () {
      const param = Object.assign(this.headerParams, { pageNum: this.currentpageNum, pageSize: this.limit })
      setTimeout(() => {
        if (this.totalNum - this.currentpageNum * this.limit > 0) {
          this.ifLoadingOver = false
          this.currentpageNum++
          storMakeUpD(param).then(res => {
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
        width: 50%;
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
        width: 50%;
        font-weight: bold;
    }
    .table-body {
      overflow: auto;
    }
    .table-body table {
        table-layout: fixed;
    }
    .table-body table td {
        padding: 5/@rem;
        word-wrap: break-word;
    }
</style>
