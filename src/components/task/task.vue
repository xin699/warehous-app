<template>
 <div class="page">
     <div class="title" slot="header">
        任务中心
    </div>
    <div class="main">
          <mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
            <ul>
              <li v-for="(item, index) in taskList" :key="index" class="nav-item" @click="goCompany(index)">{{ item.taskName }}</li>
            </ul>
          </mt-loadmore>
          <div class="over-loading" v-if="ifLoadingOver">
              <span>{{overtext}}</span>
          </div>
    </div>
    <v-footer>
     </v-footer>
 </div>
</template>

<script>
import header from '@/components/header/header'
import footer from '@/components/footer/footer'
import { task } from '@/api/comapi'
import { Loadmore } from 'mint-ui'
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  components: {
    'v-header': header,
    'v-footer': footer,
    'v-loadmore': Loadmore
  },
  computed: {
    ...mapGetters([
      'taskId'
    ])
  },
  data () {
    return {
      taskList: [],
      historylist: [],
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
  methods: {
    getTask (obj) {
      task(obj).then(res => {
        this.taskList = res.data.data
        this.totalNum = res.data.totals
        this.totalNum <= this.limit ? this.ifLoadingOver = true : this.ifLoadingOver = false
        this.totalNum === 0 ? this.overtext = '数据为空' : this.overtext = '已加载完全部'
      })
    },
    loadTop () {
      setTimeout(() => {
        task().then(res => {
          if (res.data.data.length > 0) {
            this.currentpageNum = 1
            this.taskList = res.data.data
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
          task({ pageNum: this.currentpageNum, pageSize: this.limit }).then(res => {
            if (res.data.data.length > 0) {
              this.taskList = this.taskList.concat(res.data.data)
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
    goCompany (obj) {
      this.$store.commit('SET_Task', this.taskList[obj]['id'])
      this.$router.push('/company')
    }
  },
  created () {
    this.getTask({ pageNum: this.currentpageNum, pageSize: this.limit })
  }
}
</script>

<style lang="less" scoped>
    @rem: 37.5rem;
    .page {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #FAFCFD;
        .title {
            background-color: #26a2ff;
            color: #fff;
            font-size: 14px;
            height: 40px;
            line-height: 40px;
        }
        .main{
            overflow:auto;
            -webkit-overflow-scrolling:touch;
            flex:1;
            .nav-item {
                height: 40 / @rem;
                line-height: 40 / @rem;
                box-sizing: border-box;
                border-bottom: 1px solid #ddd;
                text-align: left;
                padding-left: 20 / @rem
            }
            .over-loading {
              margin-top: 10px;
            }
        }
    }
</style>
