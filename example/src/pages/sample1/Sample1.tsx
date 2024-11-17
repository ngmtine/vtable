import { useState, useEffect } from "react";
import { Vtable } from "vtable";
import { rowStyle, cellStyle, bodyRowStyle } from "./sample1.css";

interface DataItem {
    id: number;
    name: string;
    age: number;
    address: string;
}

const generateData = (rows: number): DataItem[] => {
    return Array.from({ length: rows }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        age: Math.floor(Math.random() * 80) + 20,
        address: `Address ${index + 1}`,
    }));
};

const HeaderTr = () => (
    <tr style={rowStyle}>
        <td style={cellStyle}>ID</td>
        <td style={cellStyle}>Name</td>
        <td style={cellStyle}>Age</td>
        <td style={cellStyle}>Address</td>
    </tr>
);

const BodyTr = ({ record }: { record: DataItem }) => (
    <tr style={{ ...rowStyle, ...bodyRowStyle(record.id) }}>
        <td style={cellStyle}>{record.id}</td>
        <td style={cellStyle}>{record.name}</td>
        <td style={cellStyle}>{record.age}</td>
        <td style={cellStyle}>{record.address}</td>
    </tr>
);

export const Sample1 = () => {
    const data = generateData(100_000);
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
            <Vtable //
                recordList={data}
                containerHeight={containerHeight}
                rowHeight={rowHeight}
                HeaderTr={HeaderTr}
                BodyTr={BodyTr}
                uniqueKey="id"
            />
        </div>
    );
};
