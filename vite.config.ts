import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    build: {
        sourcemap: true,
        outDir: "dist",
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Vtable",
            fileName: (format) => `vtable.${format === "es" ? "mjs" : "cjs"}`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
