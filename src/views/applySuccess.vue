<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>餐厅申请</h4>
    </div>
    <div style="padding-left: 2%;margin-top: 20px;">
      <el-tag type="success" style="font-size: 16px">您已成功开通餐厅！餐厅识别码为{{code}}</el-tag><br>
      <a href="/login"><el-button type="success" plain style="margin-top: 30px">前往登录</el-button></a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "applySuccess",
      data() {
        return {
          code: '1000001'
        }
      },
      mounted(){
        this.$axios.post('/restaurant/getIdCode', {owner: localStorage.uid}).then(
          res => {
            this.code=res.data;
          }).catch(err => {
          console.log(err)
        });
      }
    }
</script>

<style scoped>

</style>
