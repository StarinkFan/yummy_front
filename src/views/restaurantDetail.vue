<template>
  <div style="width: 100%;display: flex;flex-wrap: wrap; justify-content: center; margin-bottom: 50px;text-align: center ">
    <div style="display: flex; width: 83%; justify-content: space-between; align-items: center; margin-top: 30px">
      <div>
        <p style="display: inline-block"><i class="el-icon-location-information"></i>  {{userLocation}}</p>
        <span style="display: inline-block;cursor: pointer;color: darkorange" @click="changeLocation">[切换地址]</span>
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
          <h5>{{TIME}}</h5>
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
        <div v-show="naviIndex === 1">
          <div id="kindSelector">
            <li style="color: lightgrey">食品分类 :   </li>
            <li v-for="(item,i) in cKindList" :class="{'bgcolor':commodityKind==i}" :key="i" @click="selectCKind(item,i)">
              {{item.cKind}}</li>
          </div>
          <hr>
          <div>
            <h4 id="cKind1">主食</h4>
            <div style="display: flex; justify-content: space-between;width: 100%;flex-wrap: wrap">
            <commodityCard
              ref="zhushi"
              v-for="item in staple"
              v-bind:key="item.num"
              :photo="item.photo"
              :name="item.name"
              :rid="item.rid"
              :cid="item.cid"
              :kind="item.kind"
              :price="item.price"
              :num="item.num"
              :description="item.description"
              :cindex="item.cIndex"
              @change="changeNum"
            >
            </commodityCard>
            </div>
          </div>
          <hr>
          <div>
            <h4 id="cKind2">小食</h4>
            <div style="display: flex; justify-content: space-between;width: 100%;flex-wrap: wrap">
              <commodityCard
                v-for="item in snack"
                v-bind:key="item.cIndex"
                :photo="item.photo"
                :name="item.name"
                :rid="item.rid"
                :cid="item.cid"
                :kind="item.kind"
                :price="item.price"
                :num="item.num"
                :description="item.description"
                :cindex="item.cIndex"
                @change="changeNum"
              >
              </commodityCard>
            </div>
          </div>
          <hr>
          <div>
            <h4 id="cKind3">饮品</h4>
            <div style="display: flex; justify-content: space-between;width: 100%;flex-wrap: wrap">
              <commodityCard
                v-for="item in drink"
                v-bind:key="item.cIndex"
                :photo="item.photo"
                :name="item.name"
                :rid="item.rid"
                :cid="item.cid"
                :kind="item.kind"
                :price="item.price"
                :num="item.num"
                :description="item.description"
                :cindex="item.cIndex"
                @change="changeNum"
              >
              </commodityCard>
            </div>
          </div>
          <hr>
          <div>
            <h4 id="cKind4">其他</h4>
            <div style="display: flex; justify-content: space-between;width: 100%;flex-wrap: wrap">
              <commodityCard
                v-for="item in others"
                v-bind:key="item.cIndex"
                :photo="item.photo"
                :name="item.name"
                :rid="item.rid"
                :cid="item.cid"
                :kind="item.kind"
                :price="item.price"
                :num="item.num"
                :description="item.description"
                :cindex="item.cIndex"
                @change="changeNum"
              >
              </commodityCard>
            </div>
          </div>
          <hr>
        </div>

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
              <el-input-number v-model="scope.row.num" :min="0" :max="10" label="描述文字" style="width: 100%" @change="changePNum"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

    </div>


    <!--<el-button type="primary" plain style="margin-top: 10px; width: 20%" @click="checkDistance">确认下单</el-button>-->

    <div id="cover"></div>
    <el-card id="locationCard">
      <h4 style="font-size: 20px"><b>添加新地址</b></h4>
      <location-selector @addressSelected="addressSelected"></location-selector>
      <div style="display: flex; justify-content: space-around">
        <el-button style="width: 150px" round>添  加</el-button>
        <el-button style="width: 150px" @click="hideLocationCard" round>取  消</el-button>
      </div>
    </el-card>
    <el-card id="changeLocationCard">
      <h4 style="font-size: 20px;margin-left: -100px;"><b>切换地址</b></h4>
      <label v-for="(item,index) in addresses" :key="index"  id="cLocation">
        <input @click="getRadioVal(item.location)" type="radio" name="type" :value="item.location">{{item.location}}
      </label>
      <div style="display: flex; justify-content: space-around">
        <el-button style="width: 150px" @click="changeL" round>确  定</el-button>
        <el-button style="width: 150px" @click="hideChangeLocationCard" round>取  消</el-button>
      </div>
    </el-card>
    <div class="shopcart">
      <div class="left">
        <div class="circle" @click="toggle()">
          <div :class="{'highlight': totalCount}"></div>
          <div class="num-red" v-show="totalCount">
            {{totalCount}}
          </div>
        </div>
        <div class="left-text-before" v-show="!totalCount">
          {{check.trackingBefore}}
        </div>
        <div class="left-text-after" v-show="totalCount">
          <div class="total-money">
            ￥{{totalMoney}}
          </div>
          <div class="tracking">
            {{check.trackingBefore}}
          </div>

        </div>
      </div>
      <div class="right" :class="{'highlight': totalCount}" @click="checkDistance">
        {{checkAll}}
      </div>
    </div>
    <!-- 购物车列表 -->
    <div class="shop-list" v-show="this.isShow" >
      <p class="shop-list-title" @click="clearCart">[清空购物车]</p>
      <div class="shop-list-wrapper">
        <el-table
          :data="buy"
          stripe
          height="500"
          style="overflow-x: hidden"
          class="list">
          <el-table-column
            fixed
            label="名称"
            width="140"
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
            label="购买数量"
            width="155">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" :min="0" :max="10" label="描述文字" style="width: 100%" @change="listChangeNum(scope.row)"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>

