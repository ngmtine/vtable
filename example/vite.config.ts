import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/vtable/",
    root: "./src",
    plugins: [react(), vue()],
    server: {
        host: "0.0.0.0",
        port: 5173,
    },
    build: {
        sourcemap: true,
        outDir: "../../docs",

        rollupOptions: {
            input: {
                index: "src/index.html",
                "example-vanilla": "src/example-vanilla/index.html",
                "example-react": "src/example-react/index.html",
                "example-vue": "src/example-vue/index.html",
                "example-react-additionalprops": "src/example-react-additionalprops/index.html",
            },
        },
    },
});
