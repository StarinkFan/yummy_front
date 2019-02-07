<template>
  <div>
    <div id="navi">
      <navi2></navi2>
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
  import navi2 from "@/components/navi2.vue";
  import foot from "@/components/foot.vue";
  import rightBar from "@/components/rightBar.vue";
    export default {
        name: "restaurantLayout",
      components: { navi2, foot, rightBar },
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
