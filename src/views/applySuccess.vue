<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>餐厅申请</h4>
    </div>
    <div style="padding-left: 2%;margin-top: 20px;">
      <el-tag type="success" style="font-size: 16px">您已成功开通餐厅！餐厅编号为{{code}}，初始密码同编号</el-tag>
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
      }
    }
</script>

<style scoped>

</style>
