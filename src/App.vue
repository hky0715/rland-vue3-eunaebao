<!-- sfc : single file component -->
<!-- 이 파일은 소스코드 vue가 변환해줌  -->
<!-- setup 을 붙이면 composition 만 쓴다는 것 / 안 쓰면 options-->
<script setup>
import Header  from "./components/inc/Header.vue";
import Layout from "./components/inc/Layout.vue";
</script>

<template>
    <!-- <Header /> -->

    <!-- 알맹이. 여기에 계층을 더해가겠다~ -->
    <RouterView />
</template>

<!-- scoped : 고립화. 근데 많이 쓰면 느려진다. 공용 스타일 한 뒤에 예외~적으로만 사용하기. -->
<!-- <style scoped>
    .n-list{
        background-color: burlywood;
    }
</style> -->