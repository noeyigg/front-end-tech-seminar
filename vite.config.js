import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.js",
      name: "LeakGuardHooks", // 전역변수 이름: 보통 PascalCase로 씀
      fileName: (format) => `leakguard-hooks.${format}.js`, // 출력 파일명 (케밥케이스)
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
