<script setup>
import { GoogleLogin, googleTokenLogin } from "vue3-google-login";
import { useUserDetailsStore } from '../store/UserDetails'

const userDetails = useUserDetailsStore();

const loginHandler = () => {

    googleTokenLogin()
    .then((response)=>{
        console.log(response);
        let token = response.access_token;
        console.log(token);
    
        let url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;
        fetch(url)
        .then(resp => resp.json())
        .then(userInfo => {
            console.log(userInfo);
            userDetails.email = userInfo.email;
            userDetails.userName = userInfo.name;
            console.log(userDetails);
            
            routerKey.push("/admin/index");
        });
    })
};
</script>

<template>
    <form>
        <div>
            <label>
                아이디
                <input type="text" />
            </label>
        </div>
        <div>
            <label>
                비밀번호
                <input type="password" />
            </label>
        </div>
        <div>
            <button>로그인</button>
        </div>
        <div>
            <!-- <GoogleLogin :callback="callback" /> -->
            <a href="" @click.prevent="loginHandler">구글 로그인</a>
        </div>
    </form>
</template>