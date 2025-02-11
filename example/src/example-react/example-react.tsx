import { useEffect, useState } from "react";
import { VtableReact } from "vtable";
import type { DataItem } from "../util/data";
import { getData } from "../util/data";
import { bodyRowStyle, cellStyle, rowStyle } from "./example-react.css";

const HeaderRow = () => (
    <tr style={rowStyle}>
        <td style={cellStyle}>ID</td>
        <td style={cellStyle}>Name</td>
        <td style={cellStyle}>Age</td>
        <td style={cellStyle}>Address</td>
    </tr>
);

const BodyRow = ({ record }: { record: DataItem }) => (
    <tr style={{ ...rowStyle, ...bodyRowStyle(record.id) }}>
        <td style={cellStyle}>{record.id}</td>
        <td style={cellStyle}>{record.name}</td>
        <td style={cellStyle}>{record.age}</td>
        <td style={cellStyle}>{record.address}</td>
    </tr>
);

export const ExampleReact = () => {
    const data = getData(100_000);
    const rowHeight = 30;

    // テーブルコンテナ高さ保持（ウィンドウリサイズで変動するため 仮想スクロールテーブル用）
    const [containerHeight, setContainerHeight] = useState(0);

    // テーブルコンテナ高さ更新（cssの"calc(100vh - 100px)" 相当の処理）
    useEffect(() => {
        // テーブルコンテナ高さ初期値取得
        const handleResize = () => setContainerHeight(window.innerHeight - 100);
        handleResize();

        // リサイズイベントリスナー付与
        window.addEventListener("resize", handleResize);

        // クリーンアップ
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <h1>Sample Virtual Scroll Table</h1>
            <VtableReact
                recordList={data}
                containerHeight={containerHeight}
                rowHeight={rowHeight}
                HeaderRow={HeaderRow}
                BodyRow={BodyRow}
                uniqueKey="id"
            />
        </div>
    );
};
