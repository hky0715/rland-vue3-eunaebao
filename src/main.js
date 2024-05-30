import { createApp } from "vue";
import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import vue3GoogleLogin from "vue3-google-login";
import { createPinia } from "pinia";
import { useUserDetailsStore } from "./components/store/UserDetails";

// icon을 public에 두면 import 해야됨??
import "./assets/css/icon.css";

import Layout from "./components/inc/Layout.vue";
import AdminLayout from "./components/admin/inc/Layout.vue";
import Index from "./components/Index.vue";
import AdminIndex from "./components/admin/Index.vue";
import MenuList from "./components/menu/List.vue";
import AdminMenuList from "./components/admin/menu/List.vue";
import MenuDetail from "./components/menu/Detail.vue";
import UserLogin from "./components/user/Login.vue";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);


const userDetails = useUserDetailsStore();

// 사용하는 주체 : App vue
const router = createRouter({
    // createMemoryHistory : 라우팅 되는 내용을 주소창에 두지 않는 것
    // history: createMemoryHistory(),

    // createWebHistory : 주소창에 남김. a태그도 가능. 근데 창이 새로고쳐짐.
    history: createWebHistory(),

    // 라우터에 붙일 페이지 설정을 여기서 함.
    routes: [
        {
            path: "/",
            redirect: "/index",
            // 자식 컴포넌트들의 공통분모의 component 설정.
            component: Layout,
            children: [
                {
                    path: "index",
                    component: Index,
                },
                {
                    path: "menu/list",
                    component: MenuList,
                },
                {
                    path: "user/login",
                    component: UserLogin,
                },
            ],
        },
        {
            path: "/admin",
            component: AdminLayout,
            children: [
                {
                    path: "index",
                    component: AdminIndex,
                    beforeEnter:(to,from,next)=>{
                        console.log("before...");
                        
                        if (!userDetails.isAuthenticated())
                            next("/user/login");
                    }
                },
                {
                    path: "menu/list",
                    component: AdminMenuList,
                },
            ],
        },
    ],
});




app.use(vue3GoogleLogin, {
    clientId: "626456477319-p43nsok5l1ju0g3d26e7j8k4u7s15cuu.apps.googleusercontent.com",
})
//라우터 장착
.use(router)
.mount("#app");
