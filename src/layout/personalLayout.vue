<template>
  <div>
    <div id="navi">
      <navi></navi>
    </div>
    <div id="main" style="width: 100%">
      <leftNavi></leftNavi>
      <el-card class="box-card mainBody">
        <router-view></router-view>
      </el-card>
    </div>
    <div id="foot">
      <foot></foot>
    </div>
    <div id="rightBar">
      <rightBar></rightBar>
    </div>
  </div>
</template>

<script>
  import navi from "@/components/navi.vue";
  import foot from "@/components/foot.vue";
  import rightBar from "@/components/rightBar.vue";
  import leftNavi from '@/components/leftNavi.vue';

    export default {
        name: "personalLayout",
      components:{navi, foot, rightBar,leftNavi}
    }
</script>

<style scoped>
  .mainBody{
    width: 52%;
    margin-left: 12%;
    min-height: 580px;
    padding-bottom: 50px;
    display: inline-block;
    vertical-align: top;
    margin-top: 50px;
    margin-bottom: 60px;
    position: relative;
  }

</style>
