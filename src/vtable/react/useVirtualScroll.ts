import type { UIEvent } from "react";
import { useCallback, useState } from "react";
import type { VirtualScrollReturns } from "../virtualScroll";
import { calculateVirtualScroll } from "../virtualScroll";

interface UseVirtualScrollArgs<T> {
    containerHeight: number;
    rowHeight: number;
    recordList: T[];
}

interface UseVirtualScrollReturns<T> extends VirtualScrollReturns<T> {
    handleScroll(event: UIEvent<HTMLDivElement>): void;
}

export const useVirtualScroll = <T>(props: UseVirtualScrollArgs<T>): UseVirtualScrollReturns<T> => {
    const { containerHeight, rowHeight, recordList } = props;

    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
    }, []);

    return {
        ...calculateVirtualScroll({
            containerHeight,
            rowHeight,
            recordList,
            scrollTop,
        }),
        handleScroll,
    };
};
