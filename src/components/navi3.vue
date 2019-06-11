<template>
  <div class="whole" id="navi" style="width:100%;">
    <a href="/"><img src="/static/pic/logo.png" id="naviLogo" class="img-responsive logo" alt="Cinque Terre"></a>

    <nav class="navbar navbar-inverse wholeNav">
      <div class="container-fluid" style="width: 100%">
        <div class="collapse navbar-collapse" id="myNavbar" style="display: inline-block;font-size: 16px;width: 100%">
          <ul class="nav navbar-nav" id="nav" style="width: 100%">
            <li><router-link to="/manager/applyAdmin">餐厅审批</router-link></li>
            <li><router-link to="/manager/modifyAdmin">修改审批</router-link></li>
            <li><router-link to="/manager/rulesDesign">结算设计</router-link></li>
            <li><router-link to="/manager/statistics">平台统计</router-link></li>
            <li id="last" style="float: right;min-width: 8%;">
              <a id="logout" v-on:click="logout">退出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'navi3',
    methods: {
      logout: function () {
        localStorage.removeItem('Authorization');
        this.$router.replace("/login");
      },
      mounted(){
        $("a").click(function(){
          $("a").css("color", "white");
          $(this).css("color", "dodgerblue");
        })
      },
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
  #nav li a{
    color: white;
    cursor: pointer;
  }
</style>
