import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = owner !== "" && repository === `${owner}.github.io`;
const customSite = process.env.SITE?.trim() || undefined;
const customBasePath = process.env.BASE_PATH?.trim() || undefined;
const normalizedBasePath = customBasePath
  ? `/${customBasePath.replace(/^\/+|\/+$/g, "")}/`
  : undefined;
const base =
  normalizedBasePath ??
  (customSite ? "/" : repository ? (isUserSite ? "/" : `/${repository}/`) : "/");
const site = customSite || (owner ? `https://${owner}.github.io` : "https://example.com");

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark-default",
      wrap: true
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
