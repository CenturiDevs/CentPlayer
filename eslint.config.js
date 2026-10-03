import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["dist", "dist-lib"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ["*.config.ts", "eslint.config.js"],
        extends: [tseslint.configs.disableTypeChecked],
    },
    {
        files: ["tests/**/*.ts"],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            // test() returns a promise the runner owns, so there is nothing to
            // await at the call site
            "@typescript-eslint/no-floating-promises": "off",
        },
    },
]);
