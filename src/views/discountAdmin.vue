<template>
  <div style="width: 100%;text-align: center">
    <h1 style="margin-top: 50px">优惠管理</h1>
    <el-card class="box-card" style="width: 56%; vertical-align: top;display: inline-block; min-height: 500px; margin-top: 30px;margin-bottom: 30px">
      <el-table
        :data="discounts"
        stripe
        height="500"
        id="discountList"
        style="overflow-x: hidden">
        <el-table-column
          fixed
          label="满"
          prop="total">
        </el-table-column>
        <el-table-column
          fixed
          label="减"
          prop="discount">
        </el-table-column>
        <el-table-column
          fixed
          label="触发次数"
          prop="time">
        </el-table-column>
        <el-table-column
          fixed
          label="状态"
          prop="state">
        </el-table-column>
        <el-table-column
          fixed
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="invalidate(scope.row)" type="text" size="small" v-if="scope.row.ifValid === true">弃用</el-button>
            <el-button @click="validate(scope.row)" type="text" size="small" v-else>使用</el-button>
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-left: 5%; display: inline-block; width: 22%;padding: 20px; margin-top: 30px">
      满：<el-input v-model="total" placeholder="请输入价格(整数)" maxlength="6" minlength="1" onkeyup="value=value.replace(/[^\d]/g,'')" style="display: inline-block; width: 80%" id=total :disabled="ifEdit"></el-input>
      <br>
      减：<el-input v-model="discount" placeholder="请输入折扣(整数)" maxlength="6" minlength="1" onkeyup="value=value.replace(/[^\d]/g,'')" style="display: inline-block; width: 80%; margin-top: 20px"></el-input>
      <el-button round style="margin-top: 30px" @click="addDiscount">保存优惠</el-button><br>
      <a style="padding-top: 10px;cursor: pointer" @click="clear" v-if="did >= 0">返回</a>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "discountAdmin",
    data(){
      let that=this;
      return{
        did: -1,
        total:"",
        discount:"",
        discounts: [

        ],

       ifEdit:false
      }
    },
    mounted() {
      this.$axios.post('/discount/getDiscounts',{rid: localStorage.rid}).then(
        res => {
          this.discounts=res.data;
        }).catch(err => {
        console.log(err)
      });
    },
    methods:{
      addDiscount(){
        if(this.total===''||this.discount===''){
          this.$message({
            message: '请将信息填写完整',
            type: 'error'
          });
          return;
        }
        this.$axios.post('/discount/addDiscount',{did: this.did,"rid": parseInt(localStorage.rid), "total": parseInt(this.total), "discount": parseInt(this.discount)}).then(
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
                message: '有同满价格优惠，保存失败',
                type: 'error'
              });
            }else if(res.data===-2){
              this.$message({
                message: '满额不得高于减额',
                type: 'error'
              });
            }else{
              this.$message({
                message: '保存失败',
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
      clear(){
        this.did=-1;
        this.total="";
        this.discount="";
        this.ifEdit=false;
      },

      checkSameDiscount(){
        this.$axios.post('/discount/hasSameDiscount',{did: this.did, rid:localStorage.rid, total: this.total}).then(
          res => {
            if(res.data===true){
              //$("#name").focus();
              //this.hasSameName=true;
            }else{
              //this.hasSameName=false;
            }

          }).catch(err => {
          console.log(err)
        });
      },
      validate(row){
        this.$axios.post('/discount/validate',{did: row.did}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '成功使用',
                type: 'success'
              });
              row.ifValid=true;
              row.state="使用中";
            }else{
              this.$message({
                message: '取消失败',
                type: 'error'
              });
            }

          }).catch(err => {
          console.log(err)
        });
      },
      invalidate(row){
        this.$axios.post('/discount/invalidate',{did: row.did}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '成功弃用',
                type: 'success'
              });
              row.ifValid=false;
              row.state="未使用";
            }else{
              this.$message({
                message: '下架失败',
                type: 'error'
              });
            }

          }).catch(err => {
          console.log(err)
        });
      },
      edit(index, row){
        this.did=row.did;
        this.total=row.total;
        this.discount=row.discount;
        this.ifEdit=true;
      },

    }
  }
</script>

<style scoped>
  #discountList ::-webkit-scrollbar {
    width: 30px;
    background-color: transparent;
  }
</style>
