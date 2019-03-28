<template>
  <div style="width: 100%;text-align: center">
    <div style="width: 50%;margin-left: 25%">
      <h1 style="color: lightskyblue;margin-bottom: 20px">商品列表</h1>
      <h4>欢迎光临 {{name}}</h4>
      <p style="display: inline-block;margin-right: 30px">类型：{{kind}}</p>
      <p style="display: inline-block">地址：{{location}}</p><br>
      <el-tag v-for="item in discounts" :key="item.did" style="margin-right: 10px">满{{item.total}}减{{item.discount}}</el-tag>
    </div>

    <div style="width: 100%; text-align: left">
      <div style="width: 20%; margin-left:9%;display: inline-block;margin-top: 50px;vertical-align: top">
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
        <el-select v-model="target" placeholder="请选择收货地址" style="margin-top: 60px; width: 100%;padding-left: 20px">
          <el-option
            v-for="item in targets"
            :key="item.location"
            :value="item.location">
          </el-option>
        </el-select>
        <el-button type="primary" plain style="margin-top: 50px; margin-left: 30%" @click="checkDistance">确认下单</el-button>
      </div>

      <el-card class="box-card main">
        <el-table
          :data="commodities"
          stripe
          height="500"
          style="overflow-x: hidden"
          class="list"
          v-show="naviIndex === 1">
          <el-table-column
            fixed
            label="名称"
            prop="name">
          </el-table-column>
          <el-table-column
            fixed
            label="单价"
            width="80"
            prop="price">
          </el-table-column>
          <el-table-column
            fixed
            label="类型"
            width="80"
            prop="kind">
          </el-table-column>
          <el-table-column
            fixed
            label="数量"
            width="80"
            prop="amount">
          </el-table-column>
          <el-table-column
            fixed
            label="已售"
            width="80"
            prop="sold">
          </el-table-column>
          <el-table-column
            fixed
            label="购买数量">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num" :min="0" :max="20" label="描述文字" style="width: 100%"></el-input-number>
            </template>
          </el-table-column>
        </el-table>

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
  </div>

</template>

<script>
    export default {
        name: "restaurantDetail",
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
            targets:[]
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
        }
      }


    }
</script>

<style scoped>
.main{
  width: 50%;
  vertical-align: top;
  display: inline-block;
  min-height: 500px;
  margin-top: 30px;
  margin-bottom: 60px;
  margin-left: 12%;
  padding: 5px;
}
</style>
