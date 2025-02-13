import { useEffect, useState } from "react";
import { VtableReact } from "vtable";
import type { DataItem } from "../util/data";
import { getData, getParityClass } from "../util/data";
import "../util/table.css";

const TheadTr = () => (
    <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Age</td>
        <td>Address</td>
    </tr>
);

const TbodyTr = ({ record, handleClick }: { record: DataItem; handleClick: () => void }) => (
    <tr className={getParityClass(record.id)}>
        <td onClick={handleClick}>{record.id}</td>
        <td onClick={handleClick}>{record.name}</td>
        <td onClick={handleClick}>{record.age}</td>
        <td onClick={handleClick}>{record.address}</td>
    </tr>
);

const TfootTr = () => (
    <tr>
        <td colSpan={4}>Footer Content</td>
    </tr>
);

export const ExampleReact = () => {
    console.log("test!!");
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

    const handleClick = () => console.log("hello");

    return (
        <div>
            <h1>Vtable React Example</h1>
            <VtableReact<DataItem, { tbodyTr: { handleClick: () => void } }>
                recordList={data}
                containerHeight={containerHeight}
                rowHeight={rowHeight}
                TheadTr={TheadTr}
                TbodyTr={TbodyTr}
                TfootTr={TfootTr}
                uniqueKey="id"
                additionalProps={{
                    tbodyTr: {
                        handleClick: handleClick,
                    },
                }}
            />
        </div>
    );
};
