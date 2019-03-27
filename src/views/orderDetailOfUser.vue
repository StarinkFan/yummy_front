<template>
  <div style="width: 100%;text-align: center">
    <el-card class="box-card main" style="width: 60%;margin-left: 20%; margin-top: 50px" v-if="!paying">
      <h1 style="color: lightskyblue;margin-bottom: 30px">订单详情</h1>
      <div class="infoColumn">
        <p>订单编号：{{order.oid}}</p>
        <p>订单状态：{{order.situation}}</p>
        <p>餐厅编号：{{order.rid}}</p>
        <p>餐厅名称：{{order.rname}}</p>
        <p v-if="order.state > 0">支付时间：{{order.payTime}}</p>
        <p v-if="order.state === 2">送达时间：{{order.arrivalTime}}</p>
      </div>
      <div class="infoColumn">
        <p>下单时间：{{order.createTime}}</p>
        <p>商品总额：{{order.total}}</p>
        <p>订单折扣：{{order.discount}}</p>
        <p>应付金额：{{order.pay}}</p>
        <p v-if="order.state === 3">退款金额：{{order.refund}}</p>
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
      <el-button type="primary" plain v-if="order.state === 0" style="margin-bottom: 20px" @click="showPayPanel">支付订单</el-button>
      <el-button type="primary" plain v-if="order.state === 1" style="margin-bottom: 20px" @click="refund">取消订单</el-button>
      <el-button type="primary" plain v-if="order.state === 1" style="margin-bottom: 20px" @click="confirmArrival">确认送达</el-button>

      <br>
      <el-tag type="warning" v-if="order.state === 0">剩余付款时间: {{leftTime}}</el-tag>
    </el-card>
    <el-card class="box-card main" style="width: 40%;margin-left: 30%; margin-top: 50px"  v-if="paying">
      <h3 style="float: top;" align="center">付款</h3>
      <el-input id="account" class="loginInput" v-model="account" style="margin-top: 6%;" placeholder="请输入银行账户" maxLength="10"></el-input>
      <el-input id="password" type="password" v-model="password" class="loginInput" style="margin-top: 8%;" align="center" placeholder="请输入密码" maxLength="15"></el-input><br>
      <el-button type="primary" plain v-if="order.state === 0" style="margin-top: 40px; margin-bottom: 20px" @click="pay">确认</el-button>
      <el-button type="primary" plain v-if="order.state === 0" style="margin-top: 40px; margin-bottom: 20px" @click="hidePayPanel">取消</el-button>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "orderDetailOfUser",
      data(){
          return{
            paying: false,
            account:"",
            password:"",
            leftTime:"",
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
          setTimer(){
            let leftSeconds=120-parseInt( (Date.now() - Date.parse(this.order.createTime))/1000);
            let leftMinutes=parseInt(leftSeconds/60);
            leftSeconds=leftSeconds-leftMinutes*60;
            this.leftTime=leftMinutes+"分"+leftSeconds+"秒";
            let myScroll = setInterval(() => {
              let leftSeconds=120-parseInt( (Date.now() - Date.parse(this.order.createTime))/1000);
              let leftMinutes=parseInt(leftSeconds/60);
              leftSeconds=leftSeconds-leftMinutes*60;
              this.leftTime=leftMinutes+"分"+leftSeconds+"秒";
              if(leftSeconds===0&&leftMinutes===0) {
                clearTimeout(myScroll);    //清除定时器
                this.$message({
                  message: "超时未支付，订单取消！",
                  type: "warning"
                });
                this.$router.replace("/user/restaurantList");
              }
            }, 1000);
          },
        showPayPanel(){
            this.paying=true;
        },
        hidePayPanel(){
          this.paying=false;
        },
        pay(){
          this.$axios.post("/bankAccount/pay", {oid:this.order.oid, shouldPay: this.order.pay, account: this.account, password: this.password}).then(res => {
            let data=res.data;
            if(data>0){
              this.$message({
                message: "支付成功，预计"+localStorage.duration+"分钟内送达",
                type: "success"
              });
              this.getDetail();
              this.paying=false;
              let myScroll = setInterval(() => {
                let leftSeconds=60*60-parseInt( (Date.now() - Date.parse(this.order.payTime))/1000);
                let leftMinutes=parseInt(leftSeconds/60);
                leftSeconds=leftSeconds-leftMinutes*60;
                if(leftSeconds===0&&leftMinutes===0) {
                  clearTimeout(myScroll);    //清除定时器
                  this.$message({
                    message: "超时未确认，已自动确认送达！",
                    type: "warning"
                  });
                  this.getDetail();
                }
              }, 1000);
            }else if(data===-1){
              this.$message({
                message: "账户或密码错误",
                type: "error"
              });
            }else if(data===-2){
              this.$message({
                message: "余额不足",
                type: "error"
              });
            }else{
              this.$message({
                message: "支付失败",
                type: "error"
              });
            }
          });
        },
        refund(){
          this.$axios.post('/order/refund',{oid: this.$route.params.oid}).then(
            res => {
              let data=res.data;
              if(data>0){
                if(data===2){
                  this.$message({
                    message: "退款成功, 两分钟内全额退款",
                    type: "success"
                  });
                }else if(data===10){
                  this.$message({
                    message: "退款成功, 十分钟内退八成",
                    type: "success"
                  });
                }else{
                  this.$message({
                    message: "退款成功, 超十分钟，退一半",
                    type: "success"
                  });
                }
                this.getDetail();

              }else{
                this.$message({
                  message: "退款失败",
                  type: "error"
                });
              }

            }).catch(err => {
            console.log(err)
          });
        },
        confirmArrival(){
          this.$axios.post('/order/arrive',{oid: this.$route.params.oid}).then(
            res => {
              let data=res.data;
              if(data===true){
                this.$message({
                  message: "确认送达，交易完成",
                  type: "success"
                });
                this.getDetail()
              }else{
                this.$message({
                  message: "确认失败，请重试",
                  type: "error"
                });
              }
            }).catch(err => {
            console.log(err)
          });
        }

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
