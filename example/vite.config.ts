import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
    root: "./src",
    plugins: [react(), vue()],
    server: {
        host: "0.0.0.0",
        port: 5173,
    },
    build: {
        sourcemap: true,
        outDir: "../../docs",
    },
});
