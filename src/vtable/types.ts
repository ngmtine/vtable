/**
 * 各行（ボディ）のレンダリング用プロパティの型
 */
export interface BodyRowProps<T> {
    record: T;
}

/**
 * Vtable コンポーネントに渡す共通の Props の型
 */
export interface VtableProps<T, R = unknown> {
    recordList: T[];
    containerHeight: number;
    rowHeight: number;
    HeaderRow?: () => R;
    BodyRow: (props: BodyRowProps<T>) => R;
    FooterRow?: () => R;
    uniqueKey: keyof T;
}

/**
 * 仮想スクロールの計算に渡すパラメータの型
 */
export interface VirtualScrollParams<T> {
    containerHeight: number;
    rowHeight: number;
    recordList: T[];
    scrollTop: number;
    extraItemCount?: number;
}

/**
 * 仮想スクロールの計算結果の型
 */
export interface VirtualScrollReturns<T> {
    startIndex: number;
    endIndex: number;
    displayCount: number;
    offsetY: number;
    displayingRecordList: T[];
}
