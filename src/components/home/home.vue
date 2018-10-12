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
     <v-footer>
     </v-footer>
 </div>
</template>

<script>
import header from '@/components/header/header'
import footer02 from '@/components/footer/footer02'
export default {
  name: 'Home',
  components: {
    'v-header': header,
    'v-footer': footer02
  },
  data () {
    return {

    }
  },
  created () {
    localStorage.removeItem('workingId')
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
    }
</style>
