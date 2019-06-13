<template>
  <div style="width: 100%;display: flex;justify-content: center;flex-wrap: wrap;">
    <div style="display: flex; width: 83%; justify-content: space-between; align-items: center; margin-top: 30px">
      <div>
        <p style="display: inline-block"><i class="el-icon-location-information"></i>  {{location}}</p>
        <a style="display: inline-block;cursor: pointer;color: darkorange">[切换地址]</a>
      </div>
    </div>
    <el-card style="width: 83%;margin-top: 20px">
      <div style="display: flex; background-color: white; justify-content: space-between; align-items: center;">
        <div id="kindSelector">
          <li style="color: lightgrey">商家分类 :   </li>
          <li style="color: darkorange">全部</li>
          <li>中餐</li>
          <li>西餐</li>
          <li>快餐</li>
          <li>甜品</li>
          <li>小吃</li>
          <li>其他</li>
        </div>
        <el-input placeholder="搜索商家、美食" v-model="searchContent" class="input-with-select" style="width: 320px;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-card>
    <el-card style="width: 83%;margin-top: 20px;min-height: 500px; margin-bottom: 80px">

    </el-card>
  </div>
</template>

<script>
    export default {
        name: "restaurantList",
      data(){
        return{
          restaurants: [

          ],
          location:"南京大学鼓楼校区",
          searchContent:""
        }
      },
      mounted() {
        this.$axios.get('/restaurant/getRestaurantList').then(
          res => {
            let data=res.data;
            for(let item of data){
              switch(item.kind){
                case 1:
                  item.kind="中餐";
                  break;
                case 2:
                  item.kind="西餐";
                  break;
                case 3:
                  item.kind="快餐";
                  break;
                case 4:
                  item.kind="甜品";
                  break;
                case 5:
                  item.kind="小吃";
                  break;
                case 6:
                  item.kind="其他";
                  break;
              }
            }
            this.restaurants=data;

          }).catch(err => {
          console.log(err)
        });
      },
      methods:{
        checkRestaurant(row){
          this.$router.push({name:"restaurantDetail", params: {rid: row.rid}});
        },
      }
    }
</script>

<style scoped>
#kindSelector li{
  display: inline-block;
  width: 80px;
  text-align: left;
  cursor: pointer;
}

</style>
