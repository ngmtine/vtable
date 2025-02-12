import { createRoot } from "react-dom/client";

const Home = () => {
    return (
        <div>
            <h1>Vtable Examples</h1>
            <nav>
                <a href="example-vanilla/index.html">Example Vanilla</a>
                <br />
                <a href="example-react/index.html">Example React</a>
                <br />
                <a href="example-vue/index.html">Example Vue</a>
            </nav>
        </div>
    );
};

createRoot(document.getElementById("root") as HTMLElement).render(<Home />);