</template>

<script>
  import locationSelector from '@/components/locationSelector.vue'
  import commodityCard from '../components/commodityCard'

    export default {
        name: "restaurantDetail",
      components:{locationSelector,commodityCard},
      data(){
          return{
              rid:0,
              name:"南大第六食堂",
              location:"江苏省南京市栖霞区南京大学（仙林校区）",
              photo:"",
              kind:"中餐",
              commodities:[],
            staple:[],
            snack:[],
            drink:[],
            others:[],
              packages:[],
              discounts:[{total:100, discount:30}, {total: 150, discount: 50}],
            naviIndex:1,
            /*target:"",
            targets:[],*/
            distance: 1.0,
            time: 15,
            TIME:"",
            userLocation:"江苏省南京市鼓楼区南京大学（鼓楼校区）",
            newRegion:"全国",
            newLocation:"",
            addresses:[],
            selectLocation:"",
            commodityKind:"0",
            cKindList:[{cKind:"主食",i:"cKind1"},{cKind:"小食",i:"cKind2"},{cKind:"饮品",i:"cKind3"},{cKind:"其他",i:"cKind4"}],//对应0-3
            check: {
              trackingBefore:'',
              checkBefore: '去点餐',
              checkAfter: '结算',
            },
            isShow:false,
          }
      },
      mounted(){
          this.userLocation=localStorage.location;
        this.getRestaurantDetail();
        /*this.$axios.post('/user/getTargets', {uid: localStorage.uid}).then(
          res => {
            this.addresses=res.data;
          }).catch(err => {
          console.log(err)
        });*/
      },
      methods:{

          listChangeNum(val){

            if(val.K=1){
              console.log(val);
              this.changeNum(val.num,val.cIndex,val.kind);
            }
            else{
              this.changePNum();
            }
          },
        clearCart(){
          this.packages.forEach(val => {
            val.num = 0
          })
          this.commodities.forEach(val => {
            val.num = 0
          })
          this.staple.forEach(val => {
            val.num = 0
          })
          this.snack.forEach(val => {
            val.num = 0
          })
          this.drink.forEach(val => {
            val.num = 0
          })
          this.others.forEach(val => {
            val.num = 0
          })
          this.isShow = false
        },
        toggle(){
          console.log(this.totalCount);
          if(!this.totalCount){
            console.log(this.totalCount);
            this.isShow = false;
          }else{
            this.isShow = !this.isShow;
          }
        },
        changePNum(){
          this.saveCart();
        },
          changeNum:function(v,ind,k){
            console.log(v+" "+ind);
            this.commodities[ind].num=v;
            if(k=="主食"){
              for(let s of this.staple){
                if(s.cIndex==ind){
                  s.num=v;
                }
              }
            }
            if(k=="小食"){
              for(let s of this.snack){
                if(s.cIndex==ind){
                  s.num=v;
                }
              }
            }
            if(k=="饮品"){
              for(let s of this.drink){
                if(s.cIndex==ind){
                  s.num=v;
                }
              }
            }
            if(k=="其他"){
              for(let s of this.others){
                if(s.cIndex==ind){
                  s.num=v;
                }
              }
            }
            console.log(this.commodities);
            console.log(this.packages);
            this.saveCart();
          },
          saveCart(){
            //console.log(this.commodities);
            //console.log(this.packages);
            his.$axios.post("cart/ChangeCart", {uid:localStorage.uid,rid:this.rid,commodities:this.commodities,packages:this.packages}).then(res => {
              let data=res.data;
            });
          },
        selectCKind(item,i){
          this.commodityKind=i;
          console.log(item.i);
          //this.$refs.li[7].scrollIntoView();
          document.getElementById(item.i).scrollIntoView();
        },
          getRestaurantDetail(){
            this.rid=this.$route.params.rid;
            console.log(this.rid);
            this.$axios.post('/restaurant/getRestaurantDetailByUser', {rid: this.$route.params.rid,uid:localStorage.uid}).then(
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
                let cc=0;
                for(let c of data.commodities){
                  c.cIndex=cc;
                  c.num=0;
                  cc=cc+1;
                  c.K=1;
                  switch (c.kind){
                    case "主食":
                      this.staple.push(c);
                      break;
                    case "小食":
                      this.snack.push(c);
                      break;
                    case "饮品":
                      this.drink.push(c);
                      break;
                    case "其他":
                      this.others.push(c);
                      break;
                  }
                }
                let pp=0;
                for(let p of data.packages){
                  p.num=0;
                  p.pIndex=pp;
                  pp=pp+1;
                  p.K=0;
                }
                this.commodities=data.commodities;
                this.packages=data.packages;
                console.log(this.commodities);
                console.log(this.packages);
                this.getDistanceAndTimeOfRU();
              }).catch(err => {
              console.log(err)
            });
          },
        getDistanceAndTimeOfRU(){
            console.log(this.location+" "+this.userLocation);
          this.$axios.post("/address/canConvey", {"departure":this.location, "target": this.userLocation}).then(res => {
            let data=res.data;
            this.distance=data.distance;
            this.time=data.time+10;
          console.log(localStorage);
          /*this.distance=1;
          this.time=60+10;*/
            if(this.time<=60){
              this.TIME=this.time+"min";
            }else {
              this.TIME="超出配送范围";
            }
          });
        },
        getRadioVal(value){
          console.log(value);
          this.selectLocation=value;
        },
        changeL(){
          this.userLocation=this.selectLocation;
          localStorage.location=this.userLocation;
          console.log(localStorage);
          this.getDistanceAndTimeOfRU();
          //this.showRestaurantList();
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
          changeNaviIndex(index, indexPath){
            this.naviIndex=parseInt(index);
          },
        checkDistance(){
          console.log("check");
          if(this.userLocation===''){
            this.$message({
              message: "请选择收货地址",
              type: "error"
            });
            return;
          }else{
            if(this.time<=60){
              console.log("check");
              this.placeOrder();
              localStorage.duration=this.time;
            }
            else{
              this.$message({
                message: "超出配送范围",
                type: "error"
              });
            }
          }
        },
        placeOrder(){
          console.log(this.rid);
          this.$axios.post("/order/place", {"uid":localStorage.uid, "rid": this.rid, "commodities":this.commodities, "packages": this.packages, "target": this.userLocation}).then(res => {
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
      },

      computed: {
        totalMoney() {
          let total = 0;
          this.commodities.forEach(val => {
            if (!val.num) {
              return
            } else {
              total += val.num * val.price
            }
          })
          this.packages.forEach(val => {
            if (!val.num) {
              return
            } else {
              total += val.num * val.price
            }
          })
          return total
        },
        totalCount() {
          let num = 0;
          this.commodities.forEach(val => {
            if (!val.num) {
              return
            } else {
              num += val.num
            }
          })
          this.packages.forEach(val => {
            if (!val.num) {
              return
            } else {
              num += val.num
            }
          })
          return num
        },
        checkAll() {
          if (this.totalCount) {
            return this.check.checkAfter
          } else {
            return this.check.checkBefore
          }
        },
        buy(){
          let buy = [];
          this.commodities.forEach(val => {
            if (!val.num) {
              return
            } else {
              buy.push(val)
            }
          })
          this.packages.forEach(val => {
            if (!val.num) {
              return
            } else {
              buy.push(val)
            }
          })
          return buy
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
#kindSelector li{
  display: inline-block;
  width: 80px;
  text-align: left;
  cursor: pointer;
}
#kindSelector li:hover{
  color:dodgerblue;
}
/*#kindSelector li.bgcolor{
  color:dodgerblue;
}*/
  #cKind1{
    /*margin-top: 1000px;*/
    color:black;
  }
#cKind2{
  /*margin-top: 1000px;*/
  color:black;
}
#cKind3{
  /*margin-top: 1000px;*/
  color:black;
}
#cKind4{
  /*margin-top: 1000px;*/
  color:black;
}

