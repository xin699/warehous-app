<template>
 <div class="page">
     <v-header></v-header>
    <div class="main">
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
          <img src="../../assets/scan.png" alt="" @click="scan">
          <mt-button type="default" size="small" class="reset" @click.native.prevent="reset">重置</mt-button>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import header from '@/components/header/header'
import { Indicator } from 'mint-ui'
export default {
  name: 'Home',
  components: {
    'v-header': header
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
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
    scan () {
      alert('scan')
      this.$router.push('/scan')
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
