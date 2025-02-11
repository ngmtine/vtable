<template>
    <div>
        <h1>Vue Virtual Scroll Table Example</h1>
        <VtableVue :recordList="data" :containerHeight="containerHeight" :rowHeight="rowHeight" uniqueKey="id">
            <template #header>
                <tr>
                    <th class="cell">ID</th>
                    <th class="cell">Name</th>
                    <th class="cell">Age</th>
                    <th class="cell">Address</th>
                </tr>
            </template>

            <template #body="{ record }">
                <tr :style="getBodyRowStyle(record.id)">
                    <td class="cell">{{ record.id }}</td>
                    <td class="cell">{{ record.name }}</td>
                    <td class="cell">{{ record.age }}</td>
                    <td class="cell">{{ record.address }}</td>
                </tr>
            </template>

            <template #footer>
                <tr>
                    <td class="cell" colspan="4">Footer Content</td>
                </tr>
            </template>
        </VtableVue>
    </div>
</template>

<script lang="ts" setup>
    import { VtableVue } from "vtable";
    import { onMounted, onUnmounted, ref } from "vue";
    import { getData } from "../util/data";

    const data = getData(100_000);
    const rowHeight = 30;
    const containerHeight = ref(window.innerHeight - 100);

    const updateContainerHeight = () => {
        containerHeight.value = window.innerHeight - 100;
    };

    onMounted(() => {
        window.addEventListener("resize", updateContainerHeight);
    });
    onUnmounted(() => {
        window.removeEventListener("resize", updateContainerHeight);
    });

    // スタイル関数：偶数／奇数で背景色を切り替え
    const getBodyRowStyle = (id: number) => ({
        backgroundColor: id % 2 === 0 ? "#f9f9f9" : "#ffffff",
    });
</script>

<style scoped>
    .header-row {
        background-color: #f9f9f9;
        position: sticky;
        top: 0;
    }

    .cell {
        padding: 4px;
        border-bottom: 1px solid #ddd;
        width: 100px;
    }
</style>
