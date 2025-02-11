import type { ReactElement } from "react";
import { useVirtualScroll } from "./useVirtualScroll";

// BodyRowに渡すpropsの型
export interface BodyRowProps<T> {
    record: T;
}

// Vtableに渡すpropsの型
export interface VtableProps<T> {
    recordList: T[];
    containerHeight: number; // 画面上に描画するテーブル高さ
    rowHeight: number; // 行高さ
    HeaderRow?: () => ReactElement; // thead以下に挿入する行コンポーネント 渡さなければthead描画しない
    BodyRow: (props: BodyRowProps<T>) => ReactElement; // tbody以下に挿入する行コンポーネント
    FooterRow?: () => ReactElement; // tfoot以下に挿入する行コンポーネント 渡さなければtfoot描画しない
    uniqueKey: keyof T;
}

// 仮想スクロールテーブルコンポーネント
export const Vtable = <T,>(props: VtableProps<T>) => {
    const { recordList, containerHeight, rowHeight, HeaderRow, BodyRow, FooterRow, uniqueKey } = props;

    // カスタムフックから諸々取得
    const { displayingRecordList, endIndex, handleScroll, startIndex } = useVirtualScroll<T>({ recordList, containerHeight, rowHeight });

    return (
        <div
            id="vtableWrapper"
            onScroll={handleScroll}
            style={{ height: containerHeight, overflow: "scroll" }}
        >
            <table
                id="vtable"
                style={{ borderCollapse: "collapse", width: "100%" }}
            >
                {/* HeaderRow が渡されているならば thead を描画 */}
                {HeaderRow ? (
                    <thead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
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