.shopcart {
  width: 25%;
  background: #514f4f;
  position: fixed;
  bottom: 0;
  height: 50px;
  display: flex;
  margin-left: -500px;
}
.left{
  flex:1;
}
.circle {
  width: 50px;
  height: 50px;
  background: #726d6d;
  border-radius: 50%;
  position: relative;
  left: 10px;
  /*bottom: 16px;*/
  float: left;
  background:url(../assets/img/timg.jpg);
  background-size: 100%;
}
.circle .num-red {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 9px;
  line-height: 15px;
  text-align: center;
  right: 0;
  top: 0;
}
.left-text-before{
  position: relative;
  left: 18px;
  font-size: 14px;
  line-height: 50px;
  color: #c4c4c4;
  float: left;
}
.left-text-after {
  position: relative;
  left: 18px;
  color: #c4c4c4;
  float: left;
  top: 10px;
}
.left-text-after .total-money {
  font-size: 24px;
  line-height: 28px;
}
.left-text-after .tracking {
  font-size: 11px;
  margin-top: 3px;
}
.right {
  flex: 0 0 110px;
  line-height: 50px;
  text-align: center;
  color:#c4c4c4;
}
.highlight:hover{
  background:dodgerblue;
  color: #FFF;
}
.highlight {
  background: #b3d8ff;
  color: black;
  font-size: 16px;
}
  .shop-list{
    width: 25%;
    background: #FFF;
    position: fixed;
    height: 250px;
    display: block;
    margin-left: -500px;
    border: 0.2px lightgrey solid;
    bottom: 330px;
  }
.shop-list-title{
  font-size: 16px;
  color: dodgerblue;
  display: flex;
  margin-left: 300px;
}
shop-list-wrapper{

}
shop-list-content{

}
shop-list-left{

}
shop-list-middle{

}
</style>
