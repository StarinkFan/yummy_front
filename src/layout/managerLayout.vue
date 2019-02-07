<template>
  <div>
    <div id="navi">
      <navi3></navi3>
    </div>
    <router-view></router-view>
    <div id="foot">
      <foot></foot>
    </div>
    <div id="rightBar">
      <rightBar></rightBar>
    </div>
  </div>
</template>

<script>
  import navi3 from "@/components/navi3.vue";
  import foot from "@/components/foot.vue";
  import rightBar from "@/components/rightBar.vue";
  export default {
    name: "managerLayout",
    components: { navi3, foot, rightBar }
  }
</script>

<style scoped>
  #navi {
    z-index: 100;
  }
</style>
