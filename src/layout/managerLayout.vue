<template>
  <div :style="{minHeight: minHeight+'px'}" style="position: relative">
    <div id="navi">
      <navi3></navi3>
    </div>
    <router-view></router-view>
    <foot id="foot"></foot>
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
    components: { navi3, foot, rightBar },
    data() {
      return {
        minHeight: 0
      };
    },
    mounted() {
      this.minHeight = window.screen.availHeight;
      console.log(this.minHeight);
      console.log(document.body.scrollHeight);
      if (document.body.scrollHeight <= this.minHeight) {
        $("#foot").css("position", "absolute");
      } else {
        $("#foot").css("position", "inherit");
      }
    }
  }
</script>

<style scoped>
  #navi {
    z-index: 100;
  }
</style>
