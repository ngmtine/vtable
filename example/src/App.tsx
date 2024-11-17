import { Vtable } from "vtable";

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
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Address</th>
    </tr>
);

const BodyTr = ({ record }: { record: DataItem }) => (
    <tr>
        <td>{record.id}</td>
        <td>{record.name}</td>
        <td>{record.age}</td>
        <td>{record.address}</td>
    </tr>
);

const App = () => {
    const data = generateData(1000); // 1000件のデータを生成
    const rowHeight = 30;

    return (
        <div>
            <h1>Sample Virtual Scroll Table</h1>
            <Vtable //
                recordList={data}
                containerHeight={500}
                rowHeight={rowHeight}
                HeaderTr={HeaderTr}
                BodyTr={BodyTr}
                uniqueKey="id"
            />
        </div>
    );
};

export default App;
