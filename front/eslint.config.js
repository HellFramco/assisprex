import js from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import globals from "globals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...vue.configs["flat/recommended"],

  {
    files: ["**/*.{ts,vue}"],

    languageOptions: {
      parser: vueParser,

      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
      },

      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      "prettier/prettier": "error",

      "no-console": "warn",

      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "vue/multi-word-component-names": "off",
    },
  },

  prettier,
];
