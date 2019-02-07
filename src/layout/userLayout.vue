<template>
    <div :style="{minHeight: minHeight+'px'}" style="position: relative">
        <div id="navi">
            <navi></navi>
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
import navi from "@/components/navi.vue";
import foot from "@/components/foot.vue";
import rightBar from "@/components/rightBar.vue";
export default {
  name: "userLayout",
  components: { navi, foot, rightBar },
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
};
</script>

<style scoped>
#navi {
  z-index: 100;
}
</style>
