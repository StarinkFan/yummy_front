<template>
  <div style="width: 100%;text-align: center">
    <el-card class="box-card main" style="width: 60%;margin-left: 20%; margin-top: 50px;margin-bottom: 70px">
      <h1 style="color: lightskyblue;margin-bottom: 30px">订单详情</h1>
      <div class="infoColumn">
        <p>订单编号：{{order.oid}}</p>
        <p>订单状态：{{order.situation}}</p>
        <p>用户编号：{{order.uid}}</p>
        <p>用户名称：{{order.uname}}</p>
        <p v-if="order.state > 0">支付时间：{{order.payTime}}</p>
        <p v-if="order.state === 3">退款金额：{{order.refund}}</p>
      </div>
      <div class="infoColumn">
        <p>下单时间：{{order.createTime}}</p>
        <p>商品总额：{{order.total}}</p>
        <p>订单折扣：{{order.discount}}</p>
        <p>应付金额：{{order.pay}}</p>
        <p v-if="order.state === 2">送达时间：{{order.arrivalTime}}</p>
        <p v-if="order.state === 3">退款时间：{{order.refundTime}}</p>
      </div>
      <div style="width: 80%; margin-left: 10%; margin-top: 30px; margin-bottom: 40px">
        商品：
        <el-popover v-for="(item,index) in commodities" :key="index" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px">
          <p>名称: {{ item.name }}</p>
          <p>单价: {{ item.price }}</p>
          <p>类型: {{ item.kind }}</p>
          <p>数量: {{ item.num }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ item.name }}</el-tag>
          </div>
        </el-popover>
        <br>
        <br>
        套餐：
        <el-popover v-for="(aPackage,index) in packages" :key="index" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px">
          <p>名称: {{ aPackage.name }}</p>
          <p>单价: {{ aPackage.price }}</p>
          <p>数量: {{ aPackage.price }}</p>
          <el-popover v-for="(item,index) in aPackage.items" :key="index" trigger="hover" placement="top" style="display: inline-block; margin-right: 2px">
            <p>名称: {{ item.name }}</p>
            <p>单价: {{ item.price }}</p>
            <p>类型: {{ item.kind }}</p>
            <p>数量: {{ item.num }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" type="info">{{ item.name }}</el-tag>
            </div>
          </el-popover>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ aPackage.name }}</el-tag>
          </div>
        </el-popover>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "orderDetailOfRestaurant",
    data(){
      return{
        order:{
          state:3,
          situation: "已送达",
        },
        commodities: [{
          name: "海鲜意面",
          kind:"主食",
          price: 28,
          num: 2,
        },{
          name: "肉酱意面",
          kind:"主食",
          price: 26,
          num: 1
        }],
        packages: [{
          name: "套餐1",
          price: 180,
          num: 2,
          items:[{name:"肉酱意面", price: 26, kind: "主食", num: 3},{name:"海鲜意面", price: 28, kind: "主食", num: 2},{name:"西瓜汁", price: 12, kind: "饮料", num: 5}]
        },{
          name: "套餐2",
          price: 70,
          num: 1,
          items:[{name:"海鲜意面", price: 28, kind: "主食", num: 2},{name:"西瓜汁", price: 12, kind: "饮料", num: 2}]
        }]
      }
    },
    mounted(){
      this.getDetail();
    },
    methods:{
      getDetail(){
        this.$axios.post('/order/getDetail', {oid: this.$route.params.oid}).then(
          res => {
            let data=res.data;
            switch(data.orderInfo.state){
              case 0:
                data.orderInfo.situation="待支付";
                break;
              case 1:
                data.orderInfo.situation="派送中";
                break;
              case 2:
                data.orderInfo.situation="已送达";
                break;
              case 3:
                data.orderInfo.situation="已退款";
                break;
            }
            console.log(data);
            this.order=data.orderInfo;
            this.commodities=data.commodities;
            this.packages=data.packages;
            if(this.order.state===0){
              this.setTimer();
            }
          }).catch(err => {
          console.log(err)
        });
      },

    }

  }
</script>

<style scoped>
  .infoColumn{
    display: inline-block;
    width: 40%;
    text-align: left;
    vertical-align: top;
  }

  .infoColumn p{
    font-size: 14px;
    margin: 20px;
  }

  .loginInput{
    width: 90%;
  }
</style>

