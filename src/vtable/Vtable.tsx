import type { ReactElement } from "react";
import { useVirtualScroll } from "./useVirtualScroll";

// BodyTrに渡すpropsの型
export interface BodyTrProps<T> {
    record: T;
}

// Vtableに渡すspropsの型
interface VtableProps<T> {
    recordList: T[];
    containerHeight: number; // 画面上に描画するテーブル高さ
    rowHeight: number; // 行高さ
    HeaderTr?: () => ReactElement; // thead以下に挿入する行コンポーネント 渡さなければthead描画しない
    BodyTr: (props: BodyTrProps<T>) => ReactElement; // tbody以下に挿入する行コンポーネント
    FooterTr?: () => ReactElement; // tfoot以下に挿入する行コンポーネント 渡さなければtfoot描画しない
    uniqueKey: keyof T;
}

// 仮想スクロールテーブルコンポーネント
export const Vtable = <T,>(props: VtableProps<T>) => {
    const { recordList, containerHeight, rowHeight, HeaderTr, BodyTr, FooterTr, uniqueKey } = props;

    // カスタムフックから諸々取得
    const { displayingRecordList, endIndex, handleScroll, startIndex } = useVirtualScroll<T>({ recordList, containerHeight, rowHeight });

    return (
        <div //
            id="vtableWrapper"
            onScroll={handleScroll}
            style={{ height: containerHeight, overflow: "scroll" }}
        >
            <table //
                id="vtable"
                style={{ borderCollapse: "collapse", width: "100%" }}
            >
                {/* HeaderTr が渡されているならば thead を描画 */}
                {HeaderTr ? (
                    <thead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
                        <HeaderTr />
                    </thead>
                ) : null}

                <tbody>
                    {/* 上部フィラー行 */}
                    <tr style={{ height: startIndex * rowHeight }} />

                    {displayingRecordList.map((record: T) => {
                        return (
                            <BodyTr //
                                key={record[uniqueKey] as number}
                                record={record}
                            />
                        );
                    })}

                    {/* 下部フィラー行 */}
                    <tr style={{ height: (recordList.length - endIndex) * rowHeight }} />
                </tbody>

                {/* FooterTr が渡されているならば tfoot を描画 */}
                {FooterTr ? (
                    <tfoot>
                        <FooterTr />
                    </tfoot>
                ) : null}
            </table>
        </div>
    );
};
