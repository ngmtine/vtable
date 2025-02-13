<template>
    <div>
        <h1>Vtable Vue Example</h1>
        <VtableVue :recordList="data" :containerHeight="containerHeight" :rowHeight="rowHeight" uniqueKey="id">
            <template #header>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Age</td>
                    <td>Address</td>
                </tr>
            </template>

            <template #body="{ record }">
                <tr :class="getParityClass(record.id)">
                    <td>{{ record.id }}</td>
                    <td>{{ record.name }}</td>
                    <td>{{ record.age }}</td>
                    <td>{{ record.address }}</td>
                </tr>
            </template>

            <template #footer>
                <tr>
                    <td colspan="4">Footer Content</td>
                </tr>
            </template>
        </VtableVue>
    </div>
</template>

<script lang="ts" setup>
    import { VtableVue } from "vtable";
    import { onMounted, onUnmounted, ref } from "vue";
    import { getData, getParityClass } from "../util/data";
    import "../util/table.css";

    const data = getData(100_000);
    const rowHeight = 30;

    // テーブルコンテナ高さ保持（ウィンドウリサイズで変動するため 仮想スクロールテーブル用）
    const containerHeight = ref(window.innerHeight - 100);

    // テーブルコンテナ高さ更新（cssの"calc(100vh - 100px)" 相当の処理）
    const updateContainerHeight = () => {
        containerHeight.value = window.innerHeight - 100;
    };

    // リサイズイベントリスナー付与
    onMounted(() => window.addEventListener("resize", updateContainerHeight));

    // クリーンアップ
    onUnmounted(() => window.removeEventListener("resize", updateContainerHeight));
</script>
