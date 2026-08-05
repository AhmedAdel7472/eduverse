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
    endpoint: 'https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses',
    apiKey: ''
  };
}

const envData = loadApiEnv();

export default defineConfig({
  define: {
    'import.meta.env.VITE_AZURE_ENDPOINT': JSON.stringify(envData.endpoint),
    'import.meta.env.VITE_AZURE_API_KEY': JSON.stringify(envData.apiKey)
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
});
