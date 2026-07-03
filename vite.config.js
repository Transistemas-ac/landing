import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";

const runScript = (script) => {
  console.log(`\n→ Running ${script}...`);
  execSync(`node ${script}`, { stdio: "inherit" });
};

const prebuild = () => {
  runScript("scripts/generate-sitemap.js");
  runScript("scripts/generate-assets.js");
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "transistemas-seo-prebuild",
      buildStart() {
        prebuild();
      }
    },
    react()
  ]
});
