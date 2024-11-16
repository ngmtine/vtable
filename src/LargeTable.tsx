import { useParams } from "react-router-dom";
import type { CSSProperties } from "react";

const cellStyle: CSSProperties = {
    border: "1px solid black",
    padding: "5px",
};

interface DataItem {
    id: number;
    name: string;
    age: number;
    address: string;
}

// 大量のデータを生成する関数
const generateData = (rows: number): DataItem[] => {
    return Array.from({ length: rows }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        age: Math.floor(Math.random() * 80) + 20,
        address: `Address ${index + 1}`,
    }));
};

export const LargeTable = () => {
    const { rows } = useParams<{ rows: string }>();
    const rowsInt = rows ? Number.parseInt(rows) : 100; // デフォルト100行
    console.log(`LargeTable: ${rowsInt}行描画します`);

    // データ生成
    const data = generateData(rowsInt);

    return (
        <div style={{ overflow: "auto", height: "98vh" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
                    <tr>
                        <th style={cellStyle}>ID</th>
                        <th style={cellStyle}>Name</th>
                        <th style={cellStyle}>Age</th>
                        <th style={cellStyle}>Address</th>
                    </tr>
                </thead>
                <tbody style={{ overflow: "auto" }}>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td style={cellStyle}>{item.id}</td>
                            <td style={cellStyle}>{item.name}</td>
                            <td style={cellStyle}>{item.age}</td>
                            <td style={cellStyle}>{item.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

/*

10_000: 描画2秒程度、スクロールは快適
100_000: 描画10 ~ 20秒、ブラウザ相当重い

*/
