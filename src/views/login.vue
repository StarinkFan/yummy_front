<template>
  <div class="container">
    <a href='/'><img src="/static/pic/logo.png" style="width:15%;position:absolute;top:35px;left: 7%;" align=center></a><br>
    <div class="mainbox">
      <el-card class="box-card loginbody">
        <h3 style="float: top;" align="center">登录</h3>
        <el-input id="account" class="loginInput" v-model="email" style="margin-top: 6%;" placeholder="请输入邮箱"></el-input>
        <el-input id="password" type="password" v-model="password" class="loginInput" style="margin-top: 8%;" align="center" placeholder="请输入密码"></el-input><br>
        <el-checkbox id="remember" v-model="remember" style="margin-top: 3%;margin-left: 8%"></el-checkbox>
        <p style="display: inline;">记住密码</p>
        <a href="/findPassword" style="float: right;margin-right: 8%;display: inline;margin-top: 3%">忘记密码？</a>
        <el-button type="primary" id="login" v-on:click="login()" round>登录</el-button>
        <div style="width: 100%;text-align: center;margin-top: 20px">
          <a href="/signup" style="font-size: 16px;color: lightskyblue;">即刻注册</a>
        </div>
      </el-card>


      <!--<div style="text-align: center; color: white;text-align: center;font-size: 20px; margin-top: 2%">-->
        <!--<span style="color: white;text-align: center;font-size: 22px;font-family: 'Microsoft YaHei UI'">Trust,让你的大学生活更美好</span><br>-->
        <!--<p style="color: white;text-align: center;display: block;padding-top: 40px">@怎么码都码不队</p>-->
        <!--<div style="margin-top: 0;" class="bott">-->
          <!--<a>关于我们</a>|<a>联系我们</a>|<a>微博</a>-->
        <!--</div>-->
      <!--</div>-->

    </div>
    <!--<footer-bar style="margin-top: calc(50% - 430px)"></footer-bar>-->
  </div>


</template>

<script>

  import store from '../vuex/store';
  import * as types from '../vuex/types';
  import { mapMutations } from 'vuex';

  export default {
      name: "login",
      mounted() {
        store.commit(types.LOGOUT)
        if(store.getters.isRemember) {
          console.log("wocao");
          this.email =localStorage.email;
          this.password = window.atob(localStorage.password);
          this.remember = true;
        }
      },
      methods: {
        ...mapMutations(['setAuthorization']),
        login: function () {
          let self = this;
          this.$axios.post('/user/login', {email: self.email, password: self.password}).then(
            res => {
              console.log(res.data);
              //store.commit(types.LOGIN, res.data);
              switch (res.data.code){
                case 1:
                  this.setAuthorization("user");
                  this.$message({
                    message: '用户登录成功',
                    type: 'success'
                  });
                  localStorage.uid=res.data.uid;
                  self.$router.replace('/user/restaurantList');
                  break;
                case 2:
                  this.setAuthorization("restaurant");
                  this.$message({
                    message: '餐厅登录成功',
                    type: 'success'
                  });
                  localStorage.uid=res.data.rid;
                  self.$router.replace('/restaurant/productList');
                  break;
                case 3:
                  this.setAuthorization("manager");
                  this.$message({
                    message: '经理登录成功',
                    type: 'success'
                  });
                  console.log(localStorage.Authorization);
                  self.$router.replace('/manager/applyAdmin');
                  break;
                case 0:
                  this.$message({
                    message: "用户名或密码错误",
                    type: "error"
                  });
              }
            }).catch(err => {
              console.log(err)
          });
          console.log(this.remember);
          if(this.remember) {
            store.commit(types.REMEMBER, {email: this.email , password: this.password })
          } else {
            store.commit(types.CANCELREMEMBER)
          }
        }
      },
      data() {
        return {
          email: "",
          password: "",
          remember: false
        }
      },
    }

</script>

<style scoped>
  .container {
    width:100%;
    background: #222;
    background-image:url('/static/pic/loginBackground.jpg');
    background-size: cover;
    background-attachment:fixed;
    background-position: center center;
    background-repeat: no-repeat;
    padding: 0;
    min-height: 725px;
  }

  .mainbox{
    margin-top: 150px;
    height: 330px;
  }

  .loginbody{
    width: 32%;
    height: 360px;
    position: relative;
    margin: auto;
    float: left;
    left: 100px;
  }

  .loginInput{
    width: 84%;
    margin-left: 8%;
  }

  button{
    width:84%;
    height:40px;
    font-size: 18px;
    margin-left: 8%;
    margin-top: 3%;
  }

  /*.bott a{*/
    /*color: lightyellow;*/
  /*}*/

  /*.el-carousel__item{*/
    /*background-size: cover;*/
    /*background-attachment:fixed;*/
    /*background-position: center center;*/
    /*background-repeat: no-repeat;*/
  /*}*/

  /*.el-carousel__item:nth-child(3) {*/
    /*background-image:url('/static/pic/loginBackground1.png');*/
  /*}*/
  /*.el-carousel__item:nth-child(4) {*/
     /*background-image:url('/static/pic/signupBackground.png');*/
   /*}*/

  /*.el-carousel__item:nth-child(5) {*/
    /*background-image:url('/static/pic/library.jpg');*/
  /*}*/




</style>
