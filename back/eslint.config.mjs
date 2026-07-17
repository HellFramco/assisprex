import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // Ignorar carpetas
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "tests/**/*.ts"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["dist/src/**/*.ts"],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },

    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
    },

    rules: {
      "prettier/prettier": "error",

      "no-console": "off",

      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  prettier,
];
