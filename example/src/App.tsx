import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Sample1 } from "./pages/sample1/Sample1";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sample1" element={<Sample1 />} />
        </Routes>
    );
};

export default App;
