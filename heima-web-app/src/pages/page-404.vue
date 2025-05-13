<template>
  <div class="nofound">
<!--    <img src="@/assets/404/404.png" @click="$router.replace({path:'/'})" alt="">-->
    <common_top_bar text="页面正在施工..."></common_top_bar>
  </div>
</template>
<script>
import Common_top_bar from "@/compoents/bars/common_top_bar.vue";

export default {
  components: {Common_top_bar},
  data() {
    return {

    }
  },
  created() {

  }
}
</script>
<style scoped>
  .nofound {
    width: 100%;
    height: 100%
  }
  .nofound img {
    width: 100%;
    height:100%;
  }
</style>
