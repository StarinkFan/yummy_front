<template>
  <div style="width: 20%;display: inline-block;margin-left: 8%;margin-top: 50px;">
    <el-menu
      class="el-menu-vertical-demo">
      <router-link to="/user/personalCenter">
        <el-menu-item index="1">
          <i class="el-icon-info"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
      </router-link>
      <router-link to="/user/personalCenter/statistics">
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">财务整理</span>
        </el-menu-item>
      </router-link>
      <router-link to="/user/personalCenter/restaurantApply">
        <el-menu-item index="3">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">餐厅申请</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "leftNavi"
    }
</script>

<style scoped>
span{
  font-size: 16px;
}
</style>
