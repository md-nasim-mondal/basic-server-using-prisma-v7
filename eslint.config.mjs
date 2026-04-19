import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Files to lint (only TypeScript files in the src folder)
  { files: ["src/**/*.ts"] },

  // 2. Folders to ignore
  { ignores: ["dist", "node_modules", "coverage"] },

  // 3. Base Configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // 4. Custom Rules & Environment
  {
    languageOptions: {
      globals: {
        ...globals.node, // Support for Node.js globals like process and __dirname
      },
    },
    rules: {
      // Allow unused variables if they start with an underscore (_)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Warn on console statements
      "no-console": "warn",

      // Disable 'any' type restriction
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // 5. Prettier config (Must be last to override other rules)
  eslintConfigPrettier,
];
