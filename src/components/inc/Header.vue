<script setup>
    // import userDetails from '../store/UserDetails';
    import { useUserDetailsStore } from '../store/UserDetails';
    import { useRoute, useRouter } from 'vue-router';

    const userDetails = useUserDetailsStore();
    const router = useRouter();

    const logoutHandler = ()=>{
        userDetails.invalidate();

        // 로그아웃 한 뒤엔 어디로 가? 어떻게 가?
        router.push("/");

        
    }
</script>

<template>
    <header class="n-header">
        <h1>Rland {{ userDetails.userName }}</h1>

        <nav>
            <h1 class="d:none">메인메뉴</h1>
            <ul>
                <!-- a 태그 쓰면 안됨. 페이지가 전체 reload 됨. web아님. -->
                <li><RouterLink class="icon icon:list md:d:none" to="/mobile-menu">햄버거버튼</RouterLink></li>
                <li><RouterLink class="icon icon:house d:none md:d:inline-block mr:1" to="/index">Home</RouterLink></li>
                <li><RouterLink class="icon icon:local_cafe d:none md:d:inline-block" to="/menu/list">Menu List</RouterLink></li>
                <!-- <li><RouterLink class="icon icon:user d:none md:d:inline-block mr:1" to="/admin/index">Admin</RouterLink></li> -->
                <li v-if="!userDetails.isAuthenticated()"><RouterLink class="icon icon:user d:none md:d:inline-block mr:1" to="/user/login">Admin</RouterLink></li>
                <li v-else>
                    <a class="icon icon:sign_out d:none md:d:inline-block" @click.prevent="logoutHandler" href="/user/logout" ></a></li>
                <li></li>
            </ul>
        </nav>
    </header>
</template>

<style></style>
