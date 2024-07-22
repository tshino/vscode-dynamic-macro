import globals from "globals";

export default [{
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
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": [ "warn", {
            "argsIgnorePattern": "^_",
            "caughtErrorsIgnorePattern": "^_"
        } ],
        "constructor-super": "warn",
        "valid-typeof": "warn",
    },
}, {
    ignores: [
        ".vscode-test/",
        "dist/",
    ],
}];