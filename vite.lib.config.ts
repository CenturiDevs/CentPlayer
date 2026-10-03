import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    publicDir: false,
    build: {
        outDir: "dist-lib",
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            entry: "src/index.ts",
            name: "CentPlayer",
            formats: ["es", "cjs"],
            fileName: (format) => `centplayer.${format === "es" ? "js" : "cjs"}`,
        },
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
    plugins: [react()],
});
