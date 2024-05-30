<script setup>
import { reactive, ref, onMounted, watch, computed } from "vue";
import BasketStatus from "./BasketStatus.vue";
import Filter from "./Filter.vue";
import Pager from "../inc/Pager.vue";

const model = reactive({
    list: [{}, {}],
    count: 0,
});

const state = reactive({
    query: "",
});

// ============== computed ==================
const x = ref(0);
const y = computed(() => x.value + 3);
// ==========================================

let basketInfo = reactive({
    price: 0,
    amount: 0,
});

// ===================== Event Handler =============================
function addCartClickHandler(menu) {
    basketInfo.price += menu.price;
    basketInfo.list = menu;
}

// 쿼리 바뀔 때
function test(data) {
    // reactive 하게
    // state.query = data;

    // ref 사용
    query2.value = data;

    // console.log(data);
}

// 카테고리 누를 때
function test2(data) {
    state.query = data;
    console.log(data);
}

// ===================== Life Cycle Handler =============================
onMounted(() => {
    fetch("http://localhost:8080/menus")
        .then((resp) => resp.json())
        .then((json) => {
            model.list = json;
        });
});

// 값이 바뀌면 실행되는...
const query2 = ref("");
watch(
    query2,
    () => {
        console.log(query2.value);
        console.log("hehe");
    }

    // reactive 하게
    // () => state.query,
    // (query) => {
    //     console.log("hehe");
    //     console.log(query);
    // }
);
</script>

<template>
    <main>
        <section class="menu-list">
            <h1 class="d:none">메뉴 검색 목록</h1>
            <div>
                <!-- ================== computed ================== -->
                <div>
                    <input type="text" v-model.number="x" /><span>{{ y }}</span>
                </div>
                <!--=============================================== -->
                <!-- Filter -->
                <Filter @queryClick="test" @categoryChange="test2" />
                <!-- ------------------------------------------------------ -->

                <section class="menu-card-list" id="menu-card-list">
                    <h1 class="d:none">메뉴 목록</h1>
                    <div class="content fade">
                        <section class="menu-card" v-for="m of model.list" :key="m">
                            <h1>
                                <a class="heading-3" href="detail">{{ m.korName }}</a>
                            </h1>
                            <h2 class="heading-2 font-weight:normal color:base-5">{{ m.engName }}</h2>
                            <div class="price-block d:flex align-items:flex-end">
                                <span class="font-weight:bold">{{ m.price }}</span
                                >원<span class="soldout-msg ml:auto mr:auto md:d:none">SOLD OUT</span>
                            </div>
                            <div class="img-block">
                                <a href="detail?id=1">
                                    <!-- <img src="/image/menu/8.jpg" /> -->
                                </a>
                            </div>
                            <div class="like-block d:flex justify-content:flex-end">
                                <a class="icon icon-heart icon-color:base-4" href="">좋아요</a>
                                <span class="font-weight:bold ml:1">2</span>
                            </div>
                            <div>
                                <button>삭제</button>
                            </div>
                            <div class="pay-block d:flex">
                                <!-- <a class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text" href="">담기</a> -->
                                <form action="/cart/add-menu" method="post">
                                    <input type="hidden" name="id" />

                                    <button class="icon md:icon:none icon-cart icon-color:base-0 color:base-0 btn-type:icon btn-cart md:btn-type:text" @click.prevent="addCartClickHandler(m)">
                                        담기
                                    </button>
                                </form>
                                <a class="icon md:icon:none icon-card icon-color:base-0 color:base-0 btn-type:icon btn-card md:btn-type:text" href="">주문하기</a>
                            </div>
                        </section>
                    </div>
                </section>
            </div>
        </section>

        <!-- Pager -->
        <Pager />

        <!-- BasketStatus -->
        <!-- 방법 1 -->
        <!-- <BasketStatus :price="basketInfo.price" /> -->

        <!-- 방법 2 -->
        <BasketStatus :list="basketInfo.list" />
    </main>
</template>

<style scoped>
@import url(@/assets/css/menu/list.css);
@import url(@/assets/css/menu/card.css);
</style>
