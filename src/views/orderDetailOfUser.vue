<template>
  <div style="width: 100%;text-align: center">
    <el-card class="box-card main" style="width: 60%;margin-left: 20%; margin-top: 50px">
      <h1 style="color: lightskyblue;margin-bottom: 30px">订单详情</h1>
      <div class="infoColumn">
        <p>订单编号：{{order.oid}}</p>
        <p>订单状态：{{order.situation}}</p>
        <p>餐厅编号：{{order.restaurantId}}</p>
        <p>餐厅名称：{{order.restaurantName}}</p>
        <p v-if="order.state > 0">支付时间：{{order.payTime}}</p>
        <p v-if="order.state === 3">送达时间：{{order.arrivalTime}}</p>
      </div>
      <div class="infoColumn">
        <p>下单时间：{{order.createTime}}</p>
        <p>商品总额：{{order.total}}</p>
        <p>订单折扣：{{order.discount}}</p>
        <p>应付金额：{{order.pay}}</p>
        <p v-if="order.state === 2">退款金额：{{order.refund}}</p>
        <p v-if="order.state === 2">退款时间：{{order.refundTime}}</p>
      </div>
      <div style="width: 80%; margin-left: 10%; margin-top: 30px">
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
      <el-button type="primary" plain v-if="order.state === 0" style="margin-top: 40px; margin-bottom: 20px">支付订单</el-button>
      <el-button type="primary" plain v-if="order.state < 2">取消订单</el-button>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "orderDetailOfUser",
      data(){
          return{
            order:{
              state:0,
              situation: "待支付",
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
        this.$axios.post('/order/getDetail', {oid: "1"}).then(
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
          }).catch(err => {
          console.log(err)
        });
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
</style>
