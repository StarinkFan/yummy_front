<template>
  <div class="whole" id="navi" style="width:100%;">
    <a href="/"><img src="/static/pic/logo_yellow.png" id="naviLogo" class="img-responsive logo" alt="Cinque Terre"></a>

    <nav class="navbar navbar-inverse wholeNav">
      <div class="container-fluid" style="width: 100%">
        <div class="collapse navbar-collapse" id="myNavbar" style="display: inline-block;font-size: 16px;width: 100%">
          <ul class="nav navbar-nav" id="nav" style="width: 100%">
            <li><router-link to="/restaurant/commodityAdmin">单品管理</router-link></li>
            <li><router-link to="/restaurant/packageAdmin">套餐管理</router-link></li>
            <li><router-link to="/restaurant/discountAdmin">折扣管理</router-link></li>
            <li><router-link to="/restaurant/orderList">经营记录</router-link></li>
            <li><router-link to="/restaurant/restaurantCenter">餐厅中心</router-link></li>
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
    name: 'navi2',
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
