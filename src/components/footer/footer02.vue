<template>
 <div class="footer">
     <ul>
         <li @click="goback">
             返回
         </li>
         <li @click="refresh">
             刷新
         </li>
         <li @click="scan">
             联系我们
         </li>
     </ul>
 </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    refresh () {
      window.location.reload()
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
