<template>
  <div style="width: 100%;display: flex;justify-content: center;flex-wrap: wrap;">
    <div style="display: flex; width: 83%; justify-content: space-between; align-items: center; margin-top: 30px">
      <div>
        <p style="display: inline-block"><i class="el-icon-location-information"></i>  {{location}}</p>
        <span style="display: inline-block;cursor: pointer;color: darkorange">[切换地址]</span>
      </div>
      <div>
        <span style="color: dodgerblue;cursor: pointer" @click="showLocationCard">新增地址</span>
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
    <el-card style="width: 83%;margin-top: 20px;min-height: 500px; margin-bottom: 80px; ">
      <div style="display: flex; justify-content: space-between;width: 100%;flex-wrap: wrap">
        <restaurantCard
          v-for="(item,index) in restaurants"
          v-bind:key="index"
          :photo="item.photo"
          :name="item.name"
          :rid="item.rid"
          :kind="item.kind"
          :distance="item.distance"
          :time="item.time"
        >
        </restaurantCard>
      </div>
      <div style="width: 100%; text-align: center; cursor: pointer">点击加载更多商家</div>
    </el-card>
    <div id="cover"></div>
    <el-card id="locationCard">
      <h4 style="font-size: 20px"><b>添加新地址</b></h4>
      <location-selector @addressSelected="addressSelected(arguments)"></location-selector>
      <div style="display: flex; justify-content: space-around">
        <el-button style="width: 150px" :disabled="newLocation === '' " round>添  加</el-button>
        <el-button style="width: 150px" @click="hideLocationCard" round>取  消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import restaurantCard from '../components/restaurantCard'
  import locationSelector from '@/components/locationSelector.vue'

    export default {
        name: "restaurantList",
      components:{restaurantCard,locationSelector},
      data(){
        return{
          restaurants: [

          ],
          location:"南京大学鼓楼校区",
          searchContent:"",
          newRegion:"全国",
          newLocation:""
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
            // for(let i=0;i<10;i++){
            //   res.data.push({});
            // }
            this.restaurants=data;

          }).catch(err => {
          console.log(err)
        });
      },
      methods:{
        showLocationCard(){
          $("#cover").css("display", "inherit");
          $("#locationCard").css("display", "flex");
        },
        hideLocationCard(){
          $("#cover").css("display", "none");
          $("#locationCard").css("display", "none");
        },
        addressSelected(msg){
          this.newRegion=msg[1];
          this.newLocation=msg[0];
        }
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

#cover {
  width: 100%;
  height: 100%;
  z-index: 20;
  position: fixed;
  top: 0;
  background-color: black;
  opacity: 0.5;
  display: none;
  text-align: center;
}

#locationCard{
  display: none;
  position: fixed;
  top:200px;
  width: 40%;
  z-index: 30;
  left: 30%;
  justify-content: center;
}

</style>
