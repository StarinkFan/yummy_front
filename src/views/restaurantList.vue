<template>
  <div style="width: 100%;display: flex;justify-content: center;flex-wrap: wrap;">
    <div style="display: flex; width: 83%; justify-content: space-between; align-items: center; margin-top: 30px">
      <div>
        <p style="display: inline-block"><i class="el-icon-location-information"></i>  {{location}}</p>
        <span style="display: inline-block;cursor: pointer;color: darkorange" @click="changeLocation">[切换地址]</span>
      </div>
      <div>
        <span style="color: dodgerblue;cursor: pointer" @click="showLocationCard">新增地址</span>
      </div>
    </div>
    <el-card style="width: 83%;margin-top: 20px">
      <div style="display: flex; background-color: white; justify-content: space-between; align-items: center;">
        <div id="kindSelector">
          <li style="color: lightgrey">商家分类 :   </li>
          <li v-for="(item,i) in rKindList" :class="{'bgcolor':restaurantKind==i}" :key="i" @click="selectRKind(item,i)">
            {{item.rKind}}</li>
          <!--<li ref="1" @click="selectRKind(1)">全部</li>
          <li ref="2" @click="selectRKind(2)">中餐</li>
          <li ref="3" @click="selectRKind(3)">西餐</li>
          <li ref="4" @click="selectRKind(4)">快餐</li>
          <li ref="5" @click="selectRKind(5)">甜品</li>
          <li ref="6" @click="selectRKind(6)">小吃</li>
          <li ref="7" @click="selectRKind(7)">其他</li>-->
        </div>
        <el-input placeholder="搜索商家、美食" v-model="searchContent" class="input-with-select" style="width: 320px;">
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
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
          :time="item.time+10"
        >
        </restaurantCard>
      </div>
      <div style="width: 100%; text-align: center; cursor: pointer">
        <span id="load" @click="loadMore">点击加载更多商家</span></div>
    </el-card>
    <div id="cover"></div>
    <el-card id="locationCard">
      <h4 style="font-size: 20px"><b>添加新地址</b></h4>
      <location-selector @addressSelected="addressSelected(arguments)"></location-selector>
      <div style="display: flex; justify-content: space-around">
        <el-button style="width: 150px" :disabled="newLocation === '' " @click="addAddress" round>添  加</el-button>
        <el-button style="width: 150px" @click="hideLocationCard" round>取  消</el-button>
      </div>
    </el-card>
    <el-card id="changeLocationCard">
      <h4 style="font-size: 20px;margin-left: -20px;margin-bottom: 20px;color: darkorange"><b>切换地址</b></h4>
      <label v-for="(item,index) in addresses" :key="index"  id="cLocation">
        <input @click="getRadioVal(item.location)" type="radio" name="type" :value="item.location">{{item.location}}
      </label>
      <div style="display: flex; justify-content: space-around; margin-top: 20px">
        <el-button style="width: 150px" @click="changeL" round>确  定</el-button>
        <el-button style="width: 150px" @click="hideChangeLocationCard" round>取  消</el-button>
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
        newLocation:"",
        addresses:[],
        restaurantList:[],
        restaurantKind:"0",
        rKindList:[{rKind:"全部"},{rKind:"中餐"},{rKind:"西餐"},{rKind:"快餐"},{rKind:"甜品"},{rKind:"小吃"},{rKind:"其他"}],//对应0-6
        rLength:0,
        selectLocation:""
      }
    },
    mounted() {
      this.showRestaurantList();
    },
    methods:{
      getRadioVal(value){
        console.log(value);
        this.selectLocation=value;
      },
      changeL(){
        this.location=this.selectLocation;
        localStorage.location=this.location;
        console.log(localStorage);
        this.showRestaurantList();
        $("#cover").css("display", "none");
        $("#changeLocationCard").css("display", "none");
      }    ,
      changeLocation(){
        this.$axios.post("/user/getInfo", {"uid":localStorage.uid}).then(res => {
          let data2=res.data;
          this.addresses=[];
          this.addresses=data2.addresses;

        });
        console.log(this.addresses);
        $("#cover").css("display", "inherit");
        $("#changeLocationCard").css("display", "flex");
      },
      hideChangeLocationCard(){
        $("#cover").css("display", "none");
        $("#changeLocationCard").css("display", "none");
      },
      loadMore(){
        console.log(this.rLength);
        let count=0;
        if(this.rLength+8<this.restaurantList.length){
          count=this.rLength+8;
          $("#load").html("点击加载更多商家");
          console.log(count);
        }
        else{
          count=this.restaurantList.length;
          $("#load").html("");
          console.log(count);
        }
        for(let i=this.rLength;i<count;i++){
          this.restaurants.push(this.restaurantList[i]);
        }
        this.rLength=this.rLength+8;

      },
      search(){
        console.log(this.searchContent+" "+localStorage.location+" "+this.restaurantKind);
        this.restaurantKind="0";
        this.showRestaurantList();
        //this.searchContent="";
      },
      selectRKind(item,i){
        this.restaurantKind=i;
        console.log(item+i);
        this.showRestaurantList();
      },
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
      },
      showRestaurantList(){
        console.log(this.searchContent);
        this.restaurants=[];
        //this.$axios.get('/restaurant/getRestaurantList').then(
        this.$axios.post('/restaurant/getRestaurantList',{location: localStorage.location,rKind:this.restaurantKind,searchContent:this.searchContent}).then(
          res => {
            console.log(res);
            this.location=localStorage.location;
            localStorage.rLength=10;
            console.log(localStorage);
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
            this.restaurantList=data;
            this.rLength=0;
            this.loadMore();
          }).catch(err => {
          console.log(err)
        });
        /*this.$axios.post("/user/getInfo", {"uid":localStorage.uid}).then(res => {
          let data2=res.data;
          console.log(data2.addresses[0].location);
          this.addresses=data2.addresses;
          this.location=data2.addresses[0].location;
        });*/
      },
      addAddress(){
        this.$axios.post("/address/add", {"uid":localStorage.uid, "region": this.newRegion, "location": this.newLocation}).then(res => {
         if(res.data===true){
           this.$message({
             message: "添加成功",
             type: "success"
           });
           this.hideChangeLocationCard();
         }else{
           this.$message({
             message: "添加失败",
             type: "error"
           });
         }
        });
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
  #kindSelector li:hover{
    color:darkorange;
  }
  #kindSelector li.bgcolor{
    color:darkorange;
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

  #changeLocationCard{
    display: none;
    position: fixed;
    top:200px;
    width: 40%;
    z-index: 30;
    left: 30%;
    justify-content: center;
  }
  #cLocation{
    display: flex;
    font-weight:normal;
  }

</style>
