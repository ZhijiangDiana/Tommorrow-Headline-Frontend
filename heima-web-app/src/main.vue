<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
import util from "@/utils/font"

export default {
  name: 'HeiMa-App',
  created () {
    util.initIconFont();
    document.title='明日头条'
  }
}
</script>
