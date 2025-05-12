import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.suaempresa.app',
  appName: 'SuaApp',
  webDir: 'www',  
  server: {
    androidScheme: 'https' 
  }
};

export default config;