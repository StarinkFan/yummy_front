<template>
    <el-card style="width: 40%; margin-left: 30%; margin-top: 60px; margin-bottom: 60px; display: flex; align-items: center">
      <p>总用户数：{{info.userNum}}</p>
      <p>总商家数：{{info.restaurantNum}}</p>
      <p>总系统收益：{{info.sTotalGain}}</p>
      <p>总商家收益：{{info.rTotalGain}}</p>
      <p>月系统收益：{{info.sMonthGain}}</p>
      <p>月商家收益：{{info.rMonthGain}}</p>
    </el-card>
</template>

<script>
    export default {
        name: "systemStatistics",
      data(){
          return{
            info:{}
          }
      },
      beforeCreate(){
        this.$axios.get('/statistics/getSystemCondition').then(
          res => {
            this.info=res.data;
          }).catch(err => {
          console.log(err)
        });
      }
    }
</script>

<style scoped>
p{
  display: block;
}
</style>
