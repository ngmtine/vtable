import type { ReactElement } from "react";
import type { VtableProps } from "../types";
import { useVirtualScroll } from "./useVirtualScroll";

// 仮想スクロールテーブルコンポーネント
export const VtableReact = <T, O extends object>(props: VtableProps<T, ReactElement, O>) => {
    const { recordList, containerHeight, rowHeight, TheadTr, TbodyTr, TfootTr, uniqueKey, additionalProps } = props;

    // カスタムフックから諸々取得
    const { displayingRecordList, endIndex, handleScroll, startIndex } = useVirtualScroll<T>({ recordList, containerHeight, rowHeight });

    return (
        <div
            id="vtableContainer"
            onScroll={handleScroll}
            style={{ height: containerHeight, overflow: "scroll" }}
            {...additionalProps?.container}
        >
            <table id="vtable">
                {/* TheadTr が渡されているならば thead を描画 */}
                {TheadTr ? (
                    <thead
                        style={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 1,
                        }}
                        {...additionalProps?.thead}
                    >
                        <TheadTr {...additionalProps?.theadTr} />
                    </thead>
                ) : null}

                <tbody {...additionalProps?.tbody}>
                    {/* 上部フィラー行 */}
                    <tr style={{ height: startIndex * rowHeight }} />

                    {displayingRecordList.map((record: T) => {
                        return (
                            <TbodyTr
                                key={record[uniqueKey] as number}
                                record={record}
                                {...additionalProps?.tbodyTr}
                            />
                        );
                    })}

                    {/* 下部フィラー行 */}
                    <tr style={{ height: (recordList.length - endIndex) * rowHeight }} />
                </tbody>

                {/* TfootTr が渡されているならば tfoot を描画 */}
                {TfootTr ? (
                    <tfoot {...additionalProps?.tfoot}>
                        <TfootTr {...additionalProps?.tfootTr} />
                    </tfoot>
                ) : null}
            </table>
        </div>
    );
};
