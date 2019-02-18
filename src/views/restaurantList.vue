<template>
  <div style="width: 60%;margin-left: 20%;text-align: center">
    <h1 style="color: lightskyblue; margin-top: 30px; margin-bottom: 30px">餐厅列表</h1>
    <el-table
      :data="restaurants"
      border
      stripe>
      <el-table-column
        fixed
        label="头像"
        width="150">
        <template slot-scope="scope">
          <img :src="scope.row.photo" style="width:100%;height: auto"/>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="名称"
        prop="name"
        width="150">
      </el-table-column>
      <el-table-column
        fixed
        label="类型"
        width="80">
        <template slot-scope="scope">
          <el-tag type="info">{{scope.row.kind}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="地点"
        prop="location">
      </el-table-column>
      <el-table-column
        fixed
        label="城市"
        prop="region"
        width="80">
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="checkRestaurant(scope.row)" type="text" size="small">进店</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "restaurantList",
      data(){
        return{
          restaurants: [

          ]
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
          localStorage.restaurantId=row.rid;
          console.log(row.rid);
          this.$router.replace("/user/restaurantDetail");
          this.$axios.post('/restaurant/getRestaurantDetailByUser', {rid: localStorage.restaurantId}).then(
            res => {
             console.log(res.data);
            }).catch(err => {
            console.log(err)
          });
        }
      }
    }
</script>

<style scoped>

</style>
