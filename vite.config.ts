import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const DEFAULT_HA_URL = 'http://homeassistant.local:8123';
const HA_API_PATH = '/api/haier_evo';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ha-proxy',
      configureServer(server) {
        server.middlewares.use(HA_API_PATH, async (req, res) => {
          const target =
            (req.headers['x-ha-target'] as string | undefined) ??
            process.env.VITE_HA_URL ??
            DEFAULT_HA_URL;

          try {
            const response = await fetch(`${target}${HA_API_PATH}`, {
              signal: AbortSignal.timeout(10_000),
            });
            const text = await response.text();
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = response.status;
            res.end(text);
          } catch (err) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : 'Proxy error',
              }),
            );
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
});
