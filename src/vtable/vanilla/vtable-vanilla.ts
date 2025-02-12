import { calculateVirtualScroll } from "../virtualScroll";

/**
 * VtableVanilla コンポーネントのオプションの型
 */
export interface VtableVanillaOptions<T> {
    recordList: T[]; // 全データ配列
    containerHeight: number; // コンテナの高さ（px）
    rowHeight: number; // 1 行の高さ（px）
    uniqueKey?: keyof T; // 各レコードのユニークなキー（任意）
    headerRenderer?: () => string; // ヘッダー部分を描画する関数 HTML 文字列を返す
    bodyRenderer: (record: T) => string; // 各レコードの行（<tr>）を描画する関数
    footerRenderer?: () => string; // フッター部分を描画する関数（任意）
    extraItemCount?: number; // 追加で描画する行数（デフォルト: 40）
}

/**
 * vanilla js 仮想スクロールテーブルコンポーネント
 */
export class VtableVanilla<T> {
    private recordList: T[];
    public containerHeight: number;
    public rowHeight: number;
    public uniqueKey?: keyof T;
    private headerRenderer?: () => string;
    private bodyRenderer: (record: T) => string;
    private footerRenderer?: () => string;
    private extraItemCount: number;

    public tableContainer: HTMLDivElement;
    public table: HTMLTableElement;
    private thead?: HTMLTableSectionElement;
    private tbody: HTMLTableSectionElement;
    private tfoot?: HTMLTableSectionElement;

    constructor(options: VtableVanillaOptions<T>) {
        this.recordList = options.recordList;
        this.containerHeight = options.containerHeight;
        this.rowHeight = options.rowHeight;
        this.uniqueKey = options.uniqueKey;
        this.headerRenderer = options.headerRenderer;
        this.bodyRenderer = options.bodyRenderer;
        this.footerRenderer = options.footerRenderer;
        this.extraItemCount = options.extraItemCount ?? 40;

        // コンテナ作成
        this.tableContainer = document.createElement("div");
        this.tableContainer.id = "vtableContainer";
        this.tableContainer.style.height = `${this.containerHeight}px`;
        this.tableContainer.style.overflow = "scroll";

        // テーブル要素作成
        this.table = document.createElement("table");
        this.table.id = "vtable";

        // ヘッダーが定義されている場合
        if (this.headerRenderer) {
            this.thead = document.createElement("thead");
            const headerHTML = this.headerRenderer();
            this.thead.innerHTML = headerHTML;
            this.table.appendChild(this.thead);
        }

        // tbody の作成
        this.tbody = document.createElement("tbody");
        this.table.appendChild(this.tbody);

        // フッターが定義されている場合
        if (this.footerRenderer) {
            this.tfoot = document.createElement("tfoot");
            const footerHTML = this.footerRenderer();
            this.tfoot.innerHTML = footerHTML;
            this.table.appendChild(this.tfoot);
        }

        // テーブルをコンテナに追加
        this.tableContainer.appendChild(this.table);

        // スクロールイベントの登録
        this.tableContainer.addEventListener("scroll", this.onScroll.bind(this));

        // 初回レンダリング
        this.renderRows();
    }

    private onScroll(): void {
        this.renderRows();
    }

    /**
     * 現在のスクロール位置に基づき、表示すべき行とフィラー行を再描画する
     */
    public renderRows(): void {
        const scrollTop = this.tableContainer.scrollTop;
        const virtualData = calculateVirtualScroll<T>({
            containerHeight: this.containerHeight,
            rowHeight: this.rowHeight,
            recordList: this.recordList,
            scrollTop: scrollTop,
            extraItemCount: this.extraItemCount,
        });

        // tbody をクリア
        this.tbody.innerHTML = "";

        // 上部フィラー行
        if (virtualData.startIndex > 0) {
            const fillerTop = document.createElement("tr");
            const fillerCell = document.createElement("td");
            fillerCell.colSpan = 100; // 全列を埋めるため（適宜調整）
            fillerCell.style.height = `${virtualData.startIndex * this.rowHeight}px`;
            fillerCell.style.border = "none";
            fillerTop.appendChild(fillerCell);
            this.tbody.appendChild(fillerTop);
        }

        // データを表示する行
        for (const record of virtualData.displayingRecordList) {
            const rowHtml = this.bodyRenderer(record);
            const tempContainer = document.createElement("tbody");
            tempContainer.innerHTML = rowHtml.trim();
            const row = tempContainer.firstElementChild as HTMLTableRowElement | null;
            if (row) {
                if (this.uniqueKey && record[this.uniqueKey] !== undefined) {
                    row.setAttribute("data-unique-key", String(record[this.uniqueKey]));
                }
                this.tbody.appendChild(row);
            }
        }

        // 下部フィラー行
        const bottomFillerHeight = (this.recordList.length - virtualData.endIndex) * this.rowHeight;
        if (bottomFillerHeight > 0) {
            const fillerBottom = document.createElement("tr");
            const fillerCell = document.createElement("td");
            fillerCell.colSpan = 100;
            fillerCell.style.height = `${bottomFillerHeight}px`;
            fillerCell.style.border = "none";
            fillerBottom.appendChild(fillerCell);
            this.tbody.appendChild(fillerBottom);
        }
    }

    /**
     * 指定した親要素にテーブルコンテナをマウントする
     * @param parent マウント先の HTMLElement
     */
    public mount(parent: HTMLElement): void {
        parent.appendChild(this.tableContainer);
    }
}
