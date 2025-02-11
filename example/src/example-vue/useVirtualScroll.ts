import { calculateVirtualScroll } from "vtable";
import { computed, ref } from "vue";

export const useVirtualScroll = <T>(containerHeight: number, rowHeight: number, recordList: T[], extraItemCount = 80) => {
    const scrollTop = ref(0);

    const onScroll = (event: Event) => {
        const target = event.target as HTMLElement;
        scrollTop.value = target.scrollTop;
    };

    const virtualData = computed(() =>
        calculateVirtualScroll({
            containerHeight,
            rowHeight,
            recordList,
            scrollTop: scrollTop.value,
            extraItemCount,
        }),
    );

    return { onScroll, virtualData };
};
