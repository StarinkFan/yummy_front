<template>
  <div style="width: 100%;display: flex;flex-wrap: wrap; justify-content: center; margin-bottom: 50px;text-align: center ">
    <div style="display: flex; width: 83%; justify-content: space-between; align-items: center; margin-top: 30px">
      <div>
        <p style="display: inline-block"><i class="el-icon-location-information"></i>  {{userLocation}}</p>
        <span style="display: inline-block;cursor: pointer;color: darkorange">[切换地址]</span>
      </div>
      <div>
        <span style="color: dodgerblue;cursor: pointer" @click="showLocationCard">新增地址</span>
      </div>
    </div>
    <el-card style="width: 83%;margin-top: 20px">
      <div style="display: flex; background-color: white; justify-content: space-between; align-items: center;">
        <div style="display: flex; justify-content: left">
          <div>
            <img :src="photo" id="photo"/>
          </div>
          <div style="margin-left: 10px; font-size: 12px;color: grey">
            <h4><b>{{name}}</b></h4>
            <p style="margin-top: 10px; margin-bottom: 5px">类型：{{kind}}</p>
            <p style="margin-bottom: 0; padding-bottom: 0">地址：{{location}}</p>
          </div>
        </div>
        <div>
          <p>餐厅距离</p>
          <h5>{{distance}}</h5>km
        </div>
        <div>
          <p>预计送达时间</p>
          <h5>{{time}}</h5>min
        </div>
        <div style="display: flex; flex-wrap: wrap; max-width: 200px">
          <el-tag v-for="item in discounts" :key="item.did" style="display: block; margin: 5px">满{{item.total}}减{{item.discount}}</el-tag>
        </div>
      </div>
    </el-card>

    <div style="width: 83%; margin-top:50px; text-align: left; display: flex; justify-content: space-between; align-items: flex-start">
      <div style="width: 22%">
        <el-menu class="el-menu-vertical-demo" default-active="1" @select="changeNaviIndex">
          <el-menu-item index="1">
            <i class="el-icon-goods"></i>
            <span slot="title">单品列表</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">套餐列表</span>
          </el-menu-item>
        </el-menu>

      </div>

      <el-card class="box-card main">
        <el-table
          :data="packages"
          stripe
          height="500"
          style="overflow-x: hidden"
          class="list"
          v-show="naviIndex === 2">
          <el-table-column
            fixed
            label="名称"
            width="120"
            prop="name">
          </el-table-column>
          <el-table-column
            fixed
            label="价格"
            width="100"
            prop="price">
          </el-table-column>
          <el-table-column
            fixed
            label="包含商品">
            <template slot-scope="scope">
              <el-popover v-for="(item,index) in scope.row.items" :key="index" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px">
                <img :src="item.photo" style="width: 120px; height: 120px"/>
                <p>名称: {{ item.name }}</p>
                <p>单价: {{ item.price }}</p>
                <p>类型: {{ item.kind }}</p>
                <p>数量: {{ item.num }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ item.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            label="购买数量"
            width="150">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" :min="0" :max="10" label="描述文字" style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

    </div>


    <el-button type="primary" plain style="margin-top: 10px; width: 20%" @click="checkDistance">确认下单</el-button>

    <div id="cover"></div>
    <el-card id="locationCard">
      <h4 style="font-size: 20px"><b>添加新地址</b></h4>
      <location-selector @addressSelected="addressSelected"></location-selector>
      <div style="display: flex; justify-content: space-around">
        <el-button style="width: 150px" round>添  加</el-button>
        <el-button style="width: 150px" @click="hideLocationCard" round>取  消</el-button>
      </div>
    </el-card>

    <div id="shoppingCart">

    </div>

  </div>

</template>

<script>
  import locationSelector from '@/components/locationSelector.vue'

    export default {
        name: "restaurantDetail",
      components:{locationSelector},
      data(){
          return{
              rid:0,
              name:"南大第六食堂",
              location:"江苏省南京市栖霞区南京大学（仙林校区）",
              photo:"",
              kind:"中餐",
              commodities:[],
              packages:[],
              discounts:[{total:100, discount:30}, {total: 150, discount: 50}],
            naviIndex:1,
            target:"",
            targets:[],
            distance: 1.0,
            time: 15,
            userLocation:"江苏省南京市鼓楼区南京大学（鼓楼校区）",
            newRegion:"全国",
            newLocation:""
          }
      },
      mounted(){
        this.$axios.post('/restaurant/getRestaurantDetailByUser', {rid: this.$route.params.rid}).then(
          res => {
            let data=res.data;
            this.name=data.name;
            this.location=data.location;
            this.photo=data.photo;
            switch(data.kind){
              case 1:
                this.kind="中餐";
                break;
              case 2:
                this.kind="西餐";
                break;
              case 3:
                this.kind="快餐";
                break;
              case 4:
                this.kind="甜品";
                break;
              case 5:
                this.kind="小吃";
                break;
              case 6:
                this.kind="其他";
                break;
            }
            this.discounts=data.discounts;
            for(let c of data.commodities){
              c.num=0;
            }
            for(let p of data.packages){
              p.num=0;
            }
            this.commodities=data.commodities;
            this.packages=data.packages;
          }).catch(err => {
          console.log(err)
        });
        this.$axios.post('/user/getTargets', {uid: localStorage.uid}).then(
          res => {
            this.targets=res.data;
          }).catch(err => {
          console.log(err)
        });
      },
      methods:{
          changeNaviIndex(index, indexPath){
            this.naviIndex=parseInt(index);
          },
        checkDistance(){
          if(this.target===''){
            this.$message({
              message: "请选择收货地址",
              type: "error"
            });
            return;
          }else{
            this.$axios.post("/address/canConvey", {"departure":this.location, "target": this.target}).then(res => {
              let data=res.data;
              if(data>=0){
                this.placeOrder();
                localStorage.duration=data+10;
              }else {
                this.$message({
                  message: "超出配送范围",
                  type: "error"
                });
              }
            });
          }
        },
        placeOrder(){
          this.$axios.post("/order/place", {"uid":localStorage.uid, "rid": this.$route.params.rid, "commodities":this.commodities, "packages": this.packages, "target": this.target}).then(res => {
            let data=res.data;
            if(data>=0){
              this.$message({
                message: "下单成功！",
                type: "success"
              });
              localStorage.oid=data;
              this.$router.push({name:"orderDetailOfUser", params: {oid: data}});
            }else if(data===-1){
              this.$message({
                message: "订单不得为空！",
                type: "error"
              });
            }else if(data===-2){
              this.$message({
                message: "商品数量不足，请重新选择",
                type: "error"
              });
            }else if(data===3){
              this.$message({
                message: "下单失败",
                type: "error"
              });
            }

          });
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
        }
      }


    }
</script>

<style scoped>
.main{
  width: 63%;
  min-height: 500px;
  margin-bottom: 60px;
  padding: 5px;
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

#photo{
  width: 100px;
  height: 80px;
}

  h4{
    color: darkorange;
    margin-top: 10px;
  }

  h5{
    display:inline-block;
    font-size: 22px;
  }

  #shoppingCart{
    width: 25%;
    position: fixed;
    left: 9%;
    bottom: 0;
    background-color: black;
    max-height: 400px;
    height: 100px;
    z-index: 20;
  }
</style>
