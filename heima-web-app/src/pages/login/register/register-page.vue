<template>
<!--  <div class="register-container">-->
<!--    <h2>账号注册</h2>-->
<!--    <input type="text" v-model="username" placeholder="账号" />-->
<!--    <input type="password" v-model="password" placeholder="密码" />-->
<!--    <input type="password" v-model="confirmPassword" placeholder="确认密码" />-->
<!--    <div class="agreement">-->
<!--      <input type="checkbox" v-model="agreed" />-->
<!--      <span>我同意并阅读了“<a href="#">用户协议</a>”和“<a href="#">隐私政策</a>”</span>-->
<!--    </div>-->
<!--    <button :disabled="!canRegister" @click="register">注册</button>-->
<!--  </div>-->
  <div class="login-wapper">
    <TopBar text="注册"/>
<!--    <image class="img" src="/static/images/login/login2.png"/>-->
    <div class="content-wrapper">
      <div class="title">用户注册</div>
      <div class="bg-wapper">
        <div class="input-wapper">
          <input v-model="params.name"
                 autocomplete="off"
                 type="text"
                 placeholder="昵称"
                 class="input"
          />
        </div>
        <div class="input-wapper">
          <input v-model="params.phone"
                 autocomplete="off"
                 type="text"
                 placeholder="手机号"
                 class="input"
          />
          <text class="getcode" @click="sendCode">{{
              cdSeconds > 0 ? `${cdSeconds}s` : "获取验证码"
            }}</text>
        </div>
        <div class="input-wapper">
          <input v-model="params.password"
                 autocomplete="off"
                 type="password"
                 placeholder="密码"
                 class="input"
          />
        </div>
        <div class="input-wapper">
          <input v-model="confirmPassword"
                 autocomplete="off"
                 type="password"
                 placeholder="确认密码"
                 class="input"
          />
        </div>
        <div class="input-wapper">
          <input v-model="params.code"
                 autocomplete="off"
                 type="text"
                 placeholder="验证码"
                 class="input"
          />
        </div>
        <text class="button" @click="register"> 注册 </text>
        <div class="agreement">
          <!--        TODO 添加checkbox-->
          <!--        <input class="agreement-checkbox" v-model="agreed"/>-->
          <!--        <text class="concat">我已阅读并同意 </text>-->
          <text class="concat">隐私条款</text>
        </div>
      </div>
      <div class="empty"></div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/compoents/bars/common_top_bar.vue";
import Api from "@/apis/login/api";

const modal = weex.requireModule('modal')
export default {
  components: {TopBar},
  data() {
    return {
      params: {
        name: '',
        phone: '',
        password: '',
        code: '',
      },
      timer: null,
      cdSeconds: 0,
      cooldown: false,
      confirmPassword: '',
      agreed: false,
    };
  },
  created() {
    Api.setVue(this);
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    canRegister() {
      if (this.params.phone == '' || this.params.name == '' ||
            this.params.password == '' || this.params.code == '') {
        modal.toast({ message:'信息不能为空',duration:3})
        return false;
      } else if (this.params.password !== this.confirmPassword) {
        modal.toast({ message: '两次输入的密码不同', duration:3})
        return false;
      } else if (!this.agreed){
        // modal.toast({ message: '请同意用户协议', duration:3 })
        // return false;
        // TODO 在修改完checkbox的bug后改为正常判断逻辑
        return true
      } else {
        return true;
      }
    },
    register() {
      // if (!this.canRegister) return;
      // alert(`账号：${this.username} 注册成功！`);
      if (!this.canRegister()) {
        return;
      }
      Api.register(this.params).then(response => {
        if (response.code == 200) {
          modal.toast({ message: '注册成功', duration: 3 })
          this.$router.back()
        } else {
          modal.toast({ message: response.errorMessage, duration: 3 })
        }
      }).catch(error => {
        modal.toast({ message: error.message, duration: 3 })
      })
    },
    doTimer() {
      console.log(`timer ${this.cdSeconds}s`)
      if (this.cdSeconds > 0) {
        this.cdSeconds--;
      } else {
        clearInterval(this.timer);
        this.timer = null;
        console.log('time expired');
      }
    },
    sendCode() {
      if (this.params.phone == '') {
        modal.toast({ message: '请输入手机号', duration: 3 })
        return;
      }
      if (this.cdSeconds > 0) {
        return;
      }
      this.cdSeconds = 60
      this.timer = setInterval(this.doTimer, 1000)
      Api.sendVerifyCode({ phone: this.params.phone }).then(response => {
        if (response.code == 200) {
          modal.toast({ message: '验证码已发送', duration: 3 })
        } else {
          modal.toast({ message: response.errorMessage, duration: 3 })
        }
      }).catch(error => {
        console.log(`发送验证码失败：${error}`)
        modal.toast({ message: error.message, duration: 3 })
      })
    }
  },
};
</script>

<style lang="less" scoped>
@import '../../../styles/common';

.content-wrapper {
  margin-top: 100px;
}
.getcode{
  color: @placeholder-color;
  font-size: 20px;
  border-bottom-width: 1px;
  border-bottom-color: @placeholder-color;
  border-top-width: 1px;
  border-top-color: @placeholder-color;
  border-left-width: 1px;
  border-left-color: @placeholder-color;
  border-right-width: 1px;
  border-right-color: @placeholder-color;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
}
.title{
  color: #666666;
  font-size: 36px;
  font-weight: bold;
  padding-left: 30px;
}
.login-wapper {
  flex: 1;
  width: 750px;
  flex-direction: column;
  background-color: #ffffff;
}
.bg-wapper{
  margin-top: 35px;
  margin-bottom: 35px;
  width: 750px;
  justify-content: center;
  align-items: center;
}
.empty{
  flex: 1;
  background-color: #ffffff;
}
.icon{
  color: @icon-color;
  font-size: 32px;
}
.input-wapper {
  flex-direction: row;
  width: 700px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  padding: 15px 0px;
  align-items: center;
  margin: 15px 0px;
}
.more{
  width: 720px;
  margin-top: 35px;
  flex-direction: row;
  align-items: stretch;
  margin-left: 25px;
}
.go-register{
  font-size: 24px;
  color: #666666;
  margin-right: 35px;
}
.go-home{
  font-size: 24px;
  color: @placeholder-color;
  text-decoration: underline;
}
.input{
  border: none;
  flex: 1;
  line-height: 30px;
  font-size: 28px;
  color: @title-color;
  background-color: transparent;
  placeholder-color:@placeholder-color;
}
.input :active,.input :hover{
  background-color: transparent;
}
.button{
  margin-top:60px;
  background-color: #6db4fb;
  width: 690px;
  height: 70px;
  border-radius: 50px;
  color: @bg-white;
  font-size: 32px;
  text-align: center;
  line-height: 70px;
}
.img{
  width: 750px;
  height: 390px;
  margin-top: -2px;
}
.other{
  flex-direction: row;
  margin-top: 120px;
}
.omg{
  width: 88px;
  height: 88px;
  margin: 10px;
}
.agreement {
  display: flex; /* 头像和信息水平排列 */
  flex-direction: row;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  margin-top: 20px;
}
.agreement-checkbox{
  margin: 10px;
}
.concat{
  font-size: 24px;
  color: @placeholder-color;
}
</style>
