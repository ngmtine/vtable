export interface DataItem {
    id: number;
    name: string;
    age: number;
    address: string;
}

export const getData = (rows: number): DataItem[] => {
    return Array.from({ length: rows }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        age: Math.floor(Math.random() * 80) + 20,
        address: `Address ${index + 1}`,
    }));
};

// 偶奇背景色のクラス付与
export const getParityClass = (id: number) => (id % 2 === 0 ? "even" : "odd");
