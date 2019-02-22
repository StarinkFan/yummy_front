<template>
  <div style="width: 100%;text-align: center">
    <h1 style="color: lightskyblue; margin-top: 50px">单品管理</h1>
    <el-card class="box-card" style="width: 56%; vertical-align: top;display: inline-block; min-height: 500px; margin-top: 30px;margin-bottom: 30px">
      <el-table
        :data="commodities"
        stripe
        height="500"
        style="overflow-x: hidden">
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
          label="起始时间"
          width="110"
          prop="beginDate">
        </el-table-column>
        <el-table-column
          fixed
          label="结束时间"
          width="110"
          prop="endDate">
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
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small" :disabled="scope.row.disabled">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-left: 5%; display: inline-block; width: 22%;padding: 20px; margin-top: 30px">
      <el-input v-model="name" placeholder="请输入商品名" maxlength="10" minlength="2"></el-input>
      <el-input v-model="price" placeholder="请输入价格" maxlength="8" minlength="1" onkeyup="value=value.replace(/[^\d.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')" style="margin-top: 20px"></el-input>
      <el-input v-model="amount" placeholder="请输入数量" maxlength="6" minlength="1" onkeyup="value=value.replace(/[^\d]/g,'')" style="margin-top: 20px"></el-input>
      <el-select v-model="kind" placeholder="请选择类型" style="margin-top: 20px">
        <el-option
          v-for="item in kindOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-model="beginDate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择起始日期"
        :picker-options="pickerOptions0"
        style="margin-top: 20px">
      </el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择结束日期"
        :picker-options="pickerOptions1"
        style="margin-top: 20px">
      </el-date-picker>
      <el-button round style="margin-top: 30px" @click="addCommodity">添加单品</el-button>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "commodityAdmin",
      data(){
          let that=this;
        return{
          name:"",
          price:"",
          amount:"",
          kind:"",
          beginDate:"",
          endDate:"",
          commodities: [

          ],

          kindOptions: [{
            value: '主食',
            label: '主食'
          }, {
            value: '小食',
            label: '小食'
          }, {
            value: '饮品',
            label: '饮品'
          }, {
            value: '其他',
            label: '其他'
          }],

          pickerOptions0: {
            disabledDate(time) {
              if (that.endDate !== "") {
                return time.getTime() <= Date.now() || time.getTime() >= Date.parse(that.endDate);
              } else {
                return time.getTime() <= Date.now();
              }

            }
          },
          pickerOptions1: {
            disabledDate: (time) => {
              return time.getTime() < Date.parse(that.beginDate) || time.getTime() <= Date.now();
            }
          },
        }
      },
      mounted() {
        this.$axios.post('/commodity/getCommodities',{rid: localStorage.rid}).then(
          res => {
            let data=res.data;
            for(let item of data){
              item.disabled=Date.parse(item.beginDate) <  Date.now();
            }
            this.commodities=data;

          }).catch(err => {
          console.log(err)
        });
      },
      methods:{
          addCommodity(){
            if(this.name===''||this.price===''||this.amount===''||this.beginDate===''||this.endDate===''||this.kind===''){
              this.$message({
                message: '请将信息填写完整',
                type: 'error'
              });
              return;
            }
            this.price=Number(this.price).toFixed(2);
            this.$axios.post('/commodity/saveCommodity',{"rid": parseInt(localStorage.rid), "name": this.name, "price": this.price, "amount": this.amount, "kind": this.kind, "beginDate": this.beginDate, "endDate": this.endDate, "sold": 0}).then(
              res => {
                if(res.data>0){
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.$axios.post('/commodity/getCommodities',{rid: localStorage.rid}).then(
                    res => {
                      let data=res.data;
                      for(let item of data){
                        item.disabled=Date.parse(item.beginDate) <  Date.now();
                      }
                      this.commodities=data;

                    }).catch(err => {
                    console.log(err)
                  });
                }else if(res.data===-2){
                  this.$message({
                    message: '同期有重名商品，添加失败',
                    type: 'error'
                  });
                }else{
                  this.$message({
                    message: '添加失败',
                    type: 'error'
                  });
                }
              }).catch(err => {
              console.log(err)
            });
            //this.clear();
          },
          clear(){
            this.name="";
            this.price="";
            this.amount="";
            this.beginDate="";
            this.endDate="";
          },
        deleteRow: function(index, row) {
          this.$axios.post('/commodity/deleteCommodity',{cid: row.cid}).then(
            res => {
              if(res.data===1){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.commodities.splice(index, 1);
              }else if(res.data===-1){
                this.$message({
                  message: '商品已在套餐中，不可删除',
                  type: 'error'
                });
              }

            }).catch(err => {
            console.log(err)
          });
        },

      }
    }
</script>

<style scoped>

</style>
