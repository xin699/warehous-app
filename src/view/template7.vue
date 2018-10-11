<template>
 <div>
     <div class="list">
         <div class="table-head">
            <table>
                <thead>
                    <tr>
                        <th>单据号</th>
                        <th>操作类型</th>
                        <th>操作状态</th>
                    </tr>
                </thead>
            </table>
            </div>
            <div class="table-body">
            <mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
                <table>
                    <tbody>
                    <tr v-for="(item, index) in workList" :key="index">
                        <td>{{item.billNo}}</td>
                        <td>{{item.baseName}}</td>
                        <td><span class="start" ref="dom" @click="startWork({mode: mode, id: item.id})">{{item.doStatus}}</span></td>
                    </tr>
                    </tbody>
                </table>
                <div class="over-loading" v-if="ifLoadingOver">
                  <span>{{overtext}}</span>
                </div>
            </mt-loadmore>
            </div>
     </div>
     <div class="precess">
         <div v-for="(item, index) in precessList" :key="index" :class="{precess_item: true, started_item: !item.doStatus&&isStart}" @click="go01(item.name, index)">
             {{ item.name }}
        </div>
     </div>
     <router-view/>
 </div>
</template>

<script>
import footer from '@/components/footer/footer'
import { storPlansList, nowPlainStatus, storPlansProgress, storCheckPlain } from '@/api/comapi'
import { Loadmore, MessageBox } from 'mint-ui'
import {
  setToken
} from '@/utils/auth'
export default {
  data () {
    return {
      workList: [],
      precessList: [],
      allLoaded: false,
      autoFill: true, // 若为真，loadmore 会自动检测并撑满其容器
      currentpageNum: 1, // 当前页数
      limit: 10, // 每页条数
      totalNum: null, // 总数
      nowStatus: '',
      bottomPullText: '上拉加载更多...',
      bottomDropText: '释放更新...',
      ifLoadingOver: false,
      overtext: '已加载完全部',
      isStart: false,
      startBt: '开始',
      mode: this.$router.history.current['query']['mode'],
      workingId: JSON.parse(localStorage.getItem('workingId')) // 作业id
    }
  },
  components: {
    'v-footer': footer,
    'v-loadmore': Loadmore
  },
  methods: {
    startWork (obj) {
      nowPlainStatus(obj).then(res => {
        localStorage.setItem('workingId', JSON.stringify(obj.id))
        setToken(res.data.data)
        localStorage.setItem('accessToken', JSON.stringify(res.data.data))
        this.rework()
      })
    },
    getStorPlansProgress (obj) { // 获取方块步骤
      storPlansProgress(obj).then(res => {
        this.precessList = res.data.data
      })
    },
    getStorPlansList () {
      storPlansList({mode: this.$route.query.mode}).then(res => {
        this.workList = res.data.data
        this.totalNum = res.data.totals
        this.getStorPlansProgress({mode: this.mode})
        this.totalNum <= this.limit ? this.ifLoadingOver = true : this.ifLoadingOver = false
        this.totalNum === 0 ? this.overtext = '数据为空' : this.overtext = '已加载完全部'
        this.isStart = !!this.workList.filter(item => item.doStatus === '作业中').length
        const doStatus = this.workList.filter(item => item.doStatus === '作业中')[0] || {id: ''}
        localStorage.setItem('workingId', JSON.stringify(doStatus['id']))
      })
    },
    loadTop () {
      setTimeout(() => {
        storPlansList({mode: this.$route.query.mode}).then(res => {
          if (res.data.data.length > 0) {
            this.currentpageNum = 1
            this.workList = res.data.data
          }
        })
        this.$refs.loadmore.onTopLoaded()
      }, 1500)
    },
    loadBottom () {
      setTimeout(() => {
        if (this.totalNum - this.currentpageNum * this.limit > 0) {
          this.ifLoadingOver = false
          this.currentpageNum++
          storPlansList({ mode: this.$route.query.mode, pageNum: this.currentpageNum, pageSize: this.limit }).then(res => {
            if (res.data.data.length > 0) {
              this.workList = this.workList.concat(res.data.data)
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
    },
    rework () {
      this.getStorPlansList({ pageNum: this.currentpageNum, pageSize: this.limit })
    },
    go01 (wd, index) {
      if (this.isStart) {
        if (index + 1 !== 2) {
          this.$router.push({path: '/warehousing/warehousing06', query: {wd: wd, mode: index + 1}})
        } else {
          MessageBox.alert('是否将当前作业单设置为已经完成？').then(action => {
            storCheckPlain({mode: index + 1, id: this.workingId}).then(res => {
              MessageBox('提示', res.data.msg)
            })
          })
          return false
        }
      } else {
        return false
      }
    }
  },
  created () {
    this.getStorPlansList({ pageNum: this.currentpageNum, pageSize: this.limit })
    // this.getStorPlansProgress({mode: this.mode})
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
    .list {
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }
    .table-head {
        border-bottom: 1px solid #ccc;
    }
    .table-body {
        overflow: auto;
        height: 230/@rem;
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
    .start {
       color: #409eff;
       text-decoration: underline;
       padding: 0 10px;
    }
    .started {
        color: #f56c6c;
        text-decoration: underline
    }
    .precess {
        padding: 0 40/@rem 40/@rem 40/@rem;
        height: 225/@rem;
        overflow: auto;
        box-sizing: border-box;
    }
    .precess_item {
        width: 90/@rem;
        height: 85/@rem;
        line-height: 80/@rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        float: left;
        margin: 16/@rem 28/@rem;
        box-sizing: border-box;
    }
    .started_item {
        background-color: #ffcdcd;
    }
    .over-loading {
        margin-top: 10px;
        color: #ccc;
    }
</style>
