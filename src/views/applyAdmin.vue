<template>
  <div style="width: 50%;margin-left: 25%;text-align: center">
    <h1 style="color: lightskyblue">餐厅审批</h1>
    <el-table
      :data="applications"
      border
      stripe>
      <el-table-column
        fixed
        label="id"
        prop="rid"
        width="80">
      </el-table-column>
      <el-table-column
        fixed
        label="名称"
        prop="title">
      </el-table-column>
      <el-table-column
        fixed
        label="类型"
        width="160"
        prop="type">
      </el-table-column>
      <el-table-column
        fixed
        label="申请者"
        width="100"
        prop="owner">
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="checkApply(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "applyAdmin",
      data(){
          return{
            applications: [

            ]
          }
      },
      mounted() {
        this.$axios.get('/restaurant/getApplications').then(
          res => {
            this.applications=res.data;
          }).catch(err => {
          console.log(err)
        });
      }
    }
</script>

<style scoped>

</style>
