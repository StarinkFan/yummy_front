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
        prop="name">
      </el-table-column>
      <el-table-column
        fixed
        label="类型"
        width="160"
        prop="kind">
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
          <el-button @click="checkApplication(scope.row)" type="text" size="small">查看</el-button>
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
            let data=res.data;
            for(let item of data){
              switch(item.kind){
                case 1:
                  item.kind="中餐";
                  break;
                case 2:
                  item.kind="西餐";
                  break;
                case 3:
                  item.kind="快餐";
                  break;
                case 4:
                  item.kind="甜品";
                  break;
                case 5:
                  item.kind="小吃";
                  break;
                case 6:
                  item.kind="其他";
                  break;
              }
            }
            this.applications=data;

          }).catch(err => {
          console.log(err)
        });
      },
      methods:{
          checkApplication(row){
            localStorage.applicationId=row.rid;
            console.log(row.rid);
            this.$router.replace("/manager/applicationDetail");
          }
      }
    }
</script>

<style scoped>

</style>
