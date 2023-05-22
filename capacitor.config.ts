import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'JS Nation',
  webDir: 'dist',
  server: {
    url: "http://localhost:5173/",
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
