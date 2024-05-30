<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<template>
    <Header />
    <RouterView />
    <!-- <router-view /> 하이픈 쓰면 소문자로 사용가능 -->
    <Footer />
</template>
