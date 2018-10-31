<template>
 <div class="page">
     <div class="title" slot="header">
        选择企业
    </div>
    <div class="main">
          <mt-loadmore :bottom-method="loadBottom" :top-method="loadTop" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleBottomChange" :auto-fill="autoFill">
            <ul>
              <li v-for="(item, index) in companyList" :key="index" class="nav-item" @click="goCompany(index)">{{ item.companyName }}</li>
            </ul>
          </mt-loadmore>
          <div class="over-loading" v-if="ifLoadingOver">
              <span>{{overtext}}</span>
          </div>
    </div>
    <div class="footer">
     <ul>
         <li @click="goback">
             返回上级
         </li>
         <li @click="backmenu">
             回到主菜单
         </li>
         <li>
             联系我们
         </li>
     </ul>
 </div>
 </div>
</template>

<script>
import header from '@/components/header/header'
import { companyQuery } from '@/api/comapi'
import { Loadmore } from 'mint-ui'
export default {
  name: 'Home',
  components: {
    'v-header': header,
    'v-loadmore': Loadmore
  },
  data () {
    return {
      companyList: [],
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
    goback () {
      this.$router.push({path: '/'})
    },
    backmenu () {
      this.$router.push({path: '/home'})
    },
    getTask (obj) {
      companyQuery(obj).then(res => {
        this.companyList = res.data.data
        this.totalNum = res.data.totals
        this.totalNum <= this.limit ? this.ifLoadingOver = true : this.ifLoadingOver = false
        this.totalNum === 0 ? this.overtext = '数据为空' : this.overtext = '已加载完全部'
      })
    },
    loadTop () {
      setTimeout(() => {
        companyQuery().then(res => {
          if (res.data.data.length > 0) {
            this.currentpageNum = 1
            this.companyList = res.data.data
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
          companyQuery({ pageNum: this.currentpageNum, pageSize: this.limit }).then(res => {
            if (res.data.data.length > 0) {
              this.companyList = this.companyList.concat(res.data.data)
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
      this.$store.commit('SET_AVATAR', this.companyList[obj]['id'])
      this.$router.push('/home')
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
        .footer{
        overflow:hidden;
        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            border: 1px solid #ccc;
            li {
                height: 45px;
                line-height: 45px;
                flex: 1;
            }
            li:nth-child(2) {
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
            }
        }
    }
    }
</style>
