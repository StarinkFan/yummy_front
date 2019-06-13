<template>
  <div id="main" @click="checkRestaurant">
    <img :src="photo" id="photo"/>
    <h5>{{name}}</h5>
    <div id="detail" style="width: 100%;height: 13px">
      <p>类型：{{kind}}</p>
      <p>{{distance}}km</p>
      <p>{{time}}min</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "restaurantCard",
      props: {
        rid: {
          type: Number,
          required: -1
        },
        name: {
          type: String,
          default: "南京某餐馆"
        },
        distance: {
          type: Number,
          default: 1.5
        },
        time: {
          type: Number,
          default:30
        },
        photo: {
          type: String,
          default:"https://njuhzl.oss-cn-hangzhou.aliyuncs.com/yummy/defaultPhoto.jpg"
        },
        kind: {
          type: String,
          default: "中餐"
        },
      },
      methods:{
        checkRestaurant(){
          this.$router.push({name:"restaurantDetail", params: {rid: this.rid}});
        },
      }

    }
</script>

<style scoped>
  #photo{
    width: 100%;
    height: 180px;
  }

  #main{
    width: 25%;
    display: flex;
    justify-content: center;
    padding: 40px 10px 40px 10px;
    border-bottom: 0.8px lightgrey solid;
    flex-wrap: wrap;
    cursor: pointer;
  }

  #detail{
    display: flex;
    justify-content: space-between;
  }

  #detail p{
    display: inline-block;
    color: darkgrey;
    font-size: 13px;
  }

  h5{
    width: 100%;
    font-size: 16px;
  }

</style>
