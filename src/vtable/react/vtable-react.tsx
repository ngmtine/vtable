import type { ReactElement } from "react";
import type { VtableProps } from "../types";
import { useVirtualScroll } from "./useVirtualScroll";

// 仮想スクロールテーブルコンポーネント
export const VtableReact = <T,>(props: VtableProps<T, ReactElement>) => {
    const { recordList, containerHeight, rowHeight, HeaderRow, BodyRow, FooterRow, uniqueKey } = props;

    // カスタムフックから諸々取得
    const { displayingRecordList, endIndex, handleScroll, startIndex } = useVirtualScroll<T>({ recordList, containerHeight, rowHeight });

    return (
        <div
            id="vtableContainer"
            onScroll={handleScroll}
            style={{ height: containerHeight, overflow: "scroll" }}
        >
            <table id="vtable">
                {/* HeaderRow が渡されているならば thead を描画 */}
                {HeaderRow ? (
                    <thead
                        style={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: "white",
                            zIndex: 1,
                        }}
                    >
                        <HeaderRow />
                    </thead>
                ) : null}

                <tbody>
                    {/* 上部フィラー行 */}
                    <tr style={{ height: startIndex * rowHeight }} />

                    {displayingRecordList.map((record: T) => {
                        return (
                            <BodyRow
                                key={record[uniqueKey] as number}
                                record={record}
                            />
                        );
                    })}

                    {/* 下部フィラー行 */}
                    <tr style={{ height: (recordList.length - endIndex) * rowHeight }} />
                </tbody>

                {/* FooterRow が渡されているならば tfoot を描画 */}
                {FooterRow ? (
                    <tfoot>
                        <FooterRow />
                    </tfoot>
                ) : null}
            </table>
        </div>
    );
};
