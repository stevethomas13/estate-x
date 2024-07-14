import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://estate-x-85hn.vercel.app',
        secure: false,
        changeOrigin: true
      },
    },
  },
  plugins: [react()],
});
