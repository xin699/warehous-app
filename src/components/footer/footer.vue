<template>
 <div class="footer">
     <ul>
         <li @click="goback">
             返回上级
         </li>
         <li>
             BUTTON
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
    }
  }
}
</script>

<style lang="less" scoped>
    .footer{
        margin-top: 10px;
        overflow:hidden;
        ul {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            border: 1px solid black;
            li {
                height: 45px;
                line-height: 45px;
                flex: 1;
            }
            li:nth-child(2) {
                border-left: 1px solid black;
                border-right: 1px solid black;
            }
        }
    }
</style>
