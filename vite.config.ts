/// <reference types="vitest" />
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function loadApiEnv() {
  try {
    const envPath = path.resolve('api.env');
    if (fs.existsSync(envPath)) {
      const text = fs.readFileSync(envPath, 'utf-8');
      let endpoint = '';
      let apiKey = '';
      text.split(/\r?\n/).forEach(l => {
        const trimmed = l.trim();
        if (trimmed.startsWith('api-endpoint=')) endpoint = trimmed.replace('api-endpoint=', '').trim();
        if (trimmed.startsWith('api_key=')) apiKey = trimmed.replace('api_key=', '').trim();
      });
      return { endpoint, apiKey };
    }
  } catch (e) {}
  return {
    endpoint: process.env.VITE_AZURE_ENDPOINT || '',
    apiKey: process.env.VITE_AZURE_API_KEY || ''
  };
}

export default defineConfig(({ command }) => {
  const envData = loadApiEnv();

  return {
    base: './',
    test: {
      include: ['tests/**/*.test.ts'],
      environment: 'node',
    },
    plugins: [
      {
        name: 'rename-index1-to-index',
        closeBundle() {
          const oldPath = path.resolve(__dirname, 'dist/index1.html');
          const newPath = path.resolve(__dirname, 'dist/index.html');
          if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
          }
        }
      }
    ],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index1.html'),
        },
      },
    },
    define: {
      'import.meta.env.VITE_AZURE_ENDPOINT': JSON.stringify(envData.endpoint || 'https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses'),
      'import.meta.env.VITE_AZURE_API_KEY': JSON.stringify(envData.apiKey ? Buffer.from(envData.apiKey).toString('base64') : '')
    },
    server: {
      proxy: {
        '/api/openai-proxy': {
          target: 'https://ah30309142502238-8748-resource.services.ai.azure.com',
          changeOrigin: true,
          secure: false,
          rewrite: (p) => p.replace(/^\/api\/openai-proxy/, '/openai/v1/responses')
        }
      }
    }
  };
});
