<template>
    <v-template>
        <div class="title" slot="header">
            {{$route.query.wd}}
        </div>
        <template01 v-if="mode===1" slot="content"></template01>
        <template02 v-if="mode===2" slot="content"></template02>
        <template03 v-if="mode===3" slot="content"></template03>
        <template04 v-if="mode===4" slot="content"></template04>
        <template05 v-if="mode===5" slot="content"></template05>
        <template06 v-if="mode===6" slot="content"></template06>
        <template07 v-if="mode===7" slot="content"></template07>
        <!-- <template01 slot="content" :workList="workList" :isStart="isStart" @reload="getStorPlansList"></template01> -->
        <v-footer slot="footer02"></v-footer>
    </v-template>
</template>

<script>
import template from '@/view/template'
import template01 from '@/view/template1'
import template02 from '@/view/template2'
import template03 from '@/view/template3'
import template04 from '@/view/template4'
import template05 from '@/view/template5'
import template06 from '@/view/template6'
import template07 from '@/view/template7'
import footer from '@/components/footer/footer02'
export default {
  data () {
    return {
      mode: parseInt(this.$router.history.current['query']['mode']),
      mode1: parseInt(this.$router.history.current['query']['mode']) === 1,
      model2: false
    }
  },
  components: {
    'v-template': template,
    template01,
    template02,
    template03,
    template04,
    template05,
    template06,
    template07,
    'v-footer': footer
  },
  created () {
    localStorage.setItem('thatmode', JSON.stringify(this.$router.history.current['query']['mode']))
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
