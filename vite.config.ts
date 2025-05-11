import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [angular()],
  optimizeDeps: {
    include: ['@ionic/core/components']
  }
});

function angular(): import("vite").PluginOption {
    throw new Error('Function not implemented.');
}
