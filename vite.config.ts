import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from "path";

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // DO NOT REMOVE
    createIconImportProxy() as PluginOption,
    sparkPlugin({ port: 7003 }) as PluginOption,
    
    // Sentry plugin for source maps upload (only in production builds)
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      
      // Only upload source maps in production builds
      disable: process.env.NODE_ENV !== 'production',
      
      sourcemaps: {
        assets: ['./dist/assets/**'],
      },
      
      // Silent mode - don't spam console
      silent: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(projectRoot, "src"),
    },
  },
  server: {
    port: 7003,
    strictPort: true,
  },
  build: {
    // Enable source maps for error tracking
    sourcemap: true,
  },
});
