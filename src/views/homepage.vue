<template>
  <div style="width: 100%;text-align: center">
    <img src="/static/pic/logo.png" style="width:20%;left: 40%;position:absolute;top:200px;" align=center>
    <el-carousel style="width: 100%;min-height: 725px;z-index: -1">
      <el-carousel-item v-for="homePic in homePics" :key="item" style="min-height: 725px">
        <img :src="homePic" style="width: 100%;height: 100%;"/>
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-button type="primary" plain @click="orderNow()" style="position: absolute;bottom:100px;font-size: 25px;z-index: 10;margin-left: -76px;opacity: 0.95">立刻订餐!</el-button>
    </div>
  </div>

</template>

<script>
  import store from '../vuex/store'
    export default {
        name: "homepage",
      data(){
          return{
            homePics:[
              '/static/pic/home1.jpg',
              '/static/pic/home2.jpg',
              '/static/pic/home3.jpg',
              '/static/pic/home4.jpg',
            ]
          }

      },
      methods:{
          orderNow(){
            if(store.getters.isLogin){
              this.$router.push('/restaurantList');
            }else{
              this.$router.push('/signup')
            }
          }
      }
    }
</script>

<style scoped>

</style>
