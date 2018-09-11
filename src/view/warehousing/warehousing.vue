<template>
    <v-template>
        <div class="title" slot="header">
        入库作业
    </div>
    <template01 slot="content"></template01>
    <v-footer slot="footer"></v-footer>
    </v-template>
</template>

<script>
import template from '@/view/template'
import template01 from '@/view/template01'
import footer from '@/components/footer/footer'
export default {
  data () {
    return {

    }
  },
  components: {
    'v-template': template,
    template01,
    'v-footer': footer
  }
}
</script>

<style scoped>
    .title {
        background-color: #26a2ff;
        color: #fff;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
</style>
