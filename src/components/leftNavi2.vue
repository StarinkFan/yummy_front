<template>
  <div style="width: 20%;display: inline-block;margin-left: 8%;margin-top: 50px;">
    <el-menu
      class="el-menu-vertical-demo">
      <router-link to="/restaurant/restaurantCenter"><el-menu-item index="1">
        <i class="el-icon-info"></i>
        <span slot="title">餐厅信息</span>
      </el-menu-item></router-link>
      <router-link to="/restaurant/restaurantCenter/statistics"><el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">财务整理</span>
      </el-menu-item></router-link>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "leftNavi2"
    }
</script>

<style scoped>
  span{
    font-size: 16px;
  }
</style>
