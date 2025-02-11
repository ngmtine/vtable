import path from "node:path";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), vue()],
    build: {
        sourcemap: true,
        outDir: "dist",
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Vtable",
            fileName: (format) => `vtable.${format === "es" ? "mjs" : "cjs"}`,
        },
        rollupOptions: {
            external: ["react", "react-dom", "vue"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    vue: "Vue",
                },
            },
        },
    },
});
