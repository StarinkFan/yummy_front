<template>
<div style="display: flex; width: 90%; margin-left: 5%; justify-content: space-around; margin-top: 50px; margin-bottom: 70px">
  <el-menu
    @select="filter"
    class="el-menu-vertical-demo" style="width: 20%; max-height: 200px">
    <a><el-menu-item index="1">
      <span slot="title">全部</span>
    </el-menu-item></a>
    <a><el-menu-item index="2">
      <span slot="title">待支付</span>
    </el-menu-item></a>
    <a><el-menu-item index="3">
      <span slot="title">配送中</span>
    </el-menu-item></a>
    <a><el-menu-item index="4">
      <span slot="title">已送达</span>
    </el-menu-item></a>
    <a><el-menu-item index="5">
      <span slot="title">已退款</span>
    </el-menu-item></a>
  </el-menu>
  <el-card class="box-card mainBody">
    <el-table
      :data="selectedOrders"
      stripe
      height="500"
      style="overflow-x: hidden">
      <el-table-column
        fixed
        label="订单编号"
        width="80"
        prop="oid">
      </el-table-column>
      <el-table-column
        fixed
        label="商家编号"
        width="80"
        prop="rid">
      </el-table-column>
      <el-table-column
        fixed
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        fixed
        label="金额"
        width="100"
        prop="pay">
      </el-table-column>
      <el-table-column
        fixed
        label="状态"
        width="100"
        prop="state">
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button @click="checkDetail(scope.$index, scope.row)" type="text" size="small" :disabled="scope.row.disabled">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
    export default {
        name: "OrderListOfUser",
      data(){
          return{
            orders: [],
            selectedOrders:[]
          }
      },
      mounted() {
        this.$axios.post('/order/getUserOrders',{uid: localStorage.uid}).then(
          res => {
            let data=res.data;
            for(let item of data){
              switch(item.state){
                case 0:
                  item.state="待支付";
                  break;
                case 1:
                  item.state="配送中";
                  break;
                case 2:
                  item.state="已送达";
                  break;
                case 3:
                  item.state="已退款";
                  break;
              }
            }
            this.orders=data;
            this.selectedOrders=this.orders;
          }).catch(err => {
            console.log(err)
        });
      },
      methods:{
          checkDetail(index, row){
            this.$router.push({name:"orderDetailOfUser", params: {oid: row.oid}});
          },
        filter(index, indexPath){
            console.log(index);
            index=parseInt(index);
            let array=[];
            switch (index){
              case 1:
                this.selectedOrders=this.orders;
                break;
              case 2:
                for(let item of this.orders){
                  if(item.state==="待支付"){
                    array.push(item);
                  }
                }
                this.selectedOrders=array;
                break;
              case 3:
                for(let item of this.orders){
                  if(item.state==="配送中"){
                    array.push(item);
                  }
                }
                this.selectedOrders=array;
                break;
              case 4:
                for(let item of this.orders){
                  if(item.state==="已送达"){
                    array.push(item);
                  }
                }
                this.selectedOrders=array;
                break;
              case 5:
                for(let item of this.orders){
                  if(item.state==="已退款"){
                    array.push(item);
                  }
                }
                this.selectedOrders=array;
                break;
            }
        }
      }
    }
</script>

<style scoped>
  .mainBody{
    width: 52%;
    min-height: 580px;
  }
</style>
