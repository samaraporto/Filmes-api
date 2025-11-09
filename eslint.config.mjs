// eslint.config.mjs
import globals from "globals";
import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node, 
      }
    }
  },


  {
    files: ["tests/**/*.js", "**/*.test.js"], 
    ...jest.configs["flat/recommended"], 
    languageOptions: {
      globals: {
        ...globals.jest, 
      },
    },
  }
];