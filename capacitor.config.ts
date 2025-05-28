import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dvbtecnology.appMovie',
  appName: 'app',
  webDir: 'www',
  server: {
    url: 'http://192.168.1.6:8100',
    cleartext: true
  }
};

export default config;
