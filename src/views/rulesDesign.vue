<template>
  <div style="width: 100%;text-align: center">
    <h1 style="color: lightskyblue; margin-top: 50px">结算设计</h1>
    <el-card class="box-card" style="width: 50%; vertical-align: top;display: inline-block; min-height: 500px; margin-top: 30px;margin-bottom: 30px">
      <el-table
        :data="rules"
        stripe
        height="500"
        style="overflow-x: hidden">
        <el-table-column
          fixed
          label="上限"
          prop="top">
        </el-table-column>
        <el-table-column
          fixed
          label="提成"
          prop="percent">
        </el-table-column>
        <el-table-column
          fixed
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      其他提成  <el-input v-model="commonPercent" placeholder="请输入提成(整数)，不超过90" max="90" onkeyup="value=value.replace(/[^\d]/g,'')" style="display: inline-block; width: 50%; margin-top: 20px"></el-input>%
      <el-button round style="margin-top: 30px; margin-left: 20px" @click="saveCommonRule">保存</el-button>
    </el-card>

    <el-card style="margin-left: 11%; display: inline-block; width: 22%;padding: 10px; margin-top: 30px">
      <el-input v-model="top" placeholder="请输入上限(整数)" maxlength="6" minlength="1" onkeyup="value=value.replace(/[^\d]/g,'')" style="display: inline-block; width: 70%"></el-input>
      以下<br>
      提成  <el-input v-model="percent" placeholder="请输入提成(整数)" max="90" onkeyup="value=value.replace(/[^\d]/g,'')" style="display: inline-block; width: 70%; margin-top: 20px"></el-input>%
      <el-button round style="margin-top: 30px" @click="addRule">添加规则</el-button>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "rulesDesign",
    data(){
      let that=this;
      return{
        top:"",
        percent:"",
        commonPercent:"",
        rules: [

        ],
      }
    },
    mounted() {
      this.getRules();
      this.$axios.get('/rule/getCommonRule').then(
        res => {
          this.commonPercent=res.data;
        }).catch(err => {
        console.log(err);
      });
    },
    methods:{
      getRules(){
        this.$axios.get('/rule/getRules').then(
          res => {
            this.rules=res.data;
          }).catch(err => {
          console.log(err)
        });
      },
      addRule(){
        if(this.top===''||this.percent===''){
          this.$message({
            message: '请将信息填写完整',
            type: 'error'
          });
          return;
        }
        if(this.percent==="0"||this.top===""){
          this.$message({
            message: '上限、提成不得为0',
            type: 'error'
          });
          return;
        }
        this.$axios.post('/rule/addRule',{"top": this.top, "percent": this.percent}).then(
          res => {
            if(res.data>0){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.getRules();
            }else if(res.data===-1){
              this.$message({
                message: '有同上限策略，添加失败',
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
        this.$axios.post('/rule/deleteRule',{ruid: row.ruid}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.rules.splice(index, 1);
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
      saveCommonRule(){
        if(this.commonPercent==="0"){
          this.$message({
            message: '提成不得为0',
            type: 'error'
          });
          return;
        }
        this.$axios.post('/rule/saveCommonRule',{"percent": this.commonPercent}).then(
          res => {
            if(res.data===true){
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }else{
              this.$message({
                message: '修改失败',
                type: 'error'
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

</style>
