import { VtableVanilla } from "vtable";
import type { DataItem } from "../util/data";
import { getData, getParityClass } from "../util/data";

// ヘッダーtrのレンダラ
const headerRenderer = (): string => {
    return `
<tr>
    <td>ID</td>
    <td>Name</td>
    <td>Age</td>
    <td>Address</td>
</tr>
`;
};

// ボディtrのレンダラ
const bodyRenderer = (record: DataItem): string => {
    return `
<tr class="${getParityClass(record.id)}">
    <td>${record.id}</td>
    <td>${record.name}</td>
    <td>${record.age}</td>
    <td>${record.address}</td>
</tr>
`;
};

// フッターtrのレンダラ
const footerRenderer = (): string => {
    return `
<tr>
    <td colspan="4" style="text-align: center;">Footer Content</td>
</tr>
`;
};

/**
 * 指定した親要素に VtableVanilla コンポーネントをマウントする
 * @param parent マウント先の HTMLElement
 */
export const mountTable = (parent: HTMLElement): void => {
    // ダミーデータ生成
    const data: DataItem[] = getData(100_000);

    // コンテナの高さと各行の高さ（例としてウィンドウサイズに合わせる）
    let containerHeight = window.innerHeight - 100;
    const rowHeight = 30;

    // VtableVanilla のインスタンス生成
    const vtable = new VtableVanilla<DataItem>({
        recordList: data,
        containerHeight: containerHeight,
        rowHeight: rowHeight,
        uniqueKey: "id",
        headerRenderer: headerRenderer,
        bodyRenderer: bodyRenderer,
        footerRenderer: footerRenderer,
        extraItemCount: 40,
    });

    // マウント先の DOM 要素にテーブルコンテナを追加
    vtable.mount(parent);

    // ウィンドウリサイズ時にコンテナの高さを更新
    window.addEventListener("resize", () => {
        containerHeight = window.innerHeight - 100;
        vtable.containerHeight = containerHeight;
        vtable.tableContainer.style.height = `${containerHeight}px`;
        vtable.renderRows();
    });
};
