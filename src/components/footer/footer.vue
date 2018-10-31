<template>
 <div class="footer">
     <ul>
         <li @click="goback">
             退出登录
         </li>
         <li>
             BUTTON
         </li>
         <li @click="scan">
             联系我们
         </li>
     </ul>
 </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {

    }
  },
  methods: {
    goback () {
      Indicator.open('Loading...')
      this.$store.dispatch('LogOut').then(res => {
        Indicator.close()
        this.$router.push('/login')
        localStorage.removeItem('accessToken')
      }).catch(() => {
        Indicator.close()
      })
    },
    scan () {
      this.$router.push('/scan')
    }
  }
}
</script>

<style lang="less" scoped>
    @rem: 37.5rem;
    .footer{
        // margin-top: 10px;
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
</style>
