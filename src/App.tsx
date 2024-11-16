import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LargeTable } from "./LargeTable";

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/:rows?" element={<LargeTable />} />
        </Routes>
    </BrowserRouter>
);
