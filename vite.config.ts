import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      'VITE_CTP_CLIENT_ID',
      'VITE_CTP_CLIENT_SECRET',
      'VITE_CTP_PROJECT_SCOPE',
      'VITE_CTP_PROJECT_KEY',
      'VITE_CTP_API_URL',
      'VITE_CTP_API_AUTH',
    ]),
  ],
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'window',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
