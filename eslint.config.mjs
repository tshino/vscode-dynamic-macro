import js from "@eslint/js";
import globals from "globals";

export default [
js.configs.recommended,
{
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.mocha,
        },

        ecmaVersion: 13,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    rules: {
        "no-unused-vars": [ "warn", {
            "argsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_"
        } ],
    },
}, {
    ignores: [
        ".vscode-test/",
        "dist/",
    ],
}];