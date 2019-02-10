<template>
  <div style="width: 50%;margin-left: 25%;text-align: center">
    <h1 style="color: lightskyblue">修改审批</h1>
    <el-table
      :data="modifications"
      border
      stripe>
      <el-table-column
        fixed
        label="编号"
        prop="mid"
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
        label="餐厅id"
        width="100"
        prop="rid">
      </el-table-column>
      <el-table-column
        fixed
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="checkModification(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "modifyAdmin",
    data(){
      return{
        modifications: [

        ]
      }
    },
    mounted() {
      this.$axios.get('/modification/getModifications').then(
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
          this.modifications=data;

        }).catch(err => {
        console.log(err)
      });
    },
    methods:{
      checkModification(row){
        localStorage.modificationId=row.mid;
        this.$router.replace("/manager/modificationDetail");
      }
    }
  }
</script>

<style scoped>

</style>
