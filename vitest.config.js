/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "node:path";

function resolvePath(path) {
  return resolve(__dirname, path);
}

export default defineConfig({
  test: {},
  resolve: {
    alias: {
      "@api": resolvePath("./src/api"),
      "@config": resolvePath("./src/config"),
      "@database": resolvePath("./src/database"),
      "@lib": resolvePath("./src/lib"),
    },
  },
});
