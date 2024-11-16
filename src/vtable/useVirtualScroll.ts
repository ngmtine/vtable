import { useState } from "react";
import type { SyntheticEvent } from "react";

// 追加で画面外に描画する行数
const EXTRA_ITEM_COUNT = 3;

// 返り値の型
interface UseVirtualScrollReturns<T> {
    startIndex: number; // 画面上のテーブル先頭行インデックス
    endIndex: number; // 画面上のテーブル最終行インデックス
    displayCount: number; // レンダリングする行の数
    displayingRecordList: T[]; // 画面に表示する行オブジェクトの配列
    offsetY: number; // スクロール対象要素と、画面上のテーブル先頭行の距離
    handleScroll: (event: SyntheticEvent) => void; // スクロールハンドラ
}

// 引数の型
interface UseVirtualScrollArgs<T> {
    containerHeight: number; // コンテナ要素（画面上に描画する領域）の高さ
    rowHeight: number; // 行高さ
    recordList: T[]; // 行オブジェクトの配列
}

// 仮想スクロールを使用するためのカスタムフック
export const useVirtualScroll = <T>(args: UseVirtualScrollArgs<T>): UseVirtualScrollReturns<T> => {
    const { containerHeight, rowHeight, recordList } = args;

    // 画面に表示する行の数
    const displayCount = Math.floor(containerHeight / rowHeight + EXTRA_ITEM_COUNT);

    // 画面1行目に表示する行のインデックス
    const [startIndex, setStartIndex] = useState(0);

    // 画面最終行に表示する行のインデックス
    const endIndex = Math.min(startIndex + displayCount, recordList.length);

    // 画面に表示するレコードの配列
    const displayingRecordList = recordList.slice(startIndex, endIndex);

    // 各行の相対表示位置
    const offsetY = startIndex * rowHeight;

    // スクロールハンドラ
    const handleScroll = (event: SyntheticEvent) => {
        const { scrollTop } = event.currentTarget;
        const nextStartIndex = Math.floor(scrollTop / rowHeight);
        console.log(nextStartIndex);
        setStartIndex(nextStartIndex);
    };

    // とりあえず全部返す
    return { startIndex, endIndex, displayCount, displayingRecordList, handleScroll, offsetY };
};
