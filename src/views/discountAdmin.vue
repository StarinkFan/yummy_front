<template>
  <div style="width: 100%;text-align: center">
    <h1 style="color: lightskyblue; margin-top: 50px">优惠管理</h1>
    <el-card class="box-card" style="width: 50%; vertical-align: top;display: inline-block; min-height: 500px; margin-top: 30px;margin-bottom: 30px">
      <el-table
        :data="discounts"
        stripe
        height="500"
        style="overflow-x: hidden">
        <el-table-column
          fixed
          label="满"
          width="100"
          prop="total">
        </el-table-column>
        <el-table-column
          fixed
          label="减"
          width="100"
          prop="discount">
        </el-table-column>
        <el-table-column
          fixed
          label="起始时间"
          width="150"
          prop="beginDate">
        </el-table-column>
        <el-table-column
          fixed
          label="结束时间"
          width="150"
          prop="endDate">
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

    <el-card style="margin-left: 11%; display: inline-block; width: 22%;padding: 20px; margin-top: 30px">
      满：<el-input v-model="total" placeholder="请输入价格(整数)" maxlength="6" minlength="1" onkeyup="value=value.replace(/[^\d]/g,'')" style="display: inline-block; width: 80%"></el-input>
      <br>
      减：<el-input v-model="discount" placeholder="请输入折扣(整数)" maxlength="6" minlength="1" onkeyup="value=value.replace(/[^\d]/g,'')" style="display: inline-block; width: 80%; margin-top: 20px"></el-input>
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
      <el-button round style="margin-top: 30px" @click="addDiscount">添加优惠</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "discountAdmin",
    data(){
      let that=this;
      return{
        total:"",
        discount:"",
        beginDate:"",
        endDate:"",
        discounts: [

        ],

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
      this.$axios.post('/discount/getDiscounts',{rid: localStorage.rid}).then(
        res => {
          let data=res.data;
          for(let item of data){
            item.disabled=Date.parse(item.beginDate) <  Date.now();
          }
          this.discounts=data;
        }).catch(err => {
        console.log(err)
      });
    },
    methods:{
      addDiscount(){
        if(this.total===''||this.discount===''||this.beginDate===''||this.endDate===''){
          this.$message({
            message: '请将信息填写完整',
            type: 'error'
          });
          return;
        }
        this.price=Number(this.price).toFixed(2);
        this.$axios.post('/discount/addDiscount',{"rid": parseInt(localStorage.rid), "total": this.total, "discount": this.discount, "beginDate": this.beginDate, "endDate": this.endDate}).then(
          res => {
            if(res.data>0){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$axios.post('/discount/getDiscounts',{rid: localStorage.rid}).then(
                res => {
                  let data=res.data;
                  for(let item of data){
                    item.disabled=Date.parse(item.beginDate) <  Date.now();
                  }
                  this.discounts=data;
                }).catch(err => {
                console.log(err)
              });
            }else if(res.data===-1){
              this.$message({
                message: '同期有同满价格优惠，添加失败',
                type: 'error'
              });
            }else if(res.data===-2){
              this.$message({
                message: '满额不得高于减额',
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
      deleteRow: function(index, row) {
        this.$axios.post('/discount/deleteDiscount',{did: row.did}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.discounts.splice(index, 1);
            }else{
              this.$message({
                message: '删除失败',
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
