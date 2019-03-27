<template>
  <div style="width: 100%">
    <div slot="header" class="clearfix" style="padding-bottom:16px;border-bottom: 1px solid #ebeef5">
      <h4>个人信息</h4>
      <a href="/user/personalCenter/editPersonalInfo"><el-button style="float: right; padding: 3px 0" type="text">编辑</el-button></a>
    </div>
    <div style="padding-left: 5%;font-size: 16px;margin-top: 50px">
      <p>昵称：{{info.name}}</p><br>
      <p>邮箱：{{info.email}}</p><br>
      <p>等级：{{info.level}}</p><br>
      <p>电话：{{info.phone}}</p><br>
      <p>地址：</p>
      <div style="padding-left: 5%;font-size: 14px;margin-top: 20px">
        <p v-for="item in info.addresses"><i class="el-icon-location"></i>{{item.location}}</p><br>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "personalFinance"
    }
</script>

<style scoped>

</style>
