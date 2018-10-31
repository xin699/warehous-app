<template>
 <div class="page">
     <v-header v-if="!isScan"></v-header>
    <div class="main" v-if="!isScan">
      <div class="login__form">
        <div class="login__row">
          <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8"></path>
          </svg>
          <input type="text" class="login__input name" placeholder="userName" v-model="user.username">
        </div>
        <div class="login__row">
          <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0"></path>
          </svg>
          <input type="password" class="login__input pass" placeholder="Password" v-model="user.password">
        </div>
        <mt-button type="primary" class="login__submit" @click.native.prevent="login">Sign in</mt-button>
        <div class="scan">
          <!-- <span>扫码登录</span> -->
          <img src="../../assets/scan.png" alt="" @click="getScan('param1')">
          <mt-button type="default" size="small" class="reset" @click.native.prevent="reset">重置</mt-button>
        </div>
      </div>
    </div>
    <div v-else>
        <v-scan @childScan="closeScan" :scanParam="scanParam"></v-scan>
    </div>
 </div>
</template>

<script>
import header from '@/components/header/header'
import scan from '@/view/scan'
import { Indicator } from 'mint-ui'
export default {
  name: 'Home',
  components: {
    'v-header': header,
    'v-scan': scan
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      scanParam: '', // 传递扫码具体索引
      scanData: JSON.parse(localStorage.getItem('result')) || {}, // 获取扫码结果
      isScan: false // 扫码控件显示
    }
  },
  computed: {
    param1 () { // 中间件处理监控对象具体属性
      return this.scanData['param1']
    }
  },
  watch: {
    param1 (newValue, oldVlue) { // 监控货品条码获取参数
      if (newValue) {
        const obj = this.scanData['param1']
        localStorage.setItem('accessToken', JSON.stringify(obj.split('+')[0]))
        if (JSON.parse(localStorage.getItem('accessToken'))) {
          if (obj.split('+')[1] && obj.split('+')[2]) {
            localStorage.setItem('taskId', JSON.stringify(obj.split('+')[1]))
            localStorage.setItem('companyId', JSON.stringify(obj.split('+')[2]))
            this.$router.push({path: '/home'})
          } else if (obj.split('+')[1] && !obj.split('+')[2]) {
            localStorage.setItem('taskId', JSON.stringify(obj.split('+')[1]))
            this.$router.push({path: '/company'})
          } else {
            this.$router.push({path: '/'})
          }
        }
      } else {
        return false
      }
    }
  },
  methods: {
    login () {
      Indicator.open('Loading...')
      this.$store.dispatch('LoginByUsername', this.user).then(res => {
        Indicator.close()
        this.$router.push({path: '/'})
      }).catch(() => {
        Indicator.close()
      })
    },
    reset () {
      this.user.username = ''
      this.user.password = ''
    },
    closeScan () {
      this.isScan = false
      this.scanData = JSON.parse(localStorage.getItem('result')) || {}
    },
    getScan (param) {
      this.scanParam = param
      this.isScan = true
    }
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
            .login__form {
              padding: 100/@rem 30/@rem;
              .login__row {
                  height: 45/@rem;
                  border: 1px solid #ccc;
                  background-color: #fff;
                  margin-bottom: 25/@rem;
                svg {
                    display: inline-block;
                    position: relative;
                    width: 24/@rem;
                    height: 24/@rem;
                    overflow: visible;
                    top: 10/@rem;
                    right: 5/@rem;
                    cursor: pointer;
                }
                .login__input {
                  display: inline-block;
                  width: 250/@rem;
                  height: 40/@rem;
                  background: transparent;
                  color: #333;
                  outline: none;
                  border: none;
                }
              }
              .login__submit {
                  width: 100%;
                  height: 45/@rem;
                  display: block;
                }
                .scan {
                  text-align: left;
                  margin-top: 12/@rem;
                  padding-left: 5/@rem;
                }
                .reset {
                  float: right;
                }
            }
        }
    }
</style>
