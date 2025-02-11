<template>
    <div>
        <h1>Vue Virtual Scroll Table Example</h1>
        <div id="vtableWrapper" :style="{ height: containerHeight + 'px', overflow: 'auto' }" @scroll="onScroll">
            <table id="vtable" style="border-collapse: collapse; width: 100%">
                <thead style="position: sticky; top: 0; background-color: white; z-index: 1">
                    <tr class="header-row">
                        <th class="cell">ID</th>
                        <th class="cell">Name</th>
                        <th class="cell">Age</th>
                        <th class="cell">Address</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- 上部フィラー行 -->
                    <tr :style="{ height: virtualData.startIndex * rowHeight + 'px' }"></tr>

                    <tr v-for="record in virtualData.displayingRecordList" :key="record.id" :style="getBodyRowStyle(record.id)">
                        <td class="cell">{{ record.id }}</td>
                        <td class="cell">{{ record.name }}</td>
                        <td class="cell">{{ record.age }}</td>
                        <td class="cell">{{ record.address }}</td>
                    </tr>

                    <!-- 下部フィラー行 -->
                    <tr :style="{ height: (data.length - virtualData.endIndex) * rowHeight + 'px' }"
                    ></tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { getData } from "../util/data";
import type { DataItem } from "../util/data";
import { useVirtualScroll } from "./useVirtualScroll";

export default defineComponent({
    name: "ExampleVue",
    setup() {
        // 外部の util からデータ生成
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

        // vue用の仮想スクロールロジック
        const { onScroll, virtualData } = useVirtualScroll<DataItem>(containerHeight.value, rowHeight, data);

        // 偶数／奇数で背景色を変えるスタイル
        const getBodyRowStyle = (id: number) => ({
            backgroundColor: id % 2 === 0 ? "#f9f9f9" : "#ffffff",
        });

        return { data, containerHeight, rowHeight, onScroll, virtualData, getBodyRowStyle };
    },
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
