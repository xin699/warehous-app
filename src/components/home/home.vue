<template>
 <div class="page">
     <v-header></v-header>
    <div class="main">
        <ul class="main-nav">
            <router-link class="nav-item" tag="li" :to="{ path: 'warehousing', query: { wd: '入库作业', mode: 1 }}">入库作业</router-link>
            <router-link class="nav-item" tag="li" :to="{ path: 'warehousing', query: { wd: '出库作业', mode: 2 }}">出库作业</router-link>
            <router-link class="nav-item" tag="li" :to="{ path: 'warehousing', query: { wd: '补货作业', mode: 3 }}">补货作业</router-link>
            <router-link class="nav-item" tag="li" :to="{ path: 'warehousing', query: { wd: '移库作业', mode: 4 }}">移库作业</router-link>
            <router-link class="nav-item" tag="li" :to="{ path: 'warehousing', query: { wd: '流通加工作业', mode: 5 }}">流通加工作业</router-link>
            <router-link class="nav-item" tag="li" :to="{ path: 'warehousing', query: { wd: '盘点作业', mode: 6 }}">盘点作业</router-link>
            <router-link class="nav-item" tag="li" :to="{ path: 'warehousing', query: { wd: '运输作业', mode: 7 }}">运输作业</router-link>
        </ul>
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
export default {
  name: 'Home',
  components: {
    'v-header': header
  },
  data () {
    return {

    }
  },
  methods: {
    goback () {
      this.$router.push({path: '/company'})
    }
  },
  created () {
    localStorage.removeItem('workingId')
    localStorage.removeItem('result')
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
        .main{
            overflow:auto;
            -webkit-overflow-scrolling:touch;
            flex:1;
            .nav-item {
                float: left;
                width: 125 / @rem;
                height: 100 / @rem;
                line-height: 100 / @rem;
                box-sizing: border-box;
                border-bottom: 1px solid #ddd;
            }
            .nav-item {
                border-right: 1px solid #ddd;
                &:nth-child(3n+0) {
                    border-right: none;
                }
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
