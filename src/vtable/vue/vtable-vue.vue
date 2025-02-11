<script lang="ts" setup>
    import { computed, ref, toRefs } from "vue";
    import type { VtableProps } from "../types";
    import { calculateVirtualScroll } from "../virtualScroll";

    const props = defineProps<Pick<VtableProps<unknown>, "recordList" | "containerHeight" | "rowHeight" | "uniqueKey">>();
    const { recordList, containerHeight, rowHeight, uniqueKey } = toRefs(props);

    const scrollTop = ref(0);
    const onScroll = (e: Event) => {
        const target = e.target as HTMLElement;
        scrollTop.value = target.scrollTop;
    };

    const virtualData = computed(() => {
        return calculateVirtualScroll({
            containerHeight: containerHeight.value,
            rowHeight: rowHeight.value,
            recordList: recordList.value,
            scrollTop: scrollTop.value,
            extraItemCount: 40,
        });
    });
</script>

<template>
    <div id="vtableWrapper" :style="{ height: containerHeight + 'px', overflow: 'scroll' }" @scroll="onScroll">
        <table id="vtable" style="border-collapse: collapse; width: 100%">
            <thead v-if="$slots.header" style="position: sticky; top: 0; background-color: white; z-index: 1">
                <slot name="header" />
            </thead>

            <tbody>
                <!-- 上部フィラー行 -->
                <tr :style="{ height: virtualData.startIndex * rowHeight + 'px' }"></tr>

                <tr v-for="record in virtualData.displayingRecordList" :key="record[uniqueKey]">
                    <slot name="body" :record="record" />
                </tr>

                <!-- 下部フィラー行 -->
                <tr :style="{ height: (recordList.length - virtualData.endIndex) * rowHeight + 'px' }"></tr>
            </tbody>

            <tfoot v-if="$slots.footer">
                <slot name="footer" />
            </tfoot>
        </table>
    </div>
</template>
