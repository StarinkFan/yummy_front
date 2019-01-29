<template>
  <div class="whole" id="navi" style="width:100%;">
    <a href="/"><img src="/static/pic/logo.png" id="naviLogo" class="img-responsive logo" alt="Cinque Terre"></a>

    <nav class="navbar navbar-inverse wholeNav">
      <div class="container-fluid" style="width: 100%">
        <div class="collapse navbar-collapse" id="myNavbar" style="display: inline-block;font-size: 16px;width: 100%">
          <ul class="nav navbar-nav" id="nav" style="width: 100%">
            <li><a id="invest" href="/restaurantList">点餐大厅</a></li>
            <li><a id="loan" href="/personalOrderList">我的订单</a></li>
            <li><a id="trade" href="/personalCenter">个人中心</a></li>
            <li><a id="guide" href="/guide">平台指南</a></li>
            <li id="last" style="float: right;min-width: 8%;">
              <a id="signup" href="/signup">注册</a>
              <a id="logout" v-on:click="logout" style="display: none">退出</a>
            </li>
            <li id="secondLast" style="float: right;min-width: 8%;">
              <a id="login" href="/login">登录</a>
              <a id="logoff" v-on:click="logoff" style="display: none">注销</a>
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
    mounted: function () {
      let token = localStorage.getItem('Authorization');

      if (token !== 'null' || token !== ''){
        $('#login').css("display","none");
        $('#signup').css("display","none");
        $('#logout').css("display","inherit");
        $('#logoff').css("display","inherit");

        // $(localStorage.route).css("color","dodgerblue");
        //
        // var message = document.createElement('img');
        // message.className = 'message';
        // message.id = 'message';
        // message.src = '/static/pic/message_white.png';
        // var mes=document.createElement('a');
        // mes.href="/messageList";
        // mes.appendChild(message);
        // mes.style.border="none";
        // mes.style.paddingBottom="5px";
        // mes.style.paddingTop="12px";
        // document.getElementById('secondLast').appendChild(mes);
        // document.getElementById('secondLast').style.marginRight="-5%";
        // //localStorage.ifUnread=1;
        // if (localStorage.ifUnread==1){
        //   $('#remindPoint').css('display','inherit');
        // }
        // $('#last').hover(
        //   function(){
        //     $('#last').css('border-bottom','3px solid transparent');
        //     $('#last').css('border-top','3px solid transparent');
        //   },
        //   function(){
        //     $('#last').css('border-bottom','3px solid transparent');
        //     $('#last').css('border-top','3px solid transparent');
        //   }
        // );
        // $('#secondLast').hover(
        //   function(){
        //     $('#secondLast').css('border-bottom','3px solid transparent');
        //     $('#secondLast').css('border-top','3px solid transparent');
        //   },
        //   function(){
        //     $('#secondLast').css('border-bottom','3px solid transparent');
        //     $('#secondLast').css('border-top','3px solid transparent');
        //   }
        // );
        // $('.message').hover(
        //   function(){
        //     message.src = '/static/pic/message_blue.png';
        //   },
        //   function(){
        //     message.src = '/static/pic/message_white.png';
        //   }
        // );

      }
    },
    methods: {
      logout: function () {
        localStorage.removeItem('Authorization');
        this.$router.replace("/login");
        this.reload();
      },
      logoff: function () {
        this.$confirm('此操作将永久注销账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '注销成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });
        });
      }

    },
    data() {
      return {
        login: false
      }
    }
  }
</script>



<style scoped>
  .whole{
    padding: 0;
    background-color: black;
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
    background-color: black;
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
    border-top:3px solid dodgerblue;
    border-bottom:3px solid dodgerblue;
  }
  #nav li:hover a{
    color:dodgerblue;
  }
  .message{
    height:25px;
    width: auto;
    margin-top: 0px;
    cursor: pointer;
  }
  .message:hover{
    height:25px;
    width: auto;
  }
  .photo{
    margin-top: 4px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
  }
  #nav li a{
    color: white;
    cursor: pointer;
  }
  #manageAccount{
    background-color: ghostwhite;
    border-color: #efefef;
    position: absolute;
    top:51px;
    right: 4%;
    width: 10%;
    display: none;
    z-index: 2;
  }
  #manageAccount button{
    background-color: ghostwhite;
    border: 0.5px #efefef solid;
    width: 100%;
  }
  #manageAccount button:hover{
    background-color: lightblue;
    border: 0.5px #efefef solid;
    width: 100%;
  }
</style>
