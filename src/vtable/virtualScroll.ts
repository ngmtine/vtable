export interface VirtualScrollParams<T> {
    containerHeight: number; // コンテナの高さ
    rowHeight: number; // 1 行の高さ
    recordList: T[]; // 全レコードの配列
    scrollTop: number; // 現在のスクロール位置（縦方向）
    extraItemCount?: number; // 追加で描画する行数（デフォルトは 10）
}

export interface VirtualScrollReturns<T> {
    startIndex: number; // 表示開始行のインデックス
    endIndex: number; // 表示終了行のインデックス
    displayCount: number; // レンダリングすべき行数
    offsetY: number; // 上部フィラー行の高さ
    displayingRecordList: T[]; // 実際にレンダリングする行オブジェクトの配列
}

export const calculateVirtualScroll = <T>(props: VirtualScrollParams<T>): VirtualScrollReturns<T> => {
    const { containerHeight, rowHeight, recordList, scrollTop, extraItemCount = 10 } = props;
    const displayCount = Math.floor(containerHeight / rowHeight) + extraItemCount;
    const extraCountHalf = Math.floor(extraItemCount / 2);
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - extraCountHalf);
    const endIndex = Math.min(startIndex + displayCount, recordList.length);
    const offsetY = startIndex * rowHeight;
    return { startIndex, endIndex, displayCount, offsetY, displayingRecordList: recordList.slice(startIndex, endIndex) };
};
