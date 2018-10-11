<template>
 <div class="page">
     <div class="header">
         <slot name="header"></slot>
     </div>
     <div class="content">
         <slot name="content"></slot>
     </div>
     <div class="footer">
         <slot name="footer"></slot>
     </div>
 </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
    .page {
        height: 100%;
        display: flex;
        flex-direction: column;
        .content{
            overflow:auto;
            -webkit-overflow-scrolling:touch;
            flex:1;
        }
    }
</style>
