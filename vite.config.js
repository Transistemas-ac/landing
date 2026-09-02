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
        runScript("src/utils/generate-sitemap.js");
        runScript("src/utils/generate-agent-routes.js");
        runScript("src/utils/generate-markdown.js");
        runScript("src/utils/generate-llms.js");
        runScript("src/utils/generate-pdf.js");
        runScript("src/utils/generate-xlsx.js");
        runScript("src/utils/generate-json.js");
      }
    },
    react()
  ]
});
