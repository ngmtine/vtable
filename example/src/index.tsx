import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ExampleReact } from "./pages/example-react/example-react";
import { Home } from "./pages/home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "example-react", element: <ExampleReact /> },
        ],
    },
]);

createRoot(document.getElementById("root") as HTMLElement).render(<RouterProvider router={router} />);
