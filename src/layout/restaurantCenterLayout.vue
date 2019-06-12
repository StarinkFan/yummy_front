<template>
    <div id="main" style="width: 100%">
      <leftNavi2></leftNavi2>
      <el-card class="box-card mainBody">
        <router-view></router-view>
      </el-card>
    </div>
</template>

<script>
  import leftNavi2 from '@/components/leftNavi2.vue';

    export default {
        name: "restaurantCenterLayout",
      components: {leftNavi2}
    }
</script>

<style scoped>
  .mainBody{
    width: 56%;
    margin-left: 8%;
    min-height: 580px;
    padding-bottom: 50px;
    display: inline-block;
    vertical-align: top;
    margin-top: 50px;
    margin-bottom: 60px;
    position: relative;
  }
</style>
