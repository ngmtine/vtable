import { useEffect, useState } from "react";
import { VtableReact } from "vtable";
import type { DataItem } from "../util/data";
import { getBodyRowStyle, getData } from "../util/data";
import "../util/table.css";

const HeaderRow = () => (
    <tr className="header-row">
        <th className="cell">ID</th>
        <th className="cell">Name</th>
        <th className="cell">Age</th>
        <th className="cell">Address</th>
    </tr>
);

const BodyRow = ({ record }: { record: DataItem }) => (
    <tr style={getBodyRowStyle(record.id)}>
        <td className="cell">{record.id}</td>
        <td className="cell">{record.name}</td>
        <td className="cell">{record.age}</td>
        <td className="cell">{record.address}</td>
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
            <h1>Vtable React Example</h1>
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
