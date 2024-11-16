import { createRoot } from "react-dom/client";
import { Counter } from "./Counter";

// biome-ignore lint/style/noNonNullAssertion:
createRoot(document.getElementById("root")!).render(<Counter />);
