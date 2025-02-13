import type { HTMLAttributes, TableHTMLAttributes } from "react";

/**
 * 各行（ボディ）のレンダリング用プロパティの型
 */
export interface TbodyTrProps<T> {
    record: T;
}

/**
 * 各内部要素に対して追加のpropsを上書きできるようにするための型
 */
export type VtablePropsOverrides<
    O extends {
        container?: object;
        table?: object;
        thead?: object;
        theadTr?: object;
        tbody?: object;
        tbodyTr?: object;
        tfoot?: object;
        tfootTr?: object;
    } = object,
> = {
    container?: HTMLAttributes<HTMLDivElement> & (O["container"] extends object ? O["container"] : object);
    table?: TableHTMLAttributes<HTMLTableElement> & (O["table"] extends object ? O["table"] : object);
    thead?: HTMLAttributes<HTMLTableSectionElement> & (O["thead"] extends object ? O["thead"] : object);
    theadTr?: HTMLAttributes<HTMLTableRowElement> & (O["theadTr"] extends object ? O["theadTr"] : object);
    tbody?: HTMLAttributes<HTMLTableSectionElement> & (O["tbody"] extends object ? O["tbody"] : object);
    tbodyTr?: HTMLAttributes<HTMLTableRowElement> & (O["tbodyTr"] extends object ? O["tbodyTr"] : object);
    tfoot?: HTMLAttributes<HTMLTableSectionElement> & (O["tfoot"] extends object ? O["tfoot"] : object);
    tfootTr?: HTMLAttributes<HTMLTableRowElement> & (O["tfootTr"] extends object ? O["tfootTr"] : object);
};

/**
 * Vtable コンポーネントに渡す共通の Props の型
 * T: レコードの型
 * R: 各スロットのコンポーネントの戻り値（通常は ReactElement）
 * O: 各スロットに対して追加のpropsの型（オーバーライド用）をまとめたオブジェクト
 */
export interface VtableProps<T, R = unknown, O extends object = object> {
    recordList: T[];
    containerHeight: number;
    rowHeight: number;
    TheadTr?: () => R;
    TbodyTr: (props: TbodyTrProps<T>) => R;
    TfootTr?: () => R;
    uniqueKey: keyof T;
    additionalProps?: VtablePropsOverrides<O>;
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
