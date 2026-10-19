import { defineConfig } from 'astro/config';

// Actionsでは公開URLから自動設定。独自ドメインならSITE_URLを指定します。
const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = (repository ?? '').split('/');
const isUserSite = repo?.toLowerCase() === `${owner}.github.io`.toLowerCase();
export default defineConfig({
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://example.com'),
  base: process.env.BASE_PATH || (repository && !isUserSite ? `/${repo}` : '/'),
  output: 'static',
  trailingSlash: 'always',
});
