import { execSync } from "child_process";

const GENERATORS = [
  "src/utils/generate-agent-routes.js",
  "src/utils/generate-markdown.js",
  "src/utils/generate-llms.js",
  "src/utils/generate-sitemap.js"
];

export default function setup() {
  for (const script of GENERATORS) {
    execSync(`node ${script}`, { stdio: "inherit" });
  }
}
