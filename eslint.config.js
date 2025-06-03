import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: [
      "src/graphql/generated/**/*",
      "src/graphql/interfaces/**/*",
      ".tmp/**/*",
      "src/.tmp/**/*"
    ]
  },
  { 
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },
  { files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off"
    },
    settings: {
      react: {
        version: "18.2.0",
        defaultVersion: "18.2.0"
      }
    }
  }
]);
