<template>
  <div class="whole" id="navi" style="width:100%;">
    <router-link to="/"><img src="/static/pic/logo_yellow.png" id="naviLogo" class="img-responsive logo" alt="Cinque Terre"></router-link>

    <nav class="navbar navbar-inverse wholeNav">
      <div class="container-fluid" style="width: 100%">
        <div class="collapse navbar-collapse" id="myNavbar" style="display: inline-block;font-size: 16px;width: 100%">
          <ul class="nav navbar-nav" id="nav" style="width: 100%">
            <li>
              <router-link to="/user/restaurantList">点餐大厅</router-link>
            </li>
            <li>
              <router-link to="/user/orderList">我的订单</router-link>
            </li>
            <li>
              <router-link to="/user/personalCenter">个人中心</router-link>
            </li>
            <li id="last" style="float: right;min-width: 8%;;margin-right: 4%">
              <router-link to="/signup" v-if="offline">注册</router-link>
              <a id="logout" v-on:click="logout" v-else>退出</a>
            </li>
            <li id="secondLast" style="float: right;min-width: 8%">
              <router-link to="/login" v-if="offline">登录</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import Avatar from "vue-avatar/src/Avatar";
  import store from '../vuex/store'
  import * as types from '../vuex/types'

  export default {
    components: {Avatar},
    inject:['reload'],
    name: 'navi',
    data(){
      return{
        offline:localStorage.getItem("Authorization") !== "user"
      }
    },
    mounted(){
      $("a").click(function(){
        $("a").css("color", "white");
        $(this).css("color", "#ffffa0");
      })
    },
    methods: {
      logout: function () {
        localStorage.removeItem('Authorization');
        this.$router.replace("/login");
      },
      // logoff: function () {
      //   this.$confirm('此操作将永久注销账户, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '注销成功!'
      //     });
      //     localStorage.removeItem('Authorization');
      //     this.$axios.post("/user/logoff",
      //       {"uid":localStorage.uid}
      //     ).then(res => {
      //       let data=res.data;
      //       if(data){
      //         console.log("logout success")
      //       }
      //       this.$router.replace("/login");
      //
      //     }).catch(err => {
      //       console.log(err)
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消注销'
      //     });
      //   });
      // }

    }
  }
</script>



<style scoped>
  .whole{
    padding: 0;
    background-color: darkorange;
    z-index: 2;
  }
  .wholeNav{
    border-color: transparent;
    display: inline-block;
    width: 77%;
    min-width: 80%;
    min-height: 30px;
    margin-top: 5px;
    margin-bottom: 0;
    background-color: darkorange;
  }
</style>

<style>
  #naviLogo{
    max-width: 7%;
    display: inline-block;
    margin-left: 9%;
    margin-top: -53px;
    position: relative;
  }
  #nav li{
    min-width: 10%;
    text-align: center;
    border-top:3px solid transparent;
    border-bottom:3px solid transparent;
  }
  #nav li:hover{
    border-top:3px solid #ffffa0;
    border-bottom:3px solid #ffffa0;
  }
  #nav li:hover a{
    color:#ffffa0;
  }
  #nav li a{
    color: white;
    cursor: pointer;
  }
</style>
