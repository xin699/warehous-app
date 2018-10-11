<template>
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
    backmenu () {
      this.$router.push('/')
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
