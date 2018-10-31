<template>
    <v-template>
        <div class="title" slot="header">
            {{$route.query.wd}}
        </div>
        <view01 slot="content" ref="c1"></view01>
        <v-footer slot="footer03"></v-footer>
    </v-template>
</template>

<script>
import template from '@/view/template'
import view01 from './view01'
import scan from '@/view/scan'
import footer from '@/components/footer/footer03'
export default {
  data () {
    return {

    }
  },
  components: {
    'v-template': template,
    view01,
    'v-footer': footer,
    'v-scan': scan
  },
  beforeRouteLeave (to, from, next) {
    this.$nextTick(() => {
      this.$refs.c1._data['isScan'] = false
    })
    next()
  },
  created () {
    localStorage.setItem('mode', JSON.stringify(this.$router.history.current['query']['mode']))
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
    .amout-input {
        border: 1px solid #CCC
    }
</style>
