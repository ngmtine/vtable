import { Vtable } from "./vtable/Vtable";
import { useParams } from "react-router-dom";
import type { CSSProperties } from "react";

const rowHeight = 26;

// セルのスタイル
const cellStyle: CSSProperties = {
    border: "1px solid black",
    textAlign: "center",
    height: rowHeight,
    maxHeight: rowHeight,
    margin: 0,
    padding: 0,
};

// データ型定義
interface DataItem {
    id: number;
    name: string;
    age: number;
    address: string;
}

// データを生成する関数
const generateData = (rows: number): DataItem[] => {
    return Array.from({ length: rows }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        age: Math.floor(Math.random() * 80) + 20,
        address: `Address ${index + 1}`,
    }));
};

// ヘッダー行コンポーネント
const HeaderTr = () => (
    <tr>
        <td style={cellStyle}>ID</td>
        <td style={cellStyle}>Name</td>
        <td style={cellStyle}>Age</td>
        <td style={cellStyle}>Address</td>
    </tr>
);

// テーブルの行コンポーネント
const BodyTr = ({ record }: { record: DataItem }) => (
    <tr>
        <td style={cellStyle}>{record.id}</td>
        <td style={cellStyle}>{record.name}</td>
        <td style={cellStyle}>{record.age}</td>
        <td style={cellStyle}>{record.address}</td>
    </tr>
);

// VtablePageコンポーネント
export const VtablePage = () => {
    const { rows } = useParams<{ rows: string }>();
    const rowsInt = rows ? Number.parseInt(rows) : 100; // デフォルト100行
    console.log(`VtablePage: ${rowsInt}行描画します`);

    // データ生成
    const data = generateData(rowsInt);

    return (
        <div>
            <h1>Virtual Scroll Table</h1>
            <Vtable //
                recordList={data}
                containerHeight={600}
                rowHeight={rowHeight}
                HeaderTr={HeaderTr}
                BodyTr={BodyTr}
                uniqueKey="id"
            />
        </div>
    );
};
