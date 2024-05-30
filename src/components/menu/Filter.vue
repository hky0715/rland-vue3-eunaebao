<script setup>
import { reactive, ref, onMounted } from "vue";

const model = reactive({
    categories: [{}],
    count: 0,
    query: '',
});

// ===================== Life Cycle Handler =============================
onMounted(() => {
    fetch("http://localhost:8080/categories")
        .then((resp) => resp.json())
        .then((json) => {
            model.categories = json;
        });
});
</script>
<template>
    <section class="menu-filter">
        <h1>Rland Menu<span class="d:none">검색</span></h1>

        <nav class="category-filter">
            <h1 class="d:none">카테고리 검색 메뉴 목록</h1>
            <ul>
                <li><a class="sm:deco md:deco sm:icon-filter_list" href="list">전체메뉴</a></li>
                <li v-for="c of model.categories" :key="c">
                    <a class="d:none md:d:inline current" v-bind:href="`?c=${c.id}`" v-text="c.name" @click.prevent="$emit('categoryChange', c.id)"></a>
                </li>
            </ul>
        </nav>
        <section class="query-filter" id="query-form">
            <h1 class="d:none">이름 검색 폼</h1>
            <form action="list" method="get">
                <fieldset>
                    <legend class="d:none">이름 검색</legend>
                    <input class="query-input" type="text" placeholder="메뉴 검색" name="q" value="" v-model="model.query"/>
                    <button class="icon icon-find" @click.prevent="$emit('queryClick',model.query)">검색</button>
                </fieldset>
            </form>
        </section>
    </section>
</template>

<style scoped>
@import url(@/assets/css/menu/menu-filter.css);
</style>
