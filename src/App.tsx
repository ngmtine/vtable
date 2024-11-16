import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LargeTable } from "./LargeTable";
import { VtablePage } from "./VtablePage";

export const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/vtable/:rows?" element={<VtablePage />} />
            <Route path="/:rows?" element={<LargeTable />} />
        </Routes>
    </BrowserRouter>
);
