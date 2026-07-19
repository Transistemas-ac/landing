import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

const runScript = (script) => {
  console.log(`\n→ Running ${script}...`);
  execSync(`node ${script}`, { stdio: "inherit" });
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "transistemas-seo-prebuild",
      buildStart() {
        runScript("scripts/generate-sitemap.js");
      }
    },
    react()
  ]
});
